-- Grants needed for testing/building.
GRANT SELECT,INSERT,UPDATE ON GCRAACT TO Z_AUTUMN_CANFIELD;
GRANT SELECT,INSERT,UPDATE ON GCBPBTR TO Z_AUTUMN_CANFIELD;
GRANT SELECT,INSERT,UPDATE,DELETE ON BANINST1.ZSTULPR TO Z_AUTUMN_CANFIELD;

-- Grants required by Page Builder.
GRANT READ ON saturn.stvstat TO ban_default_pagebuilder_m;
GRANT SELECT, INSERT, UPDATE ON baninst1.ZSTULPR TO ban_default_pagebuilder_m;


-- Link Action Item with Page Builder page
INSERT INTO GCBPBTR (GCBPBTR_PAGE_ID,
                     GCBPBTR_TEMPLATE_NAME,
                     GCBPBTR_SOURCE_IND,
                     GCBPBTR_SYSTEM_REQUIRED,
                     GCBPBTR_ACTIVE_IND,
                     GCBPBTR_ACTIVITY_DATE,
                     GCBPBTR_USER_ID,
                     GCBPBTR_DATA_ORIGIN,
                     GCBPBTR_DESCRIPTION)
  SELECT 'AIPLicensurePrograms',
         'State Licensure Programs',
         'B',
         'N',
         'Y',
         SYSDATE,
         'Z_AUTUMN_CANFIELD',
         'BAN_DEFAULT_PAGEBUILDER_M',
         '<p>Per state regulations the following information must be provided to students in route-to-licensure programs. The degree program you have selected typically leads to licensure, and was designed to meet licensing qualifications in the state of Utah. If you wish to work in another state within the United States, please review the qualifications for that state, and acknowledge receipt of this message below.</p>'
    FROM DUAL
   WHERE NOT EXISTS
           (SELECT 1
              FROM GCBPBTR
             WHERE GCBPBTR_PAGE_ID = 'AIPLicensurePrograms');


-- Assign licensure action item (id 58) to a user
insert into GCRAACT(GCRAACT_GCBACTM_ID, GCRAACT_GCVASTS_ID, GCRAACT_PIDM, GCRAACT_GCBAGRP_ID,
                    GCRAACT_DISPLAY_START_DATE, GCRAACT_DISPLAY_END_DATE, GCRAACT_ACTIVITY_DATE, GCRAACT_USER_ID,
                    GCRAACT_USER_RESPONSE_DATE, GCRAACT_CREATOR_ID, GCRAACT_CREATE_DATE, GCRAACT_DATA_ORIGIN)
values (58, 1, :user_pidm, 2,
        to_date('01-SEP-24 00:00:00', 'DD-MON-RR HH24:MI:SS'),
        to_date('01-DEC-24 00:00:00', 'DD-MON-RR HH24:MI:SS'),
        sysdate, 'COMMMGR', null, 'SYSTEM', sysdate, 'Banner');

