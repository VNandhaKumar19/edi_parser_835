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
                        const sets = createTransactionSetOnRemaining(segments);
                        transactionSets.push(...sets);
                    }
                } catch (error) {
                    console.warn(`Failed to build a transaction set from ${resolvedFilePath} with error: ${error}`);
                }
            }
            console.log('files: ', JSON.stringify(files));
        } else {
            if(filePath.endsWith('.txt') || filePath.endsWith('.835') || filePath.endsWith('.RMT')) {
                const transactionSet = TransactionSet.buildFromFile(filePath);
                const segments = transactionSet.nextSet;
                delete transactionSet.nextSet;
                transactionSets.push(transactionSet);
                if (segments?.length) {
                    const sets = createTransactionSetOnRemaining(segments);
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
function createTransactionSetOnRemaining(segments: string[]): TransactionSet[] {
    const transactionSets: TransactionSet[] = []
    const transactionSet: TransactionSet = TransactionSet.build(segments)
    const segmentsArr = transactionSet.nextSet;
    delete transactionSet.nextSet;
    transactionSets.push(transactionSet)
    if (segmentsArr?.length) {
        transactionSets.push(...createTransactionSetOnRemaining(segmentsArr));
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
