# Action Item Processing Templates

Storage for IT managed AIP templates.

AIP Uses page builder as the templates.

Once a template is configured, you can just edit the page in page builder to view/test the changes in an action item.

Once tested, create/update a folder for the action item in this repo.

* Export and save the JSON for the page
* Export and save any virtual domains needed
* Any changes needed to the action item should be reflected in this repository.

Currently maintained AIP templates:
* AIPZipCodeCollector
* AIPLicensurePrograms
* AIPImmunizationSurvey

## AIPZipCodeCollector
This process is for collecting information about where students will be studying for each semester.
Originally written in 2021 by John Pope. These Page Builder pages/Action Items currently need to be updated every term
because the term code is hard coded and would be a little painful to automate. Prior to Summer 2025, one action item
was used for spring semester, and then a second was used for both summer and fall, however for Summer 2025 (202530)
the registrars have moved summer registration times so that there need to be separate pages for each, but with different
term codes. The summer and fall action items will be added at different times but will overlap, so we can't just have a
single page we need a copy that differs only by term code.

So the process moving forward is that we have three different pages (spring, summer, & fall) in Page Builder that differ
only by the term code specified in `ActionItemContentDetail_onload.js`. Before each registration perioid begins we need to:
1. Update the particular Page Builder page by editing the `ActionItemContentDetail` component and changing it's `onLoad`
property with the contents of `ActionItemContentDetail_onload.js` with an updated term code. (Don't forget to hit the
"Compile & Save" button)
2. If the registrars has created a new Action Item, you will need to insert a record into `GCBPBTR`.
(See `SQL/pageBuilderToAIP.sql`). If the Action Item is just being updated, then the existing record in GCBPBTR can be
updated to match.
3. The entire Page Builder page can then be exported from ZDEVL and imported in ZPPRD/ZPROD. The `GCBPBTR` record will
also need to be created.

## AIPLicensurePrograms
Originally written in 2024. Currently the Action Item is assigned based on the student's program and asks whether or
not they intend to licensure. If the student does, they are asked which state they intend to practice in and are provided
a link to a site with info for the student to determine whether or not the license for their program is valid in the state
they intend to practice in.

Notes for the proposed features for a future version:
* There is already an x-walk for mapping programs to banner degrees?
* Create resource/make sure page builder has the program x-walk & assigned program data.
* Need to put the data about in which states licenses are valid into banner.
* When state is selected, inform the user and highlight whether license is valid in selected state.

I think that Page Builder/Action items is not going to be a feasable/worthwhile way of implementing something more
complicated like the Registrars wants. In addition to all the maintainance issues I believe there are some accessibility
problems with our current system.

## SQL Notes

### Automatic Assignment of Action Items

Once you've identified the specific event that determines the need to apply an action item to a user, can use the Ellucian delivered function ```GCKPACT.f_post_action_item``` to do so.
You can also manually assign the action item with the following query:
```sql
insert into GCRAACT(GCRAACT_GCBACTM_ID, GCRAACT_GCVASTS_ID, GCRAACT_PIDM, GCRAACT_GCBAGRP_ID,
                    GCRAACT_DISPLAY_START_DATE, GCRAACT_DISPLAY_END_DATE, GCRAACT_ACTIVITY_DATE, GCRAACT_USER_ID,
                    GCRAACT_USER_RESPONSE_DATE, GCRAACT_CREATOR_ID, GCRAACT_CREATE_DATE, GCRAACT_DATA_ORIGIN)
values (:action_item_id, 1, :pidm, 2, to_date('01-SEP-24 00:00:00', 'DD-MON-RR HH24:MI:SS'),
        to_date('01-DEC-24 00:00:00', 'DD-MON-RR HH24:MI:SS'), sysdate, 'COMMMGR', null, 'SYSTEM', sysdate, 'Banner');
```

### Resetting Status

> Requires `select`, `update` permissions on `gcraact`.
>
> ```sql
> GRANT SELECT, INSERT, UPDATE, DELETE on GCRAACT to Z_YOUR_USER;
> ```
> May also need/want `insert`, though the population should create a record for any users you plan to test with

Typically we test these with your user and/or Joe Student on ZPPRD/ZDEVL - `A01505436`

Reset query:

```sql
UPDATE general.gcraact
  SET gcraact_gcvasts_id = 1,                                    --status_id
      gcraact_user_id = 'COMMMGR',
      gcraact_user_response_date = NULL,
      gcraact_gcraisr_id = NULL                                --response_id
WHERE gcraact_surrogate_id = :surrogate_id;
commit;
```

### SQL notes

To associate a Page Builder page with an Action Item, you will need to insert a record into `GCBPBTR` connecting the two by name.
See (SQL/pageBuilderToAIP.sql)[SQL/pageBuilderToAIP.sql] for an example of what that insert should look like.
 
Other useful queries for managing status of Action Items etc:

```sql
select * from spriden where spriden_id = :anumber;
-- PIDM: 2734905 (joe studen PIDM)

-- Action Item Maintenance: Defines main attributes of action items.
select * from gcbactm;
-- GCBACTM_SURROGATE_ID: use this for finding the response

-- Assigned Action Item: Stores the details of an action item posted for a person.
select * from gcraact
where
and gcraact_pidm = :pidm
order by gcraact_activity_date desc;
-- GCRAACT_GCBACTM_ID: use this value for the surrogate_id in the reset query for the AIPImmunizationSurvey

-- Action Item Status Rule: Defines the status rules for an action item.
select * from gcraisr;
-- GCAISR_SURROGATE_ID: use this when updating a status via JS (STATUS_RULE_ID)

-- Action Item Status Validation: List of values of statuses for action item status rules.
select * from gcvasts;
-- 1: pending
-- 2: completed
-- 3: rejected
```

## Links

## Ellucian Resources

* [AIP Overview](https://resources.elluciancloud.com/bundle/banner_genss_acn_configure/page/c_aip_overview.html)
* [Banner Extensibility -> Page Builder](https://resources.elluciancloud.com/bundle/banner_exten_acn_use_9.10.0/page/c_page_builder.html)
* [AIP Data Model](https://ellucian.force.com/clients/s/article/BannerGeneralSsb-AIP-Action-Item-Processing-simple-ERD-diagrams-of-table-relationships) (pdf)
* [Ellucian Page Builder Examples](https://ellucian.force.com/clients/s/article/Where-can-we-find-Banner-Extensibility-Page-Builder-examples)
* [Ellucian Extensibility docs](https://resources.elluciancloud.com/bundle/banner_extensibility_rel_release_notes/page/c_banner_exten_910.html) Click on the triple dot menu and select attachments. zip files with pdf documents including user guide.

### [USU Banner DEV](https://development.banner.usu.edu/)

* [General Self Service](https://ss-zdevl.banner.usu.edu/BannerGeneralSsb/)
  * [Action Items](https://ss-zdevl.banner.usu.edu/BannerGeneralSsb/ssb/aip#/list)
  * [Action Items Administration](https://ss-zdevl.banner.usu.edu/BannerGeneralSsb/ssb/aipAdmin/#/landing)
* [Extensibility Page Builder](https://ss-zdevl.banner.usu.edu/BannerExtensibility/)
* [Communitcation Management](https://ss-zdevl.banner.usu.edu/CommunicationManagement/ssb/communication#/communication)(populations)


## Maintainers
* Registrars, process owner: Adam Gleed
* EAA, Banner admin AI assignment process: Trevor Bennett
* EI, Page Builder page maintainer: Autumn Canfield
