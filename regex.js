/**
 * Takes string as argument and returns formatted 10-digit phone number. 
 * Accepts both written numbers and digits, stripping all non-numbers and
 * any truncates to first ten digits.
 */
'use strict';
const convertPhone = (phoneNum) => {
    const acceptableNums = {
            "zero": "0",
            "one": "1",
            "two": "2",
            "three": "3",
            "four": "4",
            "five": "5",
            "six": "6",
            "seven": "7",
            "eight": "8",
            "nine": "9"
    };
    // Convert written nums to actual digits
    const regex = /(zero|one|two|three|four|five|six|seven|eight|nine)/gi
    const digitized = phoneNum.replace(regex, (match) => {
        return acceptableNums[match];
    });
    // Filter out non-digits
    const splitRaw = digitized.split("");
    const strippedNums = splitRaw.filter(digitsOnly);
    // Grab first 10 only if more than 10 nums present
    const firstTen = (strippedNums.length > 10 ? strippedNums.slice(0, 10) :    
        strippedNums);
    // Join array back up
    const areaCode = firstTen.slice(0,3).join("");
    const firstThree = firstTen.slice(3, 6).join("");
    const lastFour = firstTen.slice(6, 10).join("");
    // Format and return string
    return areaCode + "-" + firstThree + "-" + lastFour;
};

const digitsOnly = (value) => {
    const isDigit = value.match(/[0-9]/);
    return (isDigit !== null);
};



