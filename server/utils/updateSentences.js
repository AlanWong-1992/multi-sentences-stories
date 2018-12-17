const updateSentences = (index, sentences, sentencesList) => {
  console.log('Index of sentence to be updated: ', index);
  console.log('creating a copy of the sentences to be updated');
  const sentencesCopy = Object.assign({}, sentences);
  console.log('updating the sentences');
  sentencesList.splice(index, 1, sentencesCopy);
}

module.exports = {updateSentences};
