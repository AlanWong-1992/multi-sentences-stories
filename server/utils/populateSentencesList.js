// file used to populate data into the sentencesList for manual testing, set count = 4 if using

const populateSentencesList = [{
  id: 1,
  sentenceZero: 'Start your story here!',
  sentenceOne: 'There was a dragon',
  sentenceTwo: 'There was a human',
  sentenceThree: 'There was a man from mars',
  sentenceFour: 'There was a cat',
  prevId: ''
}, {
  id: 2,
  sentenceZero: 'There was a dragon',
  sentenceOne: 'It had huge eyes',
  sentenceTwo: 'It breathed fire',
  sentenceThree: 'Its scales were massive',
  sentenceFour: 'Its muscles were strong',
  prevId: 1
}, {
  id: 3,
  sentenceZero: 'Its scales were massive',
  sentenceOne: 'They could be used for making shields',
  sentenceTwo: 'They could fortify the wall',
  sentenceThree: 'They look impermeable to magic',
  sentenceFour: 'They reflected the light from the gold',
  prevId: 2
}]

module.exports = {populateSentencesList};
