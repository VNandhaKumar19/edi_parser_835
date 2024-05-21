import { ClaimLoop } from "../loops/claim";
import { OrganizationLoop } from "../loops/organization";
import { ServiceLoop } from "../loops/service";
import { FinancialInformation } from "../segments/financial_information";
import { Interchange } from "../segments/interchange";
import { TraceInformation } from "../segments/trace_information";
import { readFileSync } from 'fs';
import { findIdentifier } from "../utilities/split_segment";
import { stringObject } from "../utilities/model";
import { DateSegment } from "../segments/date";
import { Reference } from "../segments/reference";
import { GroupSetTrailer } from "../segments/group_set_trailer";
import { FunctionGroupHeader } from "../segments/function_group_header";

export class TransactionSet {
    public static initiatingIdentifier: string = 'ST';
    interchange: Interchange | null = null;
    financialInformation: FinancialInformation | null = null;
    claims: ClaimLoop[] = [];
    organizations: OrganizationLoop[] = [];
    traceInformation: TraceInformation | null = null;
    dateTimeQualifier: DateSegment | null = null;
    reference: Reference | null = null;
    groupSetTrailer: GroupSetTrailer | null = null;
    functionGroupHeader: FunctionGroupHeader | null = null;
    nextSet?: string[] = [];

    constructor(
        interchange: Interchange,
        financialInformation: FinancialInformation,
        claims: ClaimLoop[],
        organizations: OrganizationLoop[],
        traceInformation: TraceInformation,
        dateTimeQualifier: DateSegment | null,
        reference: Reference | null,
        groupSetTrailer: GroupSetTrailer | null,
        functionGroupHeader: FunctionGroupHeader | null,
        nextSet: string[]
    ) {
        this.interchange = interchange;
        this.financialInformation = financialInformation;
        this.claims = claims;
        this.organizations = organizations;
        this.traceInformation = traceInformation;
        this.dateTimeQualifier = dateTimeQualifier;
        this.reference = reference;
        this.groupSetTrailer = groupSetTrailer;
        this.functionGroupHeader = functionGroupHeader;
        this.nextSet = nextSet.length ? nextSet : [];
    }

    /**
     * The function `buildAttribute` processes different types of segments in a transaction set and
     * returns corresponding attribute objects.
     * @param {string | null} segment - The `segment` parameter in the `buildAttribute` function is a
     * string or null value representing a segment of data. It is used to identify the type of data
     * contained in the segment.
     * @param {string[]} segments - The `segments` parameter in the `buildAttribute` function is an
     * array of strings. This function processes each segment in the array to build different types of
     * attributes based on the segment's identifier. If a segment is not provided, it will shift the
     * first segment from the array to process. The function
     * @returns The `buildAttribute` function returns a `BuildAttributeResponse` object, which contains
     * information about the parsed segment and any related objects created during the parsing process.
     * The function handles different types of identifiers found in the segment and creates
     * corresponding objects such as `Interchange`, `FinancialInformation`, `OrganizationLoop`,
     * `ClaimLoop`, `TraceInformation`, `DateSegment`, `Reference`, `GroupSetTr
     */
    static buildAttribute(segment: string | null, segments: string[]): BuildAttributeResponse {
        if (!segment) {
            segment = segments?.shift() || null;
        }

        if (segment) {
            const identifier = findIdentifier(segment);

            if (identifier === Interchange.identification) {
                const interchange = new Interchange(segment);
                return new BuildAttributeResponse('interchange', interchange, null, segments);
            } else if (identifier === FinancialInformation.identification) {
                const financialInformation = new FinancialInformation(segment);
                return new BuildAttributeResponse('financial information', financialInformation, null, segments);
            } else if (identifier === OrganizationLoop.initiatingIdentifier) {
                const [organization, newSegments, newSegment] = OrganizationLoop.build(segment, segments);
                return new BuildAttributeResponse('organization', organization, newSegment, newSegments);
            } else if (identifier === ClaimLoop.initiatingIdentifier) {
                const [claim, newSegments, newSegment] = ClaimLoop.build(segment, segments);
                return new BuildAttributeResponse('claim', claim, newSegment, newSegments);
            } else if (identifier === TraceInformation.identification) {
                const transactionInformation = new TraceInformation(segment);
                return new BuildAttributeResponse('traceInformation', transactionInformation, null, segments);
            } else if (identifier === DateSegment.identification) {
                const dateTimeQualifier = new DateSegment(segment);
                return new BuildAttributeResponse('dateTimeQualifier', dateTimeQualifier, null, segments);
            } else if (identifier === Reference.identification) {
                const reference = new Reference(segment);
                return new BuildAttributeResponse('reference', reference, null, segments);
            } else if (identifier === GroupSetTrailer.identification) {
                const groupSetTrailer = new GroupSetTrailer(segment);
                return new BuildAttributeResponse('groupSetTrailer', groupSetTrailer, null, segments);
            } else if (identifier === FunctionGroupHeader.identification) {
                const functionGroupHeader = new FunctionGroupHeader(segment);
                return new BuildAttributeResponse('functionGroupHeader', functionGroupHeader, null, segments);
            } else if (identifier === TransactionSet.initiatingIdentifier) {
                return new BuildAttributeResponse(null, null, null, segments);
            } else {
                console.log(`Identifier: ${identifier} not handled in transaction set and value is ${segment}`);
            }
        }
        return new BuildAttributeResponse("", null, null, segments);
    }

    /**
     * The function `serializeService` takes in financial information, payer, claim, and service
     * objects, and returns a string object with specific properties extracted from these objects.
     * @param {FinancialInformation} financialInformation - The `serializeService` function takes in
     * several parameters to serialize financial and service information into a string object. Here's a
     * breakdown of the parameters:
     * @param {OrganizationLoop} payer - The `payer` parameter in the `serializeService` method
     * represents an organization that is responsible for paying for the service being serialized. It
     * is part of the input data for the serialization process.
     * @param {ClaimLoop} claim - The `claim` parameter in the `serializeService` method represents a
     * ClaimLoop object. It contains information related to a claim, such as claim statement period
     * start and end dates, claim marker, patient name, rendering provider, and claim status.
     * @param {ServiceLoop} service - The `serializeService` function takes in four parameters:
     * `financialInformation`, `payer`, `claim`, and `service`.
     * @returns The `serializeService` function is returning an object with various properties
     * extracted from the `financialInformation`, `payer`, `claim`, and `service` objects. The
     * properties being returned include `marker`, `patient`, `code`, `modifier`, `qualifier`,
     * `allowedUnits`, `billedUnits`, `transactionDate`, `chargeAmount`, `allowedAmount`, `paidAmount`,
     * `payer
     */
    static serializeService(
        financialInformation: FinancialInformation,
        payer: OrganizationLoop,
        claim: ClaimLoop,
        service: ServiceLoop
    ): stringObject<any> {
        let startDate = null;
        if (service?.servicePeriodStart) {
            startDate = service?.servicePeriodStart?.date;
        } else if (claim?.claimStatementPeriodStart) {
            startDate = claim?.claimStatementPeriodStart?.date;
        }

        let endDate = null;
        if (service?.servicePeriodEnd) {
            endDate = service?.servicePeriodEnd?.date;
        } else if (claim?.claimStatementPeriodEnd) {
            endDate = claim?.claimStatementPeriodEnd?.date;
        }

        return {
            marker: claim?.claim?.marker,
            patient: claim?.patient?.name,
            code: service?.service?.code,
            modifier: service?.service?.modifier1,
            qualifier: service?.service?.qualifier,
            allowedUnits: service?.service?.allowedUnits,
            billedUnits: service?.service?.billedUnits,
            transactionDate: financialInformation?.transactionDate,
            chargeAmount: service?.service?.chargeAmount,
            allowedAmount: service?.allowedAmount,
            paidAmount: service?.service?.paidAmount,
            payer: payer?.organization?.name,
            startDate,
            endDate,
            renderingProvider: claim?.renderingProvider ? claim?.renderingProvider?.name : null,
            // payerClassification: claim?.claim?.status?.payerClassification?.toString()
        };
    }

    /**
     * The function `buildFromFile` reads a file, splits it into segments, trims each segment, and then
     * builds a `TransactionSet` from the segments.
     * @param {string} filePath - The `filePath` parameter is a string that represents the path to the
     * file from which the transaction data will be read.
     * @returns The `buildFromFile` function is returning a `TransactionSet` object that is built using
     * the segments extracted from a file specified by the `filePath`. The function reads the file
     * synchronously, splits the content into segments based on the '~' delimiter, trims each segment,
     * and then builds a `TransactionSet` object using these segments with the `build` method.
     */
    static buildFromFile(filePath: string): TransactionSet {
        const file = readFileSync(filePath, 'utf-8');
        let segments = file?.split('~')?.map((segment: string) => segment?.trim());
        return TransactionSet.build(segments, true)
    }

    /**
     * This TypeScript function builds a TransactionSet object by parsing segments and assigning values
     * to various properties based on the segment key.
     * @param {string[]} segments - The `segments` parameter in the `build` function is an array of
     * strings representing different segments of a transaction set. Each segment contains specific
     * information related to the transaction.
     * @param {boolean} [bool=false] - The `bool` parameter in the `build` function is a boolean
     * parameter with a default value of `false`. It is used to determine whether a specific condition
     * is met during the processing of segments. If `bool` is `true`, it triggers a specific behavior
     * in the function.
     * @returns The `build` function returns a `TransactionSet` object.
     */
    static build(segments: string[], bool: boolean = false): TransactionSet {
        let interchange: Interchange | null = null;
        let financialInformation: FinancialInformation | null = null;
        const claims: ClaimLoop[] = [];
        const organizations: OrganizationLoop[] = [];
        let traceInformation: TraceInformation | null = null;
        let dateTimeQualifier: DateSegment | null = null;
        let reference: Reference | null = null;
        let groupSetTrailer: GroupSetTrailer | null = null;
        let functionGroupHeader: FunctionGroupHeader | null = null;

        let segment: string | null = null;

        while (true) {
            const response = TransactionSet.buildAttribute(segment, segments);
            segment = response?.segment;

            segments = response?.segments ?? [];

            if (!segments?.length) {
                break;
            } else if (response.key === 'interchange') {
                interchange = response.value;
            } else if (response.key === 'financial information') {
                financialInformation = response.value;
            } else if (response.key === 'organization') {
                organizations.push(response.value);
            } else if (response.key === 'claim') {
                claims.push(response.value);
            } else if (response.key === 'traceInformation') {
                traceInformation = response.value;
            } else if (response.key === 'dateTimeQualifier') {
                dateTimeQualifier = response.value;
            } else if (response.key === 'reference') {
                reference = response.value;
            } else if (response.key === 'groupSetTrailer') {
                groupSetTrailer = response.value;
            } else if (response.key === 'functionGroupHeader') {
                functionGroupHeader = response.value;
            } else if (response.key === null && !bool) {
                return new TransactionSet(
                    interchange!,
                    financialInformation!,
                    claims,
                    organizations,
                    traceInformation!,
                    dateTimeQualifier!,
                    reference!,
                    groupSetTrailer!,
                    functionGroupHeader!,
                    segments
                );
            } else if (response.key === null && bool) {
                bool = false
            }
        }

        return new TransactionSet(
            interchange!,
            financialInformation!,
            claims,
            organizations,
            traceInformation!,
            dateTimeQualifier!,
            reference!,
            groupSetTrailer!,
            functionGroupHeader!,
            segments
        );
    }
}

class BuildAttributeResponse {
    constructor(public key: string | null, public value: any | null, public segment: string | null, public segments: string[] | null) { }
}
