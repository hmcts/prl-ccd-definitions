package uk.gov.hmcts.reform.prl;

import uk.gov.hmcts.befta.dse.ccd.CcdEnvironment;
import uk.gov.hmcts.befta.dse.ccd.CcdRoleConfig;
import uk.gov.hmcts.befta.dse.ccd.DataLoaderToDefinitionStore;
import uk.gov.hmcts.befta.util.BeftaUtils;

import java.util.List;
import java.util.Locale;

public class HighLevelDataSetupApp extends DataLoaderToDefinitionStore {

    public static final String PUBLIC = "PUBLIC";
    public static final String RESTRICTED = "RESTRICTED";
    private static final CcdRoleConfig[] CCD_ROLES_NEEDED_FOR_PRL = {
            new CcdRoleConfig("citizen", PUBLIC),
            new CcdRoleConfig("caseworker-privatelaw", PUBLIC),
            new CcdRoleConfig("caseworker-privatelaw-bulkscan", PUBLIC),
            new CcdRoleConfig("caseworker-privatelaw-bulkscansystemupdate", PUBLIC),
            new CcdRoleConfig("caseworker-privatelaw-courtadmin", PUBLIC),
            new CcdRoleConfig("caseworker-privatelaw-judge", PUBLIC),
            new CcdRoleConfig("caseworker-privatelaw-la", PUBLIC),
            new CcdRoleConfig("caseworker-privatelaw-solicitor", PUBLIC),
            new CcdRoleConfig("caseworker-privatelaw-superuser", PUBLIC),
            new CcdRoleConfig("caseworker-privatelaw-systemupdate", RESTRICTED),
            new CcdRoleConfig("caseworker-privatelaw-readonly", PUBLIC),
            new CcdRoleConfig("payments", PUBLIC),
            new CcdRoleConfig("pui-case-manager", PUBLIC),
            new CcdRoleConfig("courtnav", PUBLIC),
            new CcdRoleConfig("caseworker-wa-task-configuration", RESTRICTED),
            new CcdRoleConfig("caseworker-ras-validation", PUBLIC),
            new CcdRoleConfig("caseworker-privatelaw-externaluser-viewonly", PUBLIC),
            new CcdRoleConfig("GS_profile", PUBLIC),
            new CcdRoleConfig("ctsc-team-leader", PUBLIC),
            new CcdRoleConfig("hearing-centre-team-leader", PUBLIC),
            new CcdRoleConfig("caseworker-privatelaw-cafcass", PUBLIC),
            new CcdRoleConfig("prd-admin", PUBLIC),
            new CcdRoleConfig("allocated-magistrate",PUBLIC),
            new CcdRoleConfig("tribunal-caseworker", PUBLIC),
            new CcdRoleConfig("ctsc", PUBLIC),
            new CcdRoleConfig("senior-tribunal-caseworker", PUBLIC),
            new CcdRoleConfig("hearing-centre-admin", PUBLIC),
            new CcdRoleConfig("judge", PUBLIC),
            new CcdRoleConfig("caseworker-privatelaw-courtadmin-casecreator", PUBLIC),
            new CcdRoleConfig("caseworker-approver", PUBLIC),
            new CcdRoleConfig("caseworker-caa", PUBLIC),
    };

    private final CcdEnvironment environment;

    public HighLevelDataSetupApp(CcdEnvironment dataSetupEnvironment) {
        super(dataSetupEnvironment);
        environment = dataSetupEnvironment;
    }

    public static void main(String[] args) throws Throwable {
        main(HighLevelDataSetupApp.class, args);
    }

    public void createRoleAssignments() {
        BeftaUtils.defaultLog("Will NOT create role assignments!");
    }

    @Override
    protected boolean shouldTolerateDataSetupFailure() {
        return true;
    }

    @Override
    public void addCcdRoles() {
        for (CcdRoleConfig roleConfig : CCD_ROLES_NEEDED_FOR_PRL) {
            try {
                addCcdRole(roleConfig);
            } catch (Exception e) {
                if (!shouldTolerateDataSetupFailure()) {
                    throw e;
                }
            }
        }
    }

    @Override
    protected List<String> getAllDefinitionFilesToLoadAt(String definitionsPath) {
        String environmentName = environment.name().toLowerCase(Locale.UK);
        return List.of(String.format("definitions/private-law/xlsx/ccd-config-PRL-%s.xlsx", environmentName));
    }
}
