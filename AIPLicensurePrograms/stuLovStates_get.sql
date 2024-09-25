SELECT stvstat_surrogate_id   "id",
stvstat_code           state_code,
stvstat_desc           state_description
FROM saturn.stvstat
WHERE stvstat_edi_equiv IS NOT NULL
