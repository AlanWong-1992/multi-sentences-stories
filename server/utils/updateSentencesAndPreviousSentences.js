const {resetSentences} = require('./resetSentences');

// updates current sentences and previous sentences
const updateSentencesAndPreviousSentences = (previousSentences, sentences, count, req) => {
  previousSentences = Object.assign({}, sentences);
  count.count++;
  resetSentences(sentences);
  sentences.id = count.count;
  sentences.sentenceZero = Object.values(req.body)[0];
  if (!sentences.linkedTo) sentences.linkedTo = [];
  previousSentences.linkedTo.push([sentences.sentenceZero, sentences.id]);
  return previousSentences;

}

module.exports = {updateSentencesAndPreviousSentences};
