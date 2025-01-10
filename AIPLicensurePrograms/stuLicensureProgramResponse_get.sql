SELECT ZSTULPR_ID                "id",
       ZSTULPR_PIDM              PIDM,
          NVL (SPBPERS_PREF_FIRST_NAME, SPRIDEN_FIRST_NAME)
       || ' '
       || SPRIDEN_LAST_NAME      DISPLAY_NAME,
       ZSTULPR_STATE_CODE        STATE_CODE,
       STVSTAT_DESC              STATE_DESCRIPTION,
       ZSTULPR_AKNOWLEDGE_DATE  ACKNOWLEDGE_DATE
  FROM BANINST1.ZSTULPR
       JOIN SPRIDEN
         ON SPRIDEN_PIDM = ZSTULPR_PIDM AND SPRIDEN_CHANGE_IND IS NULL
       LEFT JOIN SPBPERS ON SPBPERS_PIDM = ZSTULPR_PIDM
       LEFT JOIN STVSTAT ON STVSTAT_CODE = ZSTULPR_STATE_CODE
 WHERE     ZSTULPR_ID = NVL ( :id, ZSTULPR_ID)
       AND ZSTULPR_PIDM = NVL ( :parm_user_pidm, ZSTULPR_PIDM)
