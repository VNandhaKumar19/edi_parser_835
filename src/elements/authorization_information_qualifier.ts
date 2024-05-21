export class AuthorizationInformationQualifier {
    parser(value: string) {
        if (value == '00')
            value = ''
        return value
    }
}
