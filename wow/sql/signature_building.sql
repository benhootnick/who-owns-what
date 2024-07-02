SELECT
    bbl,
    address,
    zip,
    borough,
    landlord,
    landlord_slug,
    lender,
    lender_slug,
    units_res,
    units_nonres,
    rs_units,
    year_built,
    bip,
    hpd_viol_bc_open,
    hpd_viol_bc_open_per_unit,
    hpd_viol_bc_total,
    hpd_viol_bc_open_per_unit,
    hpd_viol_heat,
    hpd_viol_water,
    hpd_viol_pests,
    hpd_erp_orders,
    hpd_erp_orders_per_unit,
    hpd_erp_charges,
    hpd_erp_charges_per_unit,
    hpd_comp_emerg_total,
    hpd_comp_emerg_total_per_unit,
    hpd_comp_heat,
    hpd_comp_water,
    hpd_comp_pests,
    hpd_comp_apts_pct,
    hpd_comp_apts,
    last_rodent_date,
    last_rodent_result,
    in_aep,
    in_conh,
    in_ucp,
    evictions_executed,
    evictions_filed,
    hp_total,
    hp_active,
    hp_open_judgements,
    hp_find_harassment,
    hp_penalies,
    dob_jobs,
    dob_ecb_viol_total,
    dob_ecb_viol_open,
    water_charges,
    last_sale_date,
    origination_date,
    debt_total,
    debt_per_unit,
    coun_dist,
    assem_dist,
    stsen_dist,
    cong_dist,
    link_wow,
    link_hpd,
    link_acris,
    link_dob,
    link_dap,
    link_political,
    lat,
    lng
FROM signature_buildings
WHERE bbl = %(bbl)s
