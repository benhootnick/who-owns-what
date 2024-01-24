SELECT
  COALESCE(COUNT(*), 0)::NUMERIC AS VIOLATIONS
FROM HPD_VIOLATIONS
WHERE BBL = %(bbl)s
  AND COALESCE(NOVISSUEDDATE, INSPECTIONDATE) BETWEEN %(start_date)s AND %(end_date)s
