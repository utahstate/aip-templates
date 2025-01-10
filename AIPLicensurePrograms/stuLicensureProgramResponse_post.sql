BEGIN
  INSERT INTO baninst1.ZSTULPR (ZSTULPR_PIDM,
                                ZSTULPR_STATE_CODE,
                                ZSTULPR_AKNOWLEDGE_DATE)
  VALUES ( :parm_user_pidm, :STATE_CODE, SYSDATE);
END;
