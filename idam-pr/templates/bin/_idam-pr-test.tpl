#!/usr/bin/env sh

set -x

testUsername="$(mktemp -u 'james_bond.XXXXXX')$(date +%s)@hmcts.net"
testPassword="Agent007"

echo "================================================================"
echo "Creating a new test user $testUsername"
echo "================================================================"
userCreationResponse=$(curl -s -k -i -X POST {{ tpl .Values.api.url $ }}/testing-support/accounts \
  -H 'Content-Type: application/json' \
  -d '{"email": "'$testUsername'", "forename": "James", "surname": "Bond", "password": "'$testPassword'", "roles": [{"code": "citizen"}]}' 2<&1)
echo "HTTP response was:"
echo "================================================================"
echo "$userCreationResponse"
echo "================================================================"

echo "================================================================"
echo "Testing each redirect_uri"
echo "================================================================"
{{ range $key, $value := .Values.redirect_uris }}
for redirect_uri in {{ tpl ( join " " $value ) $ }}
do
echo "================================================================"
echo "Getting the csrf token: {{ $key }} / ${redirect_uri}"
echo "================================================================"
getLoginPage=$(curl -s -k -v -c /data/dir/cookies.txt -b /data/dir/cookies.txt '{{ tpl $.Values.web_public.url $ }}/login?redirect_uri=${redirect_uri}&client_id={{ $key }}' 2<&1)
csrf=$(cat /data/dir/cookies.txt | grep -oE 'TOKEN.*' | grep -oE '[^TOKEN\t]+' | tr -d '[:space:]' 2<&1)
echo "================================================================"
echo "found token $csrf: {{ $key }} / ${redirect_uri}"
echo "================================================================"
response=$(curl -s -k -i -c /data/dir/cookies.txt -b /data/dir/cookies.txt -d "_csrf=$csrf&client_id={{ $key }}&username=$testUsername&password=$testPassword&redirect_uri=${redirect_uri}&state=12345&selfRegistrationEnabled=true" '{{ tpl $.Values.web_public.url $ }}/login' 2<&1)
httpCode=$(echo $response | grep -Eo 302)

if [ "$httpCode"  == "302" ]; then
  echo "================================================================"
  echo "HTTP response code was $httpCode"
  echo "================================================================"
  echo "LOGIN SUCCEEDED WITH PROVIDED CLIENT_ID AND REDIRECT_URI"
else
  echo "================================================================"
  echo "Was incorrectly redirected to login page"
  echo "HTTP response code was: $httpCode"
  echo "HTTP response was:"
  echo "================================================================"
  echo "$response"
  echo "================================================================"
  echo "LOGIN FAILED WITH SUPPLIED DETAILS"
  echo "================================================================"
  echo "Deleting the test user"
  echo "================================================================"
  curl -s -k -X DELETE "{{tpl $.Values.api.url $}}/testing-support/accounts/$testUsername"
  exit 1
fi
done
{{ end }}
echo "================================================================"
echo "Deleting the test user"
echo "================================================================"
curl -s -k -X DELETE "{{tpl .Values.api.url $}}/testing-support/accounts/$testUsername"

