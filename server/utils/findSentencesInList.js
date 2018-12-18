// returns sentences if found in list based of the current sentences id and sentenceZero
const findSentencesInList = (sentencesList, sentences) => {
  return sentencesList.filter((theSentences) => {
    if (theSentences.id === sentences.id && theSentences.sentenceZero === sentences.sentenceZero) {
      console.log('On Reset we found a match');
      return theSentences;
    };
  })[0];
};

module.exports = {findSentencesInList};
