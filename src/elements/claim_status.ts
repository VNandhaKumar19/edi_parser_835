enum PayerClassification {
    PRIMARY = "primary",
    SECONDARY = "secondary",
    TERTIARY = "tertiary",
    UNSPECIFIED = "unspecified",
    UNKNOWN = "unknown"
}

interface Status {
    code: string;
    description: string;
    payer_classification: PayerClassification;
}

const Registry: Status[] = [
    { code: '1', description: 'processed as primary', payer_classification: PayerClassification.PRIMARY },
    { code: '2', description: 'processed as secondary', payer_classification: PayerClassification.SECONDARY },
    { code: '3', description: 'processed as tertiary', payer_classification: PayerClassification.TERTIARY },
    { code: '4', description: 'denial', payer_classification: PayerClassification.UNSPECIFIED },
    { code: '19', description: 'processed as primary, forwarded to additional payer(s)', payer_classification: PayerClassification.PRIMARY },
    { code: '20', description: 'processed as secondary, forwarded to additional payer(s)', payer_classification: PayerClassification.SECONDARY },
    { code: '21', description: 'processed as tertiary, forwarded to additional payer(s)', payer_classification: PayerClassification.TERTIARY },
    { code: '22', description: 'reversal of previous payment', payer_classification: PayerClassification.UNSPECIFIED }
];

function lookupStatus(code: string): Status {
    const status = Registry.find(s => s.code === code);
    if (!status) {
        console.warn(`ClaimStatus: Code ${code} does not match a status in the edi-835-parser claim status registry.`);
        return { code: 'code', description: 'uncategorized', payer_classification: PayerClassification.UNKNOWN };
    }
    return status;
}

export class ClaimStatus {
    parser(value: string): Status {
        return lookupStatus(value);
    }
}