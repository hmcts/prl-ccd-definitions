#!/usr/bin/env sh
set -ex
{{ range $key, $value := .Values.redirect_uris }}
for redirect_uri in {{ tpl ( join " " $value) $ }}
do
echo "Removing redirect URI for service {{ $key }}: ${redirect_uri} using {{ tpl $.Values.api.url $}}"

curl -v -k -X PATCH \
  {{tpl $.Values.api.url $ }}/testing-support/services/{{ tpl ($key | urlquery | replace "+" "%20") $ }} \
  -H 'Accept: application/json' \
  -H 'Content-Type: application/json' \
  -d '[ {
	"operation": "remove",
	"field": "redirect_uri",
	"value": "'${redirect_uri}'"
}
]'
done
{{ end }}