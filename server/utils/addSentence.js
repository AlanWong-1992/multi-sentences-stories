const addSentence = (sentences, sentenceRequest) => {
  // Pick off key value pair from the request object
  const sentence = Object.entries(sentenceRequest)[0];
  // Set the property name and value to those from the request object
  sentences[sentence[0]] = sentence[1];
}

module.exports = {addSentence};
