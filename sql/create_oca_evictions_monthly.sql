
-- Indicators for WOW timeline tab

DROP TABLE IF EXISTS oca_evictions_monthly cascade;
CREATE TABLE oca_evictions_monthly (
    bbl CHAR(10),
    month DATE,
    evictionfilings INT,
    PRIMARY KEY (bbl, month)
);
CREATE INDEX ON oca_evictions_monthly (bbl);
CREATE INDEX ON oca_evictions_monthly (bbl, month);
