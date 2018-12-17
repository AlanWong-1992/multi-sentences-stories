// resets all the properties in the sentences object to ''

const resetSentences = (sentences) => {
  const keys = Object.keys(sentences);
  keys.forEach((key) => {
    if (key !== 'sentenceZero' && key !== 'id') {
      sentences[key] = ''
    };
  });
};

module.exports = {resetSentences};
