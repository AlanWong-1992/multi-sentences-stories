// checks if the current sentences exists in the list
const checkSentencesExist = (postValue, sentences, sentencesList) => {
  return sentencesList.filter((theSentences) => {
    if (theSentences.id === sentences.id && theSentences.sentenceZero === sentences.sentenceZero) {
      return theSentences;
    };
  })[0];
};

module.exports = {checkSentencesExist};
