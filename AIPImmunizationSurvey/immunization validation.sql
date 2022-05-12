/* Formatted on 10/8/2021 4:15:05 PM (QP5 v5.371) */
SELECT * FROM gtvimmu;

INSERT INTO gtvimmu (gtvimmu_code,
                     gtvimmu_desc,
                     gtvimmu_activity_date,
                     gtvimmu_user_id,
                     gtvimmu_data_origin)
     VALUES ('COVID-19',
             'Coronavirus disease SARS-CoV-2',
             SYSDATE,
             'A00350677',
             'Banner');

SELECT * FROM gtvimst;

INSERT INTO gtvimst (gtvimst_code,
                     gtvimst_desc,
                     gtvimst_user_id,
                     gtvimst_activity_date,
                     gtvimst_data_origin)
     VALUES ('XA',
             'Exempt for Age',
             'A00350677',
             SYSDATE,
             'Banner');

INSERT INTO gtvimst (gtvimst_code,
                     gtvimst_desc,
                     gtvimst_user_id,
                     gtvimst_activity_date,
                     gtvimst_data_origin)
     VALUES ('VC',
             'Fully Vaccinated',
             'A00350677',
             SYSDATE,
             'Banner');

INSERT INTO gtvimst (gtvimst_code,
                     gtvimst_desc,
                     gtvimst_user_id,
                     gtvimst_activity_date,
                     gtvimst_data_origin)
     VALUES ('PL',
             'Plans for Vaccination',
             'A00350677',
             SYSDATE,
             'Banner');

INSERT INTO gtvimst (gtvimst_code,
                     gtvimst_desc,
                     gtvimst_user_id,
                     gtvimst_activity_date,
                     gtvimst_data_origin)
     VALUES ('NA',
             'No need for Vaccination',
             'A00350677',
             SYSDATE,
             'Banner');

INSERT INTO gtvimst (gtvimst_code,
                     gtvimst_desc,
                     gtvimst_user_id,
                     gtvimst_activity_date,
                     gtvimst_data_origin)
     VALUES ('XM',
             'Exempt for Medical Reasons',
             'A00350677',
             SYSDATE,
             'Banner');

INSERT INTO gtvimst (gtvimst_code,
                     gtvimst_desc,
                     gtvimst_user_id,
                     gtvimst_activity_date,
                     gtvimst_data_origin)
     VALUES ('XR',
             'Exempt for Religious Reasons',
             'A00350677',
             SYSDATE,
             'Banner');

INSERT INTO gtvimst (gtvimst_code,
                     gtvimst_desc,
                     gtvimst_user_id,
                     gtvimst_activity_date,
                     gtvimst_data_origin)
     VALUES ('XP',
             'Exempt for Personal Reasons',
             'A00350677',
             SYSDATE,
             'Banner');