// saves and updates sentencesList with a new sentences object if it is new.
const {resetSentences} = require('./resetSentences');

const pushSentences = (sentences, previousSentences, sentencesList, request, postValue, count) => {
  console.log('previousSentences', previousSentences);
  sentences.id = count.count;
  const sentencesCopy = Object.assign({}, sentences);


  // if (!previousSentences.linkedTo) {
  //   previousSentences.linkedTo = [];
  // }
  //
  // if (sentencesList.length>0) {
  //   previousSentences.linkedTo.push([postValue, count.count+1]);
  //   console.log('previousSentences: ', previousSentences);
  // }


  // Object.assign(previousSentences, sentencesCopy);
  // console.log('Previous Sentences Object ', previousSentences);

  sentencesList.push(sentencesCopy);
  sentences.sentenceZero = Object.values(request.body)[0];
  resetSentences(sentences);
}

module.exports = {pushSentences};
