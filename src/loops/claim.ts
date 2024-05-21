import { Amount } from "../segments/amount";
import { ClaimSegment } from "../segments/claim";
import { ClaimAdjustment } from "../segments/claim_adjustment";
import { CodeListQualifier } from "../segments/code_list_qualifier";
import { DateSegment } from "../segments/date";
import { Entity } from "../segments/entity";
import { InpatientAdjudicationInformation } from "../segments/inpatient_adjudication_information";
import { OutpatientAdjudicationInformation } from "../segments/outpatient_adjudication_information";
import { PayerContactInformation } from "../segments/payer_contact_information";
import { ProviderLevelBalance } from "../segments/provider_level_balance";
import { Reference } from "../segments/reference";
import { TransactionSetTrailer } from "../segments/transaction_set_trailer";
import { findIdentifier } from "../utilities/split_segment";
import { ServiceLoop } from "./service";

export class ClaimLoop {
    public static initiatingIdentifier: string = 'CLP';
    public static terminatingIdentifiers: string[] = [ClaimLoop.initiatingIdentifier, 'SE', 'ST'];
    public claim: ClaimSegment | null = null;
    public entities: Entity[] = [];
    public services: ServiceLoop[] = [];
    public references: Reference[] = [];
    public dates: DateSegment[] = [];
    public amount: Amount | null = null;
    public adjustment: ClaimAdjustment | null = null;
    public providerLevelBalance: ProviderLevelBalance | null = null;
    public codeListQualifier: CodeListQualifier | null = null;
    public inpatientAdjudicationInformation: InpatientAdjudicationInformation | null = null;
    public outpatientAdjudicationInformation: OutpatientAdjudicationInformation | null = null;
    public payerContactInformation: PayerContactInformation | null = null;
    transactionSetTrailer: TransactionSetTrailer | null = null;

    constructor(
        claim: ClaimSegment | null = null,
        entities: Entity[] | null = [],
        services: ServiceLoop[] | null = [],
        references: Reference[] | null = [],
        dates: DateSegment[] | null = [],
        amount: Amount | null = null,
        providerLevelBalance: ProviderLevelBalance | null = null,
        codeListQualifier: CodeListQualifier | null = null,
        inpatientAdjudicationInformation: InpatientAdjudicationInformation | null = null,
        outpatientAdjudicationInformation: OutpatientAdjudicationInformation | null = null,
        payerContactInformation: PayerContactInformation | null = null,
        transactionSetTrailer: TransactionSetTrailer | null = null,

    ) {
        this.claim = claim;
        this.entities = entities || [];
        this.services = services || [];
        this.references = references || [];
        this.dates = dates || [];
        this.amount = amount;
        this.providerLevelBalance = providerLevelBalance;
        this.codeListQualifier = codeListQualifier;
        this.inpatientAdjudicationInformation = inpatientAdjudicationInformation;
        this.outpatientAdjudicationInformation = outpatientAdjudicationInformation;
        this.payerContactInformation = payerContactInformation;
        this.transactionSetTrailer = transactionSetTrailer;
    }

    public get renderingProvider(): Entity | null {
        const renderingProvider = this.entities?.find(e => e?.entity === 'rendering provider');
        return renderingProvider || null;
    }

    public get claimStatementPeriodStart(): DateSegment | null {
        const statementPeriodStart = this.dates?.find(d => d?.qualifier === 'claim statement period start');
        return statementPeriodStart || null;
    }

    public get claimStatementPeriodEnd(): DateSegment | null {
        const statementPeriodEnd = this.dates?.find(d => d?.qualifier === 'claim statement period end');
        return statementPeriodEnd || null;
    }

    public get patient(): Entity {
        const patient = this.entities?.find(e => e?.entity === 'patient');
        if (!patient) {
            throw new Error('Patient entity not found.');
        }
        return patient;
    }

    /**
     * The function `build` processes segments to construct a ClaimLoop object by parsing different
     * types of identifiers and creating corresponding objects.
     * @param {string} segment - The `segment` parameter in the `build` method is a string representing
     * a segment of data. This segment will be used to create a new `ClaimSegment` object and set it as
     * the claim for a `ClaimLoop` object.
     * @param {string[]} segments - Segments is an array of strings that contains the segments to be
     * processed in the build function. Each element in the array represents a segment of data that
     * needs to be parsed and processed within the ClaimLoop.
     * @returns The `build` method returns an array containing three elements:
     * 1. The `ClaimLoop` object `claim` with populated data based on the segments provided.
     * 2. An array of remaining segments after processing, or `null` if there are no remaining
     * segments.
     * 3. The next segment to be processed, or `null` if there are no more segments to process.
     */
    public static build(segment: string, segments: string[]): [ClaimLoop, string[] | null, string | null] {
        const claim = new ClaimLoop();
        claim.claim = new ClaimSegment(segment);

        let nextSegment: string | null = segments?.shift() ?? '';
        while (nextSegment) {
            try {
                const identifier = findIdentifier(nextSegment);
                if (identifier === ServiceLoop.initiatingIdentifier) {
                    const [service, remainingSegments, currentSegment] = ServiceLoop.build(nextSegment, segments);
                    claim.services?.push(service);
                    segments = remainingSegments || [];
                    nextSegment = currentSegment;
                } else if (identifier === Entity.identification) {
                    const entity = new Entity(nextSegment);
                    claim.entities?.push(entity);
                } else if (identifier === Reference.identification) {
                    const reference = new Reference(nextSegment);
                    claim.references?.push(reference);
                } else if (identifier === DateSegment.identification) {
                    const date = new DateSegment(nextSegment);
                    claim.dates?.push(date);
                } else if (identifier === Amount.identification) {
                    claim.amount = new Amount(nextSegment);
                } else if (identifier === ClaimAdjustment.identification) {
                    claim.adjustment = new ClaimAdjustment(nextSegment);
                } else if (identifier === ProviderLevelBalance.identification) {
                    claim.providerLevelBalance = new ProviderLevelBalance(nextSegment);
                } else if (identifier === CodeListQualifier.identification) {
                    claim.codeListQualifier = new CodeListQualifier(nextSegment);
                } else if (identifier === InpatientAdjudicationInformation.identification) {
                    claim.inpatientAdjudicationInformation = new InpatientAdjudicationInformation(nextSegment);
                } else if (identifier === OutpatientAdjudicationInformation.identification) {
                    claim.outpatientAdjudicationInformation = new OutpatientAdjudicationInformation(nextSegment);
                } else if (identifier === PayerContactInformation.identification) {
                    claim.payerContactInformation = new PayerContactInformation(segment);
                } else if (ClaimLoop.terminatingIdentifiers?.includes(identifier)) {
                    if (identifier === TransactionSetTrailer.identification) {
                        claim.transactionSetTrailer = new TransactionSetTrailer(nextSegment);
                    }
                    return [claim, segments, nextSegment];
                } else {
                    const message = `Identifier: ${identifier} not handled in claim loop and segment value is ${nextSegment}`;
                    console.warn(message);
                }
                nextSegment = segments?.shift() ?? '';
            } catch (error) {
                console.error(error);
            }
        }
        return [claim, null, null];
    }
}
