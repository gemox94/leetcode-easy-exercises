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

   if (!words.length) return '';
   let prefix: string = words[0];
   for (let i=1; i<words.length; i++) {
     while (words[i].indexOf(prefix) !== 0) {
       prefix = prefix.substring(0, prefix.length - 1);
       if (prefix === '') return '';
     }
   }

   return prefix;
 }

console.log(longestCommonPrefixV2(["play","plenty","plastic"]));
