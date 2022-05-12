/* Formatted on 10/8/2021 4:14:44 PM (QP5 v5.371) */
GRANT READ ON GTVIMST TO ban_default_pagebuilder_m;

GRANT READ ON GTVIMMU TO ban_default_pagebuilder_m;

GRANT SELECT, INSERT, UPDATE ON GORIMMU TO ban_default_pagebuilder_m;

GRANT READ ON baninst1.zsrimst TO ban_default_pagebuilder_m, usr_ss_default_m;

--Add Action Item Processing Template to index

INSERT INTO GCBPBTR (GCBPBTR_PAGE_ID,
                     GCBPBTR_TEMPLATE_NAME,
                     GCBPBTR_SOURCE_IND,
                     GCBPBTR_SYSTEM_REQUIRED,
                     GCBPBTR_ACTIVE_IND,
                     GCBPBTR_ACTIVITY_DATE,
                     GCBPBTR_USER_ID,
                     GCBPBTR_DATA_ORIGIN,
                     GCBPBTR_DESCRIPTION)
  SELECT 'AIPImmunizationSurvey',
         'Immunization Survey',
         'B',
         'N',
         'Y',
         SYSDATE,
         'Z_CARL_ELLSWORTH',
         'BAN_DEFAULT_PAGEBUILDER_M',
         '<p>A COVID-19 vaccination is required to attend Utah State University for Spring Semester 2022. Please declare your vaccination status.</p>'
    FROM DUAL
   WHERE NOT EXISTS
           (SELECT 1
              FROM GCBPBTR
             WHERE GCBPBTR_PAGE_ID = 'AIPImmunizationSurvey');

--Add permissions for API utility account

GRANT READ ON gtvimst TO IMMU_UTIL;

GRANT READ ON gtvimmu TO IMMU_UTIL;

GRANT SELECT, INSERT, UPDATE ON gorimmu TO IMMU_UTIL;