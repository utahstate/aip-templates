# Action Item Processing Templates

Storage for IT managed AIP templates.

AIP Uses page builder as the templates.

Once a template is configured, you can just edit the page in page builder to view/test the changes in an action item.

Once tested, create/update a folder for the action item in this repo.

* Export and save the JSON for the page
* Export and save any virtual domains needed
* Any changes needed to the action item should be refelcted in this repository.

## SQL Notes

### Resetting status

> Requires `select`, `update` permissions on `gcraact`.
>
> ```sql
> GRANT SELECT, UPDATE on GCRAACT to Z_YOUR_USER;
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

Notes on other related tables to help figure out what ids to use for managing AIP statuses:

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

## Resources

* [AIP Overview](https://resources.elluciancloud.com/bundle/banner_genss_acn_configure_9.10.0/page/c_aip_overview.html)
* [Banner Extensibility -> Page Builder](https://resources.elluciancloud.com/bundle/banner_exten_acn_use_9.10.0/page/c_page_builder.html)
* [AIP Data Model](https://ellucian.force.com/clients/s/article/BannerGeneralSsb-AIP-Action-Item-Processing-simple-ERD-diagrams-of-table-relationships) (pdf)

### [USU Banner DEV](https://development.banner.usu.edu/)

* [General Self Service](https://ss-zdevl.banner.usu.edu/BannerGeneralSsb/)
  * [Action Items](https://ss-zdevl.banner.usu.edu/BannerGeneralSsb/ssb/aip#/list)
  * [Action Items Administration](https://ss-zdevl.banner.usu.edu/BannerGeneralSsb/ssb/aipAdmin/#/landing)
* [Extensibility Page Builder](https://ss-zdevl.banner.usu.edu/BannerExtensibility/)
* [Communitcation Management](https://ss-zdevl.banner.usu.edu/CommunicationManagement/ssb/communication#/communication)(populations)
