import { Address } from "../segments/address";
import { ClaimSegment } from "../segments/claim";
import { LocationSegment } from "../segments/location";
import { OrganizationSegment } from "../segments/organization";
import { PayerContactInformation } from "../segments/payer_contact_information";
import { ProviderSummaryInformation } from "../segments/provider_summary_information";
import { Reference } from "../segments/reference";
import { findIdentifier } from "../utilities/split_segment";

export class OrganizationLoop {

    public static initiatingIdentifier: string = OrganizationSegment.identification;
    public static terminatingIdentifiers: string[] = [
        ClaimSegment.identification,
        OrganizationSegment.identification,
        'SE'
    ];

    public organization: OrganizationSegment | null = null;
    public location: LocationSegment | null = null;
    public address: Address | null = null;
    public reference: Reference | null = null;
    public providerSummaryInformation: ProviderSummaryInformation | null = null;
    public payerContactInformation: PayerContactInformation[] = [];

    constructor(
        organization: OrganizationSegment | null = null,
        location: LocationSegment | null = null,
        address: Address | null = null,
        providerSummaryInformation: ProviderSummaryInformation | null = null,
        payerContactInformation: PayerContactInformation[] = []
    ) {
        this.organization = organization;
        this.location = location;
        this.address = address;
        this.providerSummaryInformation = providerSummaryInformation;
        this.payerContactInformation = payerContactInformation;
    }

    /**
     * The function `build` constructs an `OrganizationLoop` object by parsing segments and assigning
     * specific properties based on identifiers found in the segments.
     * @param {string} currentSegment - The `currentSegment` parameter in the `build` function is a
     * string that represents the current segment being processed within the organization loop.
     * @param {string[]} segments - The `segments` parameter in the `build` function is an array of
     * strings that represent different segments of data. The function processes each segment to build
     * an `OrganizationLoop` object by identifying specific types of segments and creating
     * corresponding objects for them within the organization loop.
     * @returns The `build` function returns an array containing three elements:
     * 1. An `OrganizationLoop` object representing the organization being built.
     * 2. An array of remaining segments after processing, or `null` if there are no more segments.
     * 3. The last processed segment, or `null` if there are no more segments.
     */
    public static build(currentSegment: string, segments: string[]): [OrganizationLoop, string[] | null, string | null] {
        const organization = new OrganizationLoop();
        organization.organization = new OrganizationSegment(currentSegment);

        while (segments?.length > 0) {
            const segment = segments?.shift() as string;
            const identifier = findIdentifier(segment);

            if (identifier === Address.identification) {
                organization.address = new Address(segment);
            } else if (identifier === LocationSegment.identification) {
                organization.location = new LocationSegment(segment);
            } else if (OrganizationLoop.terminatingIdentifiers?.includes(identifier)) {
                return [organization, segments, segment];
            } else if (identifier === Reference.identification) {
                organization.reference = new Reference(segment);
            } else if (identifier === ProviderSummaryInformation.identification) {
                organization.providerSummaryInformation = new ProviderSummaryInformation(segment);
            } else if (identifier === PayerContactInformation.identification) {
                organization.payerContactInformation.push(new PayerContactInformation(segment));
            } else {
                const message = `Identifier: ${identifier} not handled in organization loop and segment value is ${segment}`;
                console.warn(message);
            }
        }

        return [organization, null, null];
    }

    public toString(): string {
        return Object.entries(this)
            ?.map(([key, value]) => `${key}: ${value}`)
            ?.join("\n");
    }
}