const findNextSentences = (postValue, sentences, sentencesList) => {
  return sentencesList.filter((theSentences) => {
    return sentences.linkedTo.find((valueAndId) => {
      if (theSentences.sentenceZero === postValue && theSentences.id === valueAndId[1]) {
        console.log ('WE FOUND A MATCH!');
        return theSentences;
      }
    });
  })[0];
};

module.exports = {findNextSentences};
