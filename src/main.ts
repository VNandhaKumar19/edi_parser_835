import * as fs from "fs";
import * as path from "path";
import { TransactionSets } from './transactionSets/transactionSets';
import { TransactionSet } from "./transactionSets/transactionSet";

/**
 * The function `_835_parser_from_file` reads EDI 835 transaction sets from a file or directory and
 * constructs TransactionSet objects.
 * @param {string} filePath - The `filePath` parameter is a string that represents the path to a file
 * or directory containing EDI 835 transaction sets that need to be parsed. The function
 * `_835_parser_from_file` reads the file(s) at the specified path, processes the EDI 835 data, and
 * returns a collection
 * @returns The function `_835_parser_from_file` is returning an instance of `TransactionSets` class,
 * which contains an array of `TransactionSet` objects parsed from the provided file path(s).
 */
export function _835_parser_from_file(filePath: string): TransactionSets {
    if (filePath[0] === '~') {
        filePath = filePath.replace('~', process.env.HOME || process.env.USERPROFILE || '');
    }

    const transactionSets: TransactionSet[] = [];
    if (fs.existsSync(filePath)) {
        if (fs.lstatSync(filePath).isDirectory()) {
            const files = findEdi835Files(filePath);
            for (const file of files) {
                const resolvedFilePath = path.join(filePath, file);
                try {
                    const transactionSet = TransactionSet.buildFromFile(resolvedFilePath);
                    const segments = transactionSet.nextSet;
                    delete transactionSet.nextSet;
                    transactionSets.push(transactionSet);
                    if (segments?.length) {
                        const sets = createTransactionSetOnRemaining(segments, filePath);
                        transactionSets.push(...sets);
                    }
                } catch (error) {
                    console.warn(`Failed to build a transaction set from ${resolvedFilePath} with error: ${error}`);
                }
            }
        } else {
            if(filePath.endsWith('.txt') || filePath.endsWith('.835') || filePath.endsWith('.RMT')) {
                const transactionSet = TransactionSet.buildFromFile(filePath);
                const segments = transactionSet.nextSet;
                delete transactionSet.nextSet;
                transactionSets.push(transactionSet);
                if (segments?.length) {
                    const sets = createTransactionSetOnRemaining(segments, filePath);
                    transactionSets.push(...sets);
                }
            }
        }
    } else {
        console.warn(`The provided path "${filePath}" does not exist.`);
    }

    return new TransactionSets(transactionSets);
}

/**
 * The function `_835_parser` parses X12 transaction sets from a string or an array of strings and
 * creates TransactionSet objects.
 * @param {string | string[]} x12 - The `x12` parameter in the `_835_parser` function is expected to be
 * a string or an array of strings representing X12 transaction sets.
 * @returns an instance of `TransactionSets` class, which contains an array of `TransactionSet` objects
 * parsed from the input X12 data.
 */
export function _835_parser(x12: string | string[]): TransactionSets {

    const transactionSets: TransactionSet[] = [];
    if (x12.length) {
        if (Array.isArray(x12)) {
            for (const file of x12) {
                try {
                    const transactionSet = TransactionSet.build(file?.split('~')?.map((segment: string) => segment?.trim()), true);
                    const segments = transactionSet.nextSet;
                    delete transactionSet.nextSet;
                    transactionSets.push(transactionSet);
                    if (segments?.length) {
                        const sets = createTransactionSetOnRemaining(segments);
                        transactionSets.push(...sets);
                    }
                } catch (error) {
                    console.warn(`Failed to build a transaction set with error: ${error}`);
                }
            }
        } else {
            const transactionSet = TransactionSet.build(x12?.split('~')?.map((segment: string) => segment?.trim()), true);
            const segments = transactionSet.nextSet;
            delete transactionSet.nextSet;
            transactionSets.push(transactionSet);
            if (segments?.length) {
                const sets = createTransactionSetOnRemaining(segments);
                transactionSets.push(...sets);
            }
        }
    } else {
        console.warn(`The provided string is empty.`);
    }

    return new TransactionSets(transactionSets);
}

/**
 * The function `createTransactionSetOnRemaining` recursively builds TransactionSet objects from
 * segments and returns an array of TransactionSet objects.
 * @param {string[]} segments - An array of strings representing segments of a transaction.
 * @returns The `createTransactionSetOnRemaining` function returns an array of `TransactionSet`
 * objects.
 */
function createTransactionSetOnRemaining(segments: string[], fileName: string = ''): TransactionSet[] {
    const transactionSets: TransactionSet[] = []
    const transactionSet: TransactionSet = TransactionSet.build(segments, true)
    const segmentsArr = transactionSet.nextSet;
    delete transactionSet.nextSet;
    transactionSets.push(transactionSet)
    if (segmentsArr?.length) {
        transactionSets.push(...createTransactionSetOnRemaining(segmentsArr, fileName));
    }
    return transactionSets;
}

/**
 * The function `findEdi835Files` takes a directory path as input and returns an array of file names
 * that end with either '.txt' or '.835'.
 * @param {string} dirPath - The `dirPath` parameter in the `findEdi835Files` function is a string that
 * represents the directory path where the function will search for EDI 835 files.
 * @returns An array of file names with extensions '.txt' or '.835' from the specified directory path
 * is being returned.
 */
function findEdi835Files(dirPath: string): string[] {
    const files: string[] = [];
    for (const file of fs.readdirSync(dirPath)) {
        if (file.endsWith('.txt') || file.endsWith('.835') || file.endsWith('.RMT')) {
            files.push(file);
        }
    }
    return files;
}

function main() {
    const r = _835_parser(val)
    console.log(JSON.stringify(r))
}

const val = `
ISA*00*          *00*          *ZZ*ZIRMED         *ZZ*200214C9802420 *200622*0839*U*00401*000004111*0*P*:~
GS*HP*1470246511*200214C9802420*20200622*0839*4111*X*004010X091A1~
ST*835*0001~
BPR*H*0*C*NON************20200619~
TRN*1*202006200306135606152*1470246511*01~
REF*EV*581651222~
DTM*405*20200619~
N1*PR*MUTUAL OF OMAHA COMPANIES CLAIMS DEPARTMENT~
N3*3300 MUTUAL OF OMAHA PLZ~
N4*OMAHA*NE*681751004~
REF*EO*71412~
N1*PE*RAJESH K BINDAL MD PA*XX*1710917174~
N3*PO BOX 67~
N4*HOUSTON*TX*77001~
REF*TJ*320047747~
LX*1~
CLP*000400031885*22*-27531*-42.58**15*584550181000-030/20180908TXBA9*21*1~
NM1*QC*1*HARBIN*ANN****MI*75096392M~
NM1*82*1*NGUYEN*ALISSA***NP*XX*1275993511~
REF*IG*75096392M~
DTM*232*20180727~
DTM*050*20180908~
SVC*HC:63047:80*-11297*0~
DTM*472*20180727~
CAS*OA*23*-11297~
REF*6R*CPK4S8WSRZ4M~
SVC*HC:63267:80*-14046*-36.84~
DTM*472*20180727~
CAS*OA*23*-14009.16~
REF*6R*CPK429PMUYGJ~
SVC*HC:63048:80*-2188*-5.74~
DTM*472*20180727~
CAS*OA*23*-2182.26~
REF*6R*CPK404HLH17U~
CLP*000400031885*2*27531*42.58**15*584550181000-051/20180908TXBA9*21*1~
NM1*QC*1*HARBIN*ANN****MI*75096392M~
NM1*82*1*NGUYEN*ALISSA***NP*XX*1275993511~
REF*IG*75096392M~
REF*F8*584550181000-030/20180908TXBA9193~
DTM*232*20180727~
DTM*050*20180908~
SVC*HC:63047:80*11297*0~
DTM*472*20180727~
CAS*OA*23*11297~
REF*6R*CPK4S8WSRZ4M~
SVC*HC:63267:80*14046*36.84~
DTM*472*20180727~
CAS*OA*23*14009.16~
REF*6R*CPK429PMUYGJ~
AMT*B6*36.84~
SVC*HC:63048:80*2188*5.74~
DTM*472*20180727~
CAS*OA*23*2182.26~
REF*6R*CPK404HLH17U~
AMT*B6*5.74~
SE*54*0001~
ST*835*0002~
BPR*I*106.92*C*ACH*CCP*01*PAYERROUTNUM*DA*PAYERACCTNUM*1470246511**01*PAYEEROUTNUM*DA*PAYEEACCTNUM*20200624~
TRN*1*H012006223200477471710917174*1470246511*01~
REF*EV*581651222~
DTM*405*20200619~
N1*PR*MUTUAL OF OMAHA COMPANIES CLAIMS DEPARTMENT~
N3*3300 MUTUAL OF OMAHA PLZ~
N4*OMAHA*NE*681751004~
REF*EO*71412~
N1*PE*RAJESH K BINDAL MD PA*XX*1710917174~
N3*PO BOX 67~
N4*HOUSTON*TX*77001~
REF*TJ*320047747~
LX*1~
CLP*000400031877*22*-29788*-306.83**15*584550181000-030/20180908TXBA8*21*1~
NM1*QC*1*HARBIN*ANN****MI*75096392M~
NM1*82*1*PARK*JOHN***MD*XX*1063560597~
REF*IG*75096392M~
DTM*232*20180727~
DTM*050*20180908~
SVC*HC:63047*-11297*0~
DTM*472*20180727~
CAS*OA*23*-11297~
REF*6R*CPK4GU3V2961~
SVC*HC:63267*-14046*-265.45~
DTM*472*20180727~
CAS*OA*23*-13780.55~
REF*6R*CPK4GKPDDJXM~
SVC*HC:63048*-2188*-41.38~
DTM*472*20180727~
CAS*OA*23*-2146.62~
REF*6R*CPK4MVD3YIX9~
SVC*HC:69990*-2257*0~
DTM*472*20180727~
CAS*OA*23*-2257~
REF*6R*CPK455Q0875J~
CLP*000400031877*2*29788*413.75*13554*15*584550181000-051*21*1~
CAS*CO*45*14177.54~
CAS*OA*23*1655**94*-12.29~
CAS*PR*96*13554~
NM1*QC*1*HARBIN*ANN****MI*75096392M~
NM1*82*1*PARK*JOHN***MD*XX*1063560597~
MIA*0****N174~
REF*IG*75096392M~
REF*F8*584550181000-030/20180908TXBA8486~
DTM*232*20180727~
DTM*050*20180908~
AMT*AU*413.75~
SE*49*0002~
GE*2*4111~
IEA*1*000004111~
`

main()