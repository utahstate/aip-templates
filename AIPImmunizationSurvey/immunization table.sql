/* Formatted on 10/13/2021 3:58:20 PM (QP5 v5.336) */
SET DEF OFF;

SET ESCAPE '\';

CREATE TABLE baninst1.zsrimst
(
  zsrimst_id           NUMBER GENERATED ALWAYS AS IDENTITY NOT NULL,
  zsrimst_imst_code    VARCHAR2 (2) NOT NULL,
  zsrimst_long_desc    VARCHAR2 (4000) NOT NULL
);

DELETE FROM baninst1.zsrimst;

COMMIT;

INSERT INTO baninst1.zsrimst (zsrimst_imst_code, zsrimst_long_desc)
       VALUES (
         'VC',
         'I am fully vaccinated, but have not yet uploaded proof of vaccination in Aggie Health.<br>A person is fully vaccinated two weeks after they received their final dose of a required and/or accepted vaccine (two doses for Comirnaty/Pfizer or Moderna; one for Johnson \& Johnson). I understand a university official will follow up with me regarding my vaccination status.<br>**Information for uploading my proof of vaccination can be found at <a href="https://aggiehealth.usu.edu">aggiehealth.usu.edu</a>');

INSERT INTO baninst1.zsrimst (zsrimst_imst_code, zsrimst_long_desc)
       VALUES (
         'PL',
         'I am not fully vaccinated, but I plan to be and will upload my proof of vaccination before spring semester starts on Monday, January 10, 2022. I understand that a university official will follow up with me regarding my vaccination status.<br>**Information for vaccination clinics can be found at <a href="https://vaccine.usu.edu">vaccine.usu.edu</a>.');

INSERT INTO baninst1.zsrimst (zsrimst_imst_code, zsrimst_long_desc)
       VALUES (
         'XA',
         'I am claiming an exemption from USU''s vaccination requirement because I will still be under 18 years old when spring semester starts on Monday, January 10, 2022.');

INSERT INTO baninst1.zsrimst (zsrimst_imst_code, zsrimst_long_desc)
       VALUES (
         'NA',
         'During spring semester 2022, because I am attending courses <strong>fully online <em>and</em> reside outside the state of Utah</strong>, I am claiming an exemption from USU''s vaccination requirement. I understand that a university official will follow up with me regarding my vaccination status.');

INSERT INTO baninst1.zsrimst (zsrimst_imst_code, zsrimst_long_desc)
       VALUES (
         'XM',
         'I am not fully vaccinated. I state that I am eligible for an exemption from USU''s vaccination requirement based on a <strong>medical reason</strong> provided under Utah Law.');

INSERT INTO baninst1.zsrimst (zsrimst_imst_code, zsrimst_long_desc)
       VALUES (
         'XR',
         'I am not fully vaccinated. I state that I am eligible for an exemption from USU''s vaccination requirement based on a <strong>religious belief</strong> provided under Utah Law.<br>Please provide a statement of religious beliefs in the comment box below.');

INSERT INTO baninst1.zsrimst (zsrimst_imst_code, zsrimst_long_desc)
       VALUES (
         'XP',
         'I am not fully vaccinated. I state that I am eligible for an exemption from USU''s vaccination requirement based on a <strong>personal belief</strong> provided under Utah Law.<br>Please provide a statement of personal belief in the comment box below.');

COMMIT;

SELECT * FROM BANINST1.ZSRIMST;