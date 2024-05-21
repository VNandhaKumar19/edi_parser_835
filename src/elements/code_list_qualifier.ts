import { stringObject } from "../utilities/model";

const code_list_qualifier: stringObject = {
    "0": "Document Identification Code",
    "1": "Free On Board Site Code",
    "2": "",
    "3": "Kind of Contract Code",
    "4": "Type of Contract Code",
    "5": "Criticality Designator Code",
    "6": "",
    "7": "Quality Assurance Site Code",
    "8": "Acceptance Site Code",
    "9": "",
    "10": "Transaction Status Indicator Code",
    "11": "Contract Delivery Date Revision Agent Code",
    "12": "Reason for Contract Delivery Date Revision Code",
    "13": "Recommendations Regarding Delayed Deliveries Code",
    "14": "Contract Shipment Advice Code",
    "16": "Cash Discount Stipulation Code",
    "17": "Shipment Acceptance Discrepancy Explanation Code",
    "18": "Insurance Plan Description Characteristics",
    "19": "Contract Close-out Group Code",
    "20": "Payment Type Code",
    "21": "Contract Fund Reporting Transaction Code",
    "22": "Contract Payment Deduction or Collection Code",
    "23": "Obligation Variance Code",
    "24": "Plus or Minus Indicator Code",
    "25": "Reason for Delayed Closing of Contract File Code",
    "26": "Contract Payment Line Item Status Code",
    "27": "Special Reimbursable Provisions Code",
    "28": "Kind of Modification Code",
    "29": "Purchasing Contract Officer (PCO) Instructions Code",
    "30": "Type of Delay Code",
    "32": "Container and Roll-on/Roll-off Number Code",
    "33": "Air Commodity and Special Handling Code",
    "34": "Water Commodity and Special Handling Code",
    "35": "Air Dimension Code",
    "36": "Air Terminal Identifier Code",
    "37": "Water Terminal Identifier Code",
    "38": "Consolidation and Containerization Point Code",
    "39": "Transportation Mode or Method Code",
    "40": "Type Pack Code",
    "41": "Date Shipped or Received Code",
    "42": "Estimated Time of Arrival Code",
    "43": "Military and Civilian Grade Code",
    "44": "Seavan Ownership Code",
    "45": "Ocean Carrier Code",
    "46": "Voyage Document Number Code",
    "47": "Voyage Manifest Reference Code",
    "48": "Vessel Status and Terms of Carriage Code",
    "49": "Vessel Sustaining Code",
    "52": "Billing Advice Code",
    "53": "Billing Status Code",
    "54": "Type of Bill Code",
    "55": "Recipient of Billing Status Code",
    "56": "Sales Price Condition Code",
    "57": "Delivery Source Code",
    "58": "Transportation Bill Code",
    "59": "Stock Fund or Non-stock Fund Code",
    "60": "General Services Administration (GSA) Customer Supply Center Number Code",
    "61": "Information Indicator Code",
    "62": "Communications Routing Identifier Code",
    "63": "Content Indicator Code",
    "66": "Suffix or Limit Code",
    "67": "Type of Assistance Code",
    "69": "Foreign Military Sales Country Code",
    "71": "Service and Agency Code",
    "74": "Demand Code",
    "75": "Suffix Code",
    "78": "Project Code",
    "79": "Priority Designator Code",
    "80": "Advice Code",
    "81": "Status Code",
    "82": "Shipment Hold Code",
    "83": "Supply Condition Code",
    "84": "Management Code",
    "85": "Country and Activity Code",
    "86": "",
    "87": "Subsistence Type of Pack Code",
    "88": "Disposal Authority Code",
    "89": "Cooperative Logistics Program Support Code",
    "90": "Precious Metals Indicator Code",
    "91": "Automated Data Processing Equipment Identification Code",
    "92": "Reason for Disposal Code",
    "93": "Type of Storage Code",
    "94": "Identification Code",
    "95": "Offer and Release Option Code",
    "96": "Shipment Release Code",
    "97": "Ultimate Recipient Code",
    "98": "Reason for Requisitioning Code",
    "99": "Purpose Code",
    "B": "Bank Administration Institute (BAI)",
    "C": "Canadian Inter*EDI",
    "I": "Identifying Characteristics",
    "S": "Society for Worldwide Interbank Financial Telecommunications (SWIFT)",
    "T": "Personal Property and Contents Code",
    "W": "Court Issued Warrant Type Code",
    "A1": "Ownership Code",
    "A2": "Customer Within Country Code",
    "A3": "Delivery Term Code",
    "A4": "Case Designator Number",
    "A5": "Subcase Number",
    "A6": "Freight Forwarder Number",
    "A7": "Record Control Number",
    "A8": "Program Year Code",
    "A9": "Supplemental Data",
    "AA": "Country Code (Finance and Acquisition)",
    "AB": "Defense Priorities and Allocations System Code",
    "AD": "Acquisition Advice Code",
    "AE": "Beneficiary Type",
    "AF": "Class of Pitch",
    "AG": "Grade of Difficulty",
    "AH": "Acquisition Method Suffix Code",
    "AI": "Acquisition Method Code",
    "AJ": "Utilization Code",
    "AK": "Distribution Code",
    "AL": "Special Requirements Code",
    "AP": "",
    "AR": "Arrest Reason",
    "BA": "Vessel Stowage Location Code",
    "BB": "Business Type",
    "BC": "Transportation Holding Delay Code",
    "BD": "Transportation Priority Code",
    "BE": "Value",
    "BF": "International Classification of Diseases Clinical Modification (ICD-9-CM) Diagnosis",
    "BG": "Condition",
    "BH": "Occurrence",
    "BI": "Occurrence Span",
    "BJ": "International Classification of Diseases Clinical Modification (ICD-9-CM) Admitting Diagnosis",
    "BK": "International Classification of Diseases Clinical Modification (ICD-9-CM) Principal Diagnosis",
    "BL": "Application Fee Status Codes",
    "BM": "",
    "BN": "International Classification of Diseases Clinical Modification (ICD-9-CM) External Cause of Injury Code (E-codes)",
    "BO": "Healthcare Common Procedure Coding System",
    "BP": "Healthcare Common Procedure Coding System Principal Procedure",
    "BQ": "International Classification of Diseases Clinical Modification (ICD-9-CM) Other Procedure Codes",
    "BR": "International Classification of Diseases Clinical Modification (ICD-9-CM) Principal Procedure Codes",
    "BS": "Current Procedural Terminology (CPT) Codes",
    "BT": "Accident Description",
    "BU": "Part of Body Affected",
    "C1": "Eye Color Code",
    "C2": "Hair Color Code",
    "C3": "Skin Tone Code",
    "CA": "Type of Inquiry Code",
    "CB": "Billed Office Indicator Code",
    "CC": "Treasury Symbol Code",
    "CD": "Supplementary Accounting Classification Code",
    "CE": "Reference and Station Code",
    "CF": "Major Force Program Code",
    "CG": "Aircraft Mission Design Series Code",
    "CH": "Type of Issue Code",
    "CI": "Criminal Charge",
    "CJ": "Criminal Charge Grade",
    "CS": "Clause Status Type",
    "CV": "Coverage Code List",
    "DK": "Program Originator Code",
    "EA": "Asset Status or Transaction Reporting Code",
    "EB": "Asset Transfer Status Code",
    "EC": "Certification Requirements Code",
    "ED": "Coast Designation Code",
    "EE": "Competitive Characteristics Code",
    "EF": "Correction or Change for Storage Item Records Code",
    "EG": "Excavation Information Code List",
    "EH": "Type Due-In Indicator",
    "EI": "Discrepancy Indicator Code",
    "EJ": "Disposal Condition Code",
    "EL": "Error Classification Code",
    "EM": "Inventory Category Code",
    "EN": "Local Source Code",
    "EQ": "Controlled Inventory Item Code",
    "ER": "Department of Defense Identification Code",
    "ET": "Reject Advice Code",
    "EU": "Request Code",
    "EV": "Review Period Indicator Code",
    "EW": "Small Arms Error Transaction Reject Code",
    "EX": "Small Arms Transaction Code",
    "EY": "Special Program Requirement Status Code",
    "EZ": "Type Inspection Code",
    "FA": "Type of Contractor Code",
    "FB": "Type of Media Code",
    "FC": "Type Physical Inventory or Transaction History Code",
    "FD": "Demilitarization Code",
    "FE": "Shelf Life Code",
    "FF": "Essentiality Code",
    "FG": "Source Maintenance and Recoverability Code",
    "FH": "Type of Location Reconciliation Request",
    "FI": "Applicant Type",
    "FJ": "Antenna Structure Type",
    "FK": "Station Classification",
    "FL": "Radio Frequency Type",
    "FM": "Station Classification Type",
    "FN": "Class of Operation",
    "FO": "Antenna Polarization",
    "FP": "Fund Purpose",
    "FQ": "Radio System Type",
    "FR": "Frequency Band",
    "FS": "Area of Operation",
    "FT": "Application Type",
    "FU": "Authorization Type",
    "FV": "Radio Service Type",
    "FW": "Applicant Classification Type",
    "FX": "Frequency",
    "G1": "Uniform Residential Appraisal Attributes Code",
    "GA": "Action Code",
    "GB": "Medium of Transmission Code",
    "GC": "Management Indicator Code (Petroleum)",
    "GD": "Gain or Loss Indicator Code",
    "GE": "Type Adjustment Code",
    "GF": "Type Identity Change Code",
    "GG": "Transportation Mode Reason Code",
    "GI": "Notification Indicator Code",
    "GJ": "Reject Indicator Code",
    "GK": "Investigation Status Code",
    "HA": "Discrepancy Code",
    "HB": "Discrepancy Advice Code",
    "HC": "Institutional Sector or Level Classification Code",
    "HD": "Discrepancy Status or Disposition Code",
    "IC": "Collision Industry Electronic Commerce Association (CIECA) - Inspection",
    "J0": "Summons Type Code",
    "J1": "Judicial Hearing Type Code",
    "J2": "Judicial Order Type Code",
    "J3": "Judicial Sentence Type Code",
    "J4": "Court Disposition Code",
    "J5": "Court Appearance Type Code",
    "J6": "Court Pleading Type Code",
    "J7": "Defendant Plea Type Code",
    "J8": "Trial Type Code",
    "J9": "Court Case Status Code",
    "JA": "Physical Characteristics Code",
    "JB": "Weight or Fragility Code",
    "JC": "Preservation Material Code",
    "JD": "Quantity per Unit Pack Code",
    "JE": "Preservation Data Code",
    "JF": "Packing Requirement Level A Code",
    "JG": "Packing Requirement Level B Code",
    "JH": "Packing Requirement Level C Code",
    "JI": "Intermediate Container Code",
    "JK": "Intermediate Container Quantity Code",
    "JL": "Special Marking Code",
    "JM": "Type and Cause Code",
    "JN": "Mission Impact Statement Code",
    "JO": "International Standard Designation System for Teeth and Areas of the Oral Cavity",
    "JP": "Universal National Tooth Designation System",
    "KA": "Deficiency Cause",
    "KB": "Discrepancy",
    "KC": "Preventive Measure",
    "KD": "Contractor Alert List Reason",
    "KE": "Quality Alert List Reason",
    "KF": "Contractor Alert List Status",
    "KG": "Nature of Buy",
    "KH": "Type of Procurement",
    "KI": "Representative Buy Indicator",
    "KJ": "Assured Delivery Indicator",
    "KK": "Award Source",
    "KL": "Termination",
    "LA": "Contract",
    "LB": "Contractor Review List Status",
    "LC": "Laboratory Test Condition Code",
    "LN": "Line of business code",
    "LP": "Deficiency Indicator",
    "LQ": "Delinquency Indicator",
    "LR": "Test Results Code",
    "LT": "Laboratory Results Identification Code",
    "LZ": "War Reserve Material Requirement Code",
    "MC": "Manual Class Code",
    "MI": "Minority Indicator",
    "NA": "Plant Clearance Office Code",
    "NB": "Inventory Type Code",
    "NC": "Property Record Status Code",
    "ND": "Control Unit Design Code",
    "NE": "Direct Numerical Control System Code",
    "NF": "Type Numerical Control System Code",
    "NH": "Property Source Code",
    "NJ": "Uniform Freight Classification (UFC) Code",
    "NK": "National Motor Freight Classification (NMFC) Code",
    "NL": "",
    "NP": "Special Category Code",
    "NR": "Excess Material Disposition Code",
    "NS": "Hazardous Material Code",
    "NT": "Type of Cargo Code",
    "OC": "Occupation Code",
    "PC": "Collision Industry Electronic Commerce Association (CIECA) - Profile",
    "QS": "Query Status",
    "RF": "",
    "RR": "",
    "RT": "Request Type",
    "SC": "Source",
    "SD": "International Classification of Diseases Clinical Modification (ICD-9-CM) Secondary Diagnosis",
    "SM": "",
    "SO": "Solicitation Cancellation Reason",
    "SS": "System Status",
    "TB": "Association for Financial Professionals Service Code and Bank Service Code",
    "TC": "Treatment Codes",
    "TD": "International Classification of Diseases Clinical Modification (ICD-9-CM) Tertiary Diagnosis",
    "TE": "Association for Financial Professionals Service Code",
    "UP": "",
    "ZZ": "Mutually Defined",
    "DPE": "Association of American Railroads Deprescription Exception List",
    "DPL": "Association of American Railroads Deprescription Distribution List",
    "HRC": "Hazardous Response Codes",
    "HZR": "Association of American Railroads Standard Transportation Commodity Code Description Qualifier",
    "NDC": "National Drug Code (NDC)",
    "PLC": "Petroleum Land Category",
    "PLS": "Petroleum Lease Status",
    "PPD": "Petroleum Product Disposition",
    "PPP": "Petroleum Product Point-of-Sale",
    "PPS": "Petroleum Product Selling Arrangement",
    "PPV": "Petroleum Product Value Adjustment",
    "PRA": "Petroleum Royalty Adjustment",
    "PRC": "Petroleum Royalty Calculation Method",
    "PRR": "Petroleum Regulatory Report",
    "PRT": "Petroleum Royalty Transaction",
    "PWS": "Petroleum Well Classification Status",
}

export function CodeListQualifierParser(value: string) {
    return code_list_qualifier[value] ?? value;
}
