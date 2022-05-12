/* Formatted on 10/7/2021 10:14:44 AM (QP5 v5.371) */
SELECT * FROM gorimmu;

--single record update

MERGE INTO gorimmu
     USING (SELECT :param_pidm      immu_pidm,
                   :param_date      immu_date,
                   :param_comment   immu_comment
              FROM DUAL) immu
        ON (    gorimmu_pidm = immu_pidm
            AND gorimmu_immu_code = 'COVID-19'
            AND TRUNC (gorimmu_immu_date) = TRUNC (immu_date))
/*
WHEN MATCHED
THEN
  UPDATE SET
    gorimmu_comment = immu_comment
*/
WHEN NOT MATCHED
THEN
  INSERT     (gorimmu_pidm,
              gorimmu_immu_code,
              gorimmu_seq_no,
              gorimmu_user_id,
              gorimmu_activity_date,
              gorimmu_immu_date,
              gorimmu_imst_code,
              gorimmu_comment,
              gorimmu_data_origin)
      VALUES (
               immu_pidm,
               'COVID-19',
               (SELECT NVL (MAX (gorimmu_seq_no), 0) + 1   new_seq_no
                  FROM gorimmu
                 WHERE     gorimmu_pidm = immu_pidm
                       AND gorimmu_immu_code = 'COVID-19'),
               'AGGIE_HEALTH',
               SYSDATE,
               immu_date,
               'VC',                                              --vaccinated
               NVL (immu_comment, NULL),
               'AGGIE_HEALTH');