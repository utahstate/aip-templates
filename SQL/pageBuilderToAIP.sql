--Add Page Builder Page as Action Item Processing Template

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