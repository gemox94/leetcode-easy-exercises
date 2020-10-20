import testcases from './testcases';

// Constraints
// 1 <= s.length < 10^4
// s only should contain '(', ')', '{', '}', '[', ']'

// TODO:
// 1. Check for length constraint
// 2. Check for only parentheses constraint
// 3. Match cases...

// I think that the string must have an even length
// s[i] = s[s.length - (i + 1)]


testcases.forEach((str) => {
    const res = isValid(str);
    console.log(res);
});

function isValid(s: string) {
    
    if (s.length < 1 || s.length >= Math.pow(10, 4)) {
        return false;
    }

    if (!/^[\[\]{}\(\)]+$/.test(s)) {
        return false;
    }

    const remainder: number = s.length % 2;

    if (remainder !== 0) {
        return false;
    }

    const stack: string[] = [];

    
    for (let i=0; i<s.length; i++) {
        if (s[i] === ')' && (stack.length && stack[stack.length - 1] === '(')) {
            stack.pop();
        } else if (s[i] === ']' && (stack.length && stack[stack.length - 1] === '[')) {
            stack.pop();
        } else if (s[i] === '}' && (stack.length && stack[stack.length - 1] === '{')) {
            stack.pop();
        } else {
            stack.push(s[i]);
        }
    }

    return stack.length === 0;
}
