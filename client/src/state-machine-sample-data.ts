import {
  BuildingInfoResults,
  AddressRecord,
  IndicatorsHistoryResults,
  SummaryStatsRecord,
} from "components/APIDataTypes";

export const SAMPLE_BUILDING_INFO_RESULTS: BuildingInfoResults = {
  // bbl:3002920026
  result: [
    {
      formatted_address: "144 COURT STREET",
      housenumber: "144",
      streetname: "COURT STREET",
      bldgclass: "O5",
      unitsres: 0,
      boro: "BROOKLYN",
      latitude: 40.6889099948209,
      longitude: -73.99302988771,
      lastregistrationdate: "",
      registrationenddate: "",
      nycha_development: null,
      nycha_dev_evictions: null,
      nycha_dev_unitsres: null,
    },
  ],
};

export const SAMPLE_NYCHA_BUILDING_INFO_RESULTS: BuildingInfoResults = {
  // bbl:2037250001
  result: [
    {
      formatted_address: "1755 BRUCKNER BOULEVARD",
      housenumber: "1755",
      streetname: "BRUCKNER BOULEVARD",
      bldgclass: "D3",
      unitsres: 534,
      boro: "BRONX",
      latitude: 40.826506542075805,
      longitude: -73.86649903642933,
      lastregistrationdate: "",
      registrationenddate: "",
      nycha_development: "SOTOMAYOR HOUSES",
      nycha_dev_evictions: 14,
      nycha_dev_unitsres: 1506,
    },
  ],
};

export const SAMPLE_ADDRESS_RECORDS: AddressRecord[] = [
  {
    housenumber: "654",
    streetname: "PARK PLACE",
    zip: "11216",
    boro: "BROOKLYN",
    registrationid: "352819",
    hpdbuildingid: 351993,
    hpdbuildings: 1,
    lastregistrationdate: "2019-08-30",
    registrationenddate: "2020-09-01",
    bbl: "3012380016",
    bin: "3031404",
    corpnames: ["654 PARK PLACE LLC"],
    businessaddrs: ["12 SPENCER STREET 4 11205"],
    ownernames: [
      { title: "HeadOfficer", value: "MOSES GUTMAN" },
      { title: "Agent", value: "NATHAN SCHWARCZ" },
    ],
    allcontacts: [
      {
        title: "Agent",
        value: "NATHAN SCHWARCZ",
        address: {
          zip: "11205",
          city: "BROOKLYN",
          state: "NY",
          apartment: "4",
          streetname: "SPENCER STREET",
          housenumber: "12",
        },
      },
      {
        title: "HeadOfficer",
        value: "MOSES GUTMAN",
        address: {
          zip: "11205",
          city: "BROOKLYN",
          state: "NY",
          apartment: "4",
          streetname: "SPENCER STREET",
          housenumber: "12",
        },
      },
      {
        title: "Corporation",
        value: "654 PARK PLACE LLC",
        address: {
          zip: "11205",
          city: "BROOKLYN",
          state: "NY",
          apartment: "4",
          streetname: "SPENCER STREET",
          housenumber: "12",
        },
      },
    ],
    totalviolations: 12,
    openviolations: 0,
    recentcomplaints: 1,
    totalcomplaints: 2,
    recentcomplaintsbytype: [{ type: "HEAT/HOT WATER", count: 3 }],
    unitsres: 13,
    yearbuilt: 1931,
    yearstartedj51: 2001,
    yearstarted421a: null,
    council: 35,
    lat: 40.6737974139504,
    lng: -73.9562781322538,
    evictions: null,
    evictionfilings: null,
    rsunits2007: 11,
    rsunitslatest: 12,
    rsunitslatestyear: 2017,
    rsdiff: 1,
    lastsaleacrisid: "2008012400521001",
    lastsaledate: "2008-01-17",
    lastsaleamount: 750000,
    mapType: "search",
  },
  {
    housenumber: "378",
    streetname: "LEWIS AVENUE",
    zip: "11233",
    boro: "BROOKLYN",
    registrationid: "323149",
    hpdbuildingid: 324851,
    hpdbuildings: 1,
    lastregistrationdate: "2019-08-06",
    registrationenddate: "2020-09-01",
    bbl: "3016690036",
    bin: "3046748",
    corpnames: ["378 LEWIS LLC"],
    businessaddrs: ["12 SPENCER STREET 4 11205"],
    ownernames: [
      { title: "HeadOfficer", value: "ALEX ENGELMAN" },
      { title: "Officer", value: "MOSES GUTMAN" },
      { title: "Agent", value: "NAFTALI GESTETNER" },
    ],
    allcontacts: [
      {
        title: "Agent",
        value: "NAFTALI GESTETNER",
        address: {
          zip: "11205",
          city: "BROOKLYN",
          state: "NY",
          apartment: "4",
          streetname: "SPENCER STREET",
          housenumber: "12",
        },
      },
      {
        title: "HeadOfficer",
        value: "ALEX ENGELMAN",
        address: {
          zip: "11205",
          city: "BROOKLYN",
          state: "NY",
          apartment: "4",
          streetname: "SPENCER STREET",
          housenumber: "12",
        },
      },
      {
        title: "Officer",
        value: "MOSES GUTMAN",
        address: {
          zip: "11205",
          city: "BROOKLYN",
          state: "NY",
          apartment: "4",
          streetname: "SPENCER STREET",
          housenumber: "12",
        },
      },
      {
        title: "Corporation",
        value: "378 LEWIS LLC",
        address: {
          zip: "11205",
          city: "BROOKLYN",
          state: "NY",
          apartment: "4",
          streetname: "SPENCER STREET",
          housenumber: "12",
        },
      },
    ],
    totalviolations: 18,
    openviolations: 1,
    totalcomplaints: 3,
    recentcomplaints: 3,
    recentcomplaintsbytype: [
      { type: "PESTS", count: 2 },
      { type: "HEAT/HOT WATER", count: 1 },
    ],
    unitsres: 8,
    yearbuilt: 1910,
    yearstartedj51: null,
    yearstarted421a: 2020,
    council: 36,
    lat: 40.6825213771841,
    lng: -73.9352559095722,
    evictions: null,
    evictionfilings: null,
    rsunits2007: 8,
    rsunitslatest: 0,
    rsunitslatestyear: 2017,
    rsdiff: -8,
    lastsaleacrisid: "2013041200684001",
    lastsaledate: "2013-03-22",
    lastsaleamount: 1800000,
    mapType: "base",
  },
];

export const SAMPLE_TIMELINE_DATA: IndicatorsHistoryResults = {
  result: [
    {
      month: "2019-07",
      hpdcomplaints_emergency: 1,
      hpdcomplaints_nonemergency: 0,
      hpdcomplaints_total: 1,
      dobpermits_total: 2,
      hpdviolations_class_a: 1,
      hpdviolations_class_b: 0,
      hpdviolations_class_c: 2,
      hpdviolations_total: 3,
      dobviolations_regular: 1,
      dobviolations_ecb: 1,
      dobviolations_total: 2,
      evictionfilings_total: 0,
      rentstab_total: 4,
    },
  ],
};
