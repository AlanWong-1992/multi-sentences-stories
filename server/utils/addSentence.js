const addSentence = (sentences, req) => {
  // Pick off key value pair from the request object
  const sentence = Object.entries(req)[0];
  // Set the property name and value to those from the request object
  sentences[sentence[0]] = sentence[1];
}

module.exports = {addSentence};
