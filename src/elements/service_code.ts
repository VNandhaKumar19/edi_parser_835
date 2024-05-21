export function ServiceCodeParser(value: string): string {
    const splitValue: string[] = value.split("*");
    const code: string = splitValue[1] || "";
    return code;
}
