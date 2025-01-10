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
  SELECT 'AIPZipCodeCollectorSummer',
         'Zip Code Collector Summer 2025',
         'B',
         'N',
         'Y',
         SYSDATE,
         :created_by,
         'BAN_DEFAULT_PAGEBUILDER_M',
         '<p>USU regularly asks students to inform us where they are attending classes. This information is used to validate registrations and headcounts for funding purposes. This allows us to ensure the various campuses statewide have the resources needed to meet student needs.</p>'
    FROM DUAL
   WHERE NOT EXISTS
           (SELECT 1
              FROM GCBPBTR
             WHERE GCBPBTR_PAGE_ID = 'AIPZipCodeCollectorSummer');
