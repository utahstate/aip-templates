/* Formatted on 10/8/2021 4:15:29 PM (QP5 v5.371) */
SELECT * FROM GCVASTS;

--action item metadata (names and IDs)

SELECT * FROM GCBACTM;                                                                                                                                                                                                                                                                                                                      --38

--action item assignment (job)

SELECT *
  FROM gcraact
 WHERE gcraact_gcbactm_id = 37;

--action item response labels

SELECT * FROM gcraisr;

--reset specific AIP response

UPDATE gcraact
   SET gcraact_gcvasts_id = 1,                                     --status_id
       gcraact_user_id = 'COMMMGR',
       gcraact_user_response_date = NULL,
       gcraact_gcraisr_id = NULL                                 --response_id
 WHERE gcraact_surrogate_id = 335360;

DELETE FROM gcraact
      WHERE gcraact_surrogate_id = 230875;

SELECT * FROM gorimmu;

DELETE FROM gorimmu
      WHERE gorimmu_pidm = 206419;