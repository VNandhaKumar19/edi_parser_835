import { Amount } from "../segments/amount";
import { ClaimSegment } from "../segments/claim";
import { DateSegment } from "../segments/date";
import { ProviderLevelBalance } from "../segments/provider_level_balance";
import { ProviderSummaryInformation } from "../segments/provider_summary_information";
import { Reference } from "../segments/reference";
import { Remark } from "../segments/remark";
import { Service } from "../segments/service";
import { ServiceAdjustment } from "../segments/service_adjustment";
import { findIdentifier } from "../utilities/split_segment";

export class ServiceLoop {
    public static initiatingIdentifier: string = Service.identification;
    public static terminatingIdentifiers: string[] = [
        Service.identification,
        ClaimSegment.identification,
        'SE'
    ];

    public service: Service | null = null;
    public dates: DateSegment[] = [];
    public references: Reference[] = [];
    public remarks: Remark[] = [];
    public amount: Amount | null = null;
    public adjustments: ServiceAdjustment[] = [];
    public providerSummaryInformation: ProviderSummaryInformation | null = null;
    public providerLevelBalance: ProviderLevelBalance | null = null;

    constructor(
        service: Service | null = null,
        dates: DateSegment[] | null = [],
        references: Reference[] | null = [],
        remarks: Remark[] | null = [],
        amount: Amount | null = null,
        adjustments: ServiceAdjustment[] | null = [],
        providerSummaryInformation: ProviderSummaryInformation | null = null,
        providerLevelBalance: ProviderLevelBalance | null = null,
    ) {
        this.service = service;
        this.dates = dates || [];
        this.references = references || [];
        this.remarks = remarks || [];
        this.amount = amount;
        this.adjustments = adjustments || [];
        this.providerSummaryInformation = providerSummaryInformation;
        this.providerLevelBalance = providerLevelBalance;
    }

    public get allowedAmount(): string | null {
        if (this.amount && this.amount?.qualifier === 'allowed - actual') {
            return this.amount?.amount;
        }
        return null;
    }

    public get serviceDate(): DateSegment | null {
        return this.getDateByQualifier('service');
    }

    public get servicePeriodStart(): DateSegment | null {
        return this.getDateByQualifier('service period start') || this.serviceDate;
    }

    public get servicePeriodEnd(): DateSegment | null {
        return this.getDateByQualifier('service period end') || this.serviceDate;
    }

    private getDateByQualifier(qualifier: string): DateSegment | null {
        const dates = this.dates?.filter(d => d?.qualifier === qualifier);
        return dates?.length > 0 ? dates[0] : null;
    }

    /**
     * This TypeScript function builds a ServiceLoop object by parsing segments and creating
     * corresponding objects based on identifiers found in the segments.
     * @param {string} segment - The `segment` parameter in the `build` method is a string representing
     * a specific segment of data that needs to be processed.
     * @param {string[]} segments - The `segments` parameter in the `build` method is an array of
     * strings that represent different segments of data. The method processes each segment to create
     * instances of various classes based on the identifier found in the segment. The method continues
     * processing segments until it encounters a terminating identifier or until there are no more
     * @returns The `build` method returns an array containing three elements:
     * 1. An instance of `ServiceLoop` class (`service`)
     * 2. An array of remaining segments after processing (`segments`)
     * 3. The last processed segment (`segment`)
     */
    public static build(segment: string, segments: string[]): [ServiceLoop, string[] | null, string | null] {
        const service = new ServiceLoop();
        service.service = new Service(segment);
        while (segments?.length > 0) {
            const segment = segments?.shift() as string;
            const identifier = findIdentifier(segment);

            if (identifier === DateSegment.identification) {
                const date = new DateSegment(segment);
                service.dates.push(date);
            } else if (identifier === Amount.identification) {
                service.amount = new Amount(segment);
            } else if (identifier === Remark.identification) {
                const remark = new Remark(segment);
                service.remarks.push(remark);
            } else if (identifier === Reference.identification) {
                const reference = new Reference(segment);
                service.references.push(reference);
            } else if (identifier === ServiceAdjustment.identification) {
                const adjustment = new ServiceAdjustment(segment);
                service.adjustments.push(adjustment);
            } else if (identifier === ProviderSummaryInformation.identification) {
                service.providerSummaryInformation = new ProviderSummaryInformation(segment);
            } else if (identifier === ProviderLevelBalance.identification) {
                service.providerLevelBalance = new ProviderLevelBalance(segment);
            } else if (ServiceLoop.terminatingIdentifiers?.includes(identifier)) {
                return [service, [segment, ...segments], segment];
            } else {
                const message = `Identifier: ${identifier} not handled in service loop and segment value is ${segment}`;
                console.warn(message);
            }
        }

        return [service, null, null];
    }
}
