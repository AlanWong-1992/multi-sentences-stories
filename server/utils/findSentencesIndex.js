const findSentencesIndex = (sentencesList, sentences) => {
  return sentencesList.findIndex((theSentences) => {
    if (sentences.sentenceZero === theSentences.sentenceZero) {
      return theSentences;
    }
  });
}

module.exports = {findSentencesIndex};
