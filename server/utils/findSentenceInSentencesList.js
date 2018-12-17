// filter the sentencesList to see if there is a key value pair where the key is sentenceZero and the value is the same as the value from
// the POST request. Then check the prevId of this filtered sentences object to see if it is the same as the current sentences.id so that we know the
// historical sentences object exists and we return this

const findSentenceInSentencesList = (postValue, sentencesList, sentences) => {
  console.log('sentences next id ', sentences.nextId);
  console.log('sentences obj ', sentences);
  return sentencesList.filter((theSentences) => {
    if (theSentences.id === sentences.nextId && theSentences.sentenceZero === postValue) {
      console.log('Returing found obj',theSentences);
      return theSentences;
    };
  })[0];
};

module.exports = {findSentenceInSentencesList};

const findIdInList = (postValue, sentencesList, sentences) => {
  if (sentences.linkedTo) {
    sentences.linkedTo.filter((array) => {
      foundLink = array[1] === postValue;
      foundSentencesId = array[0];
      if (foundLink && foundSentencesId) {
        sentencesList.filter((theSentences) => {
          console.log(theSentences);
        });
      };
    });
  };
}
// sentences.sentenceOne === postValue || sentences.sentenceTwo === postValue || sentences.sentenceThree === postValue || sentences.sentenceFour === postValue
