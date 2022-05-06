AIP for collecting Zip Codes from students as part of the registration process.

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


### TODO:

- [ ] Fix names of components/virtual domains
- [ ] Remove unused query from virtual domain
- [ ] Use CSS for page builder instead of inlined/js
- [ ] Use page builder import/export for organizing this archive
- [ ] Move zip code save method to the AIP save event instead of on the save button onclick (may not work, angular js events bindings might cause issues)
- [ ] get rid of timeout for radio to checkbox js if possible
- [ ] Hide elements that change and then display them only once they are ready so they don't flash on the screen in the wrong state
- [ ] Consolodate scripts so there is less setup required and less complexity in dealing with load states of all of the various components individually.
