const checkSentencesExist = (sentences, sentencesList) => {
  sentencesList.filter((theSentences) => {
    if (theSentences.id === sentences.id && theSentences.sentenceZero === sentences.sentenceZero) {
      return theSentences;
    };
  })[0];
};

module.exports = {checkSentencesExist};
