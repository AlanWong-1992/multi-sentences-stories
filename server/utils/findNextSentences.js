// returns sentences if it can find in List using the current sentences linkedTo property
const findNextSentences = (postValue, sentences, sentencesList) => {
  return sentencesList.filter((theSentences) => {
    return sentences.linkedTo.find((valueAndId) => {
      if (theSentences.sentenceZero === postValue && theSentences.id === valueAndId[1]) {
        return theSentences;
      }
    });
  })[0];
};

module.exports = {findNextSentences};
