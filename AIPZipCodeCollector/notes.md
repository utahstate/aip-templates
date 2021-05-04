AIP for collecting Zip Codes from students as part of the registration process.

[AIP Template JSON](pages.AIPZipCodeCollector.json)
[Virtual Domain for updating Zip Code](virtualDomains.AIPStuStudentLocationTestJohn.json)

Edit page builder page called AIPZipCodeCollector. When done, export the page and save in this folder. If any other js blocks are used, create a file and save in this folder.

The js goes in ActionItemContentDetail -> onload

Reset status example:

    UPDATE gcraact
      SET gcraact_gcvasts_id = 1,                      --status_id
        gcraact_user_id = 'COMMMGR',
        gcraact_user_response_date = NULL,
        gcraact_gcraisr_id = NULL                      --response_id
    WHERE gcraact_surrogate_id = 230873;

View Zip Codes:

    select * from ZSRLOCA
    order by zsrloca_created_date desc;
