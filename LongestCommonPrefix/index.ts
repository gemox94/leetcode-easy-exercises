import testcases from "./testcases";

/**
 * ----------------------------------------------------------------------------------------------------------------------------------------------------------
 * --------------------------------------------------------------- V1 (NOT WORKING) -------------------------------------------------------------------------
 * ----------------------------------------------------------------------------------------------------------------------------------------------------------
 */

// Preparing the prefix map
let prefixMap: any = {};

// Function that checks if there's a common prefix between two words
function findPrefix(str1: string, str2: string): void {

    if (str1[0] !== str2[0]) return;

    let prefix = str1[0];
    for (let i=1; i<str2.length; i++) {

        if (str1[i] !== str2[i]) break;

        if (prefix.length === 2) break;

        prefix += str1[i];
    }

    prefixMap[prefix] = prefix;
}

// Needed function to reset value to prefixMap
function runLongestCommonPrefix(words: string[]): string {

    const initialWord = words.shift();

    if (!initialWord) {

        const prefixArray: string[] =
            Object.keys(prefixMap).map((prefix: string) => prefix);

        return !prefixArray.length ? '' : <string>prefixArray.sort((a: string, b: string) => a.length - b.length).pop();
    };

    for (let i=0; i<words.length; i++) {
        findPrefix(initialWord, words[i]);
    }

    return runLongestCommonPrefix(words);
}

// Main function
function longestCommonPrefix(words: string[]): string {
    prefixMap = {};
    return words.length === 1 ? words[0] : runLongestCommonPrefix(words);
}

/**
 * ----------------------------------------------------------------------------------------------------------------------------------------------------------
 * --------------------------------------------------------------- V2 ---------------------------------------------------------------------------------------
 * ----------------------------------------------------------------------------------------------------------------------------------------------------------
 */

function longestCommonPrefixV2(words: string[]): string {

    // If the array has no elements, return empty string
    if (!words.length) return '';

    // Assign as prefix the first word in the array
    let prefix: string = words[0];

    // Loop over the remaining words by starting at index 1
    for (let i=1; i<words.length; i++) {

        /**
         * Here, we get the word at index 'i' and ask if it contains in some way the prefix.
         * Remember that the first value of the prefix is the first word in the array.
         * So we can understand how this works, we have to know how indexOf works.
         * It basically looks in an array the index where the passed word matches against the one we're comparing
         * For example, if we have a phrase like "Is Awesome" and we try to find "Awesome" in that phrase, we can use
         * indexOf -> "Is Awesome".indexOf("Awesome") will return 3 becase is the index where the word "Awesome" begins.
         *
         * So with that in mind, what we're trying here is, when the prefix matches the index 0 of the comparing word,
         * that way we're sure is a prefix because is at the beginning of the word.
         */
        while (words[i].indexOf(prefix) !== 0) {

            /**
             * Here, we're re-assigning the prefix by deleting the last word of it.
             * That way, we're removing the letters that are not from the prefix, for example:
             * The idea of the while and the prefix.substring is, for example, we have:
             * "plastic" as the word[i] and "play" as the prefix.
             *
             * The first time the while runs, it's going to check if "plastic".substring("play"), it will return -1
             * So, we have to reduce the word "play", so, that's what we do with .substring. At the first iteration
             * prefix.length - 1 = 3 (4-1) we do "play".substring(0, 3), so what we're doing is re-assigning the prefix
             * prefix = "pla".
             * As we can see, the while will stops until prefix will be "pl" it's when the words[i].indexOf(prefix)
             * will throw 0 and the while will stops.
             */
            prefix = prefix.substring(0, prefix.length - 1);

            // At the end if the prefix gets empty, it means it never matched the word[i], so we return empty string
            if (prefix === '') return '';
        }
    }

    return prefix;
}

testcases.forEach((testcase: string[]) => {
    const result = longestCommonPrefixV2(testcase);
    console.log(`Testcase: ${testcase} - LCP: ${result}`);
});
