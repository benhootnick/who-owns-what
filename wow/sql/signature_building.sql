SELECT
    bbl,
    address,
    zip,
    borough,
    coun_dist,
    assem_dist,
    stsen_dist,
    cong_dist,
    units_res,
    units_comm,
    year_built,
    evictions,
    hpd_viol_bc_open,
    hpd_viol_bc_total,
    hpd_comp_emerg_total,
    hpd_comp_apts_pct,
    hpd_comp_apts,
    landlord,
    lender,
    origination_date,
    debt_total,
    debt_per_unit,
    lat,
    lng
FROM signature_bldgs
WHERE bbl = %(bbl)s
