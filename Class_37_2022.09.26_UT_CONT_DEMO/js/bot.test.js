//const compare = require("./bot");
//const utterances = require("./bot");
//const answers = require("./bot");
const compare = require("./bot");

/*
test("0. sākuma frāzes no bot.js: "+compare.utterances[0], () => {
    expect(true).toBe(true);
});
*/
/*
test("0. atbilde no bot.js: "+compare.answers[0], () => {
    expect(true).toBe(true);
});
*/

var i = 0;
test.each(compare.utterances[i])(
  "compare passes for text value %j from array with result: " +
    compare.answers[i],
  (utterance) =>
    expect(
      compare.compare(compare.utterances, compare.answers, utterance)
    ).toBe(compare.answers[i][0])
);

var utterances_quality_tests_0 = ["hi","hello","labdien"];
test.each(utterances_quality_tests_0)(
  "compare passes for text value %j from array with result: " +
    compare.answers[i],
  (utterance) =>
    expect(
      compare.compare(compare.utterances, compare.answers, utterance)
    ).toBe(compare.answers[i][0])
);