// laba pamācība (angļu valodā) - https://dev.to/dstrekelj/how-to-write-unit-tests-in-javascript-with-jest-2e83

// js + nodejs (lai izmantotu dažādus rīkus) + jest (konkrēkts testēšanas rīks)

// node.js instalācija - https://nodejs.org/en/download/package-manager/
// jest pielikšana (terminālī jāatrodas projekta mapē - piemēram, Class_36 mapē) - npm i jest
// uzreiz repozitorija saknes mapē jāpievieno fails ar nosaukumu .gitignore, lai netiktu augšupieladētas bibliotēkas

// izvēlētais rīks projekta failos meklē *.spec.js vai *.test.js failus
// šajos failos jābūt izmantotai test(arg1, arg2) funkcijai (tā var tikt izmantota daudzas reizes)
// test funkcijas argumenti:
// arg1 - testa nosaukums (lai progrmmētājam pašam ir skaidrs, ko viņš testē)
// arg2 - tieši testējamā funkcija
// isInteger.spec.js vai isInteger.test.js
// 
test("Sanity check, just text", () => {});
test("Sanity check with function", () => {expect(true).toBe(true);});

const isInteger = require("./isInteger");

test("isInteger passes for integer value", () => {
    expect(isInteger(1)).toBe(true);
});

test("isInteger fails for non-integer numeric value", () => {
    expect(isInteger(1.23)).toBe(false);
});

test("isInteger fails for non-integer symbol value", () => {
    expect(isInteger('a')).toBe(false);
});

const integerNumbers = [-1, 0, 1];
test.each(integerNumbers)(
    "isInteger passes for integer value %j from array (only true is waited for)",
    (fixture) => expect(isInteger(fixture)).toBe(true)
);

const Numbers = [
    [-1, true],
    [0, true],
    [1.23, false]
  ];
test.each(Numbers)(
    "isInteger passes for numeric value %j from array with result %j",
    (fixture, result) => expect(isInteger(fixture)).toBe(result)
);