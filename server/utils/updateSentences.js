const updateSentences = (sentences, sentencesList, req) => {
  sentencesList.filter((theSentences) => {
    const postSentenceKey = Object.keys(req.body)[0];
    const postSentenceValue = Object.values(req.body)[0];
    if (theSentences.sentenceZero === sentences.sentenceZero) {
      theSentences[postSentenceKey] = postSentenceValue;
      return theSentences;
    }
  });
}

module.exports = {updateSentences};
