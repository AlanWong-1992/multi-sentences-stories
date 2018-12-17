const findSentencesInList = (postValue, sentencesList, sentences) => {
  console.log('findSentencesInList.js is running and the postvalue is: ', postValue);
  let foundSentence;
  if (sentences.linkedTo) {
    console.log('Is sentences linkedTo: ', sentences.linkedTo[0]);
      sentences.linkedTo.filter((array) => {
      foundLink = array[0] === postValue;
      foundSentencesId = array[1];
      console.log('foundLink: ', foundLink);
      console.log('foundSentencesId: ', foundSentencesId);
      if (foundLink && foundSentencesId) {
          sentencesList.filter((theSentences) => {
          if (theSentences.sentenceZero === postValue) {
            console.log('We found the sentences with this Id: ', theSentences);
            foundSentence = theSentences;
          }
        });
      };
    });
  };
  return foundSentence;
};

module.exports = {findSentencesInList};
