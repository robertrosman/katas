let symbols = [
    { value: 1000, symbol: "M" },
    { value: 500, symbol: "D" },
    { value: 100, symbol: "C" },
    { value: 50, symbol: "L" },
    { value: 10, symbol: "X" },
    { value: 5, symbol: "V" },
    { value: 1, symbol: "I" },
]

const getSymbolValue = function (symbol) {
    return symbols.find(s => s.symbol === symbol)?.value;
}


const getSubtractionFloor = function (value) {
    return value - getSubtract(value);
}

const getSubtract = function (value) {
    const dividend = value.toString().startsWith("5") ? 5 : 10;
    return value / dividend;
}

const intToRomanNumeral = function (number) {
    let remainder = number;
    let romanNumeral = "";

    symbols.forEach(symbol => {
        const subtract = getSubtract(symbol.value);
        while (remainder >= symbol.value - subtract) {
            if (symbol.value > remainder) {
                romanNumeral += intToRomanNumeral(subtract);
                remainder += subtract;
            }
            romanNumeral += symbol.symbol;
            remainder -= symbol.value;
        }
    });

    return romanNumeral;
}

const romanNumeralToInt = function (romanNumeral) {
    let sum = 0;
    romanNumeral.split("").forEach((char, i) => {
        const value = getSymbolValue(char);
        const nextValue = getSymbolValue(romanNumeral[i + 1]);
        sum += (value < nextValue ? -value : value);
    });
    return sum;
}

module.exports = {
    intToRomanNumeral,
    getSubtractionFloor,
    getSubtract,
    romanNumeralToInt,
    getSymbolValue,
};
