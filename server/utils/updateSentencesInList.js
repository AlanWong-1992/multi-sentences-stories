// looks through the list and if it finds a match with current sentences object it updates its properties with the current properties

const updateSentencesInList = (sentences, sentencesList, req) => {
  sentencesList.find((theSentences) => {
    const postSentenceKey = Object.keys(req.body)[0];
    const postSentenceValue = Object.values(req.body)[0];
    if (theSentences.sentenceZero === sentences.sentenceZero && theSentences.id === sentences.id) {
      theSentences[postSentenceKey] = postSentenceValue;
    }
  });
}

module.exports = {updateSentencesInList};
