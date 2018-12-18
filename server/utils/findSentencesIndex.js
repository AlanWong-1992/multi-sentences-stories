const findSentencesIndex = (sentencesList, previousSentences) => {
  return sentencesList.findIndex((theSentences) => {
    if (theSentences.id === previousSentences.id && theSentences.sentenceZero === previousSentences.sentenceZero) {
      return theSentences;
    }
  });
}

module.exports = {findSentencesIndex};
