package uk.gov.hmcts.reform.prl;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import uk.gov.hmcts.befta.dse.ccd.CcdEnvironment;
import uk.gov.hmcts.befta.dse.ccd.CcdRoleConfig;
import uk.gov.hmcts.befta.dse.ccd.DataLoaderToDefinitionStore;
import uk.gov.hmcts.befta.util.BeftaUtils;

import java.util.List;
import java.util.Locale;

public class HighLevelDataSetupApp extends DataLoaderToDefinitionStore {

    private static final Logger logger = LoggerFactory.getLogger(HighLevelDataSetupApp.class);

    public static final String PUBLIC = "PUBLIC";
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
            new CcdRoleConfig("caseworker-privatelaw-systemupdate", PUBLIC),
            new CcdRoleConfig("payments", PUBLIC),
            new CcdRoleConfig("pui-case-manager", PUBLIC),
            new CcdRoleConfig("courtnav", PUBLIC),
            new CcdRoleConfig("caseworker-wa-task-configuration", PUBLIC),
            new CcdRoleConfig("caseworker-ras-validation", PUBLIC),
            new CcdRoleConfig("GS_profile", PUBLIC),
            new CcdRoleConfig("caseworker-privatelaw-cafcass", PUBLIC),
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
                logger.info("\n\nAdding CCD Role {}.", roleConfig);
                addCcdRole(roleConfig);
                logger.info("\n\nAdded CCD Role {}.", roleConfig);
            } catch (Exception e) {
                logger.error("\n\nCouldn't add CCD Role {} - Exception: {}.\n\n", roleConfig, e);
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
