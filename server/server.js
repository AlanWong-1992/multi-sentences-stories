const {addSentence} = require('./utils/addSentence');
const bodyParser = require('body-parser');
const {checkSentencesExist} = require('./utils/checkSentencesExist');
const express = require('express');
const {findNextSentences} = require('./utils/findNextSentences');
const {findSentencesIndex} = require('./utils/findSentencesIndex');
const {findSentencesInList} = require('./utils/findSentencesInList');
const hbs = require('hbs');
const path = require('path');
const {resetSentences} = require('./utils/resetSentences');
const {updateSentencesInList} = require('./utils/updateSentencesInList');
const {updateSentencesAndPreviousSentences} = require('./utils/updateSentencesAndPreviousSentences');
const viewsPath = path.join(__dirname, '/../views/partials');

// key names during POST requests for forms and links
const postSentenceKeys = ['sentenceOne', 'sentenceTwo', 'sentenceThree', 'sentenceFour'];
const postLinkKeys = ['linkOne', 'linkTwo', 'linkThree', 'linkFour'];

// sentences and the form used to submit the sentence. sentenceZero is the sentences
// in the middle of the page
let count = {count: 0};

let previousSentences = {

}

// current sentences
let sentences = {
  id: count.count,
  sentenceZero: 'Start your story here!',
  sentenceOne: '',
  sentenceTwo: '',
  sentenceThree: '',
  sentenceFour: '',
  linkedTo: []
};

// sentencesList is the container used to hold the selected and submitted sentences
let sentencesList = [{
  id: count.count,
  sentenceZero: 'Start your story here!',
  sentenceOne: '',
  sentenceTwo: '',
  sentenceThree: '',
  sentenceFour: '',
  linkedTo: []
}];

const app = express();

hbs.registerPartials(viewsPath);

app.set('view engine', 'hbs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.render('home.hbs', {
    sentenceZero: sentences.sentenceZero,
    sentenceOne: sentences.sentenceOne,
    sentenceTwo: sentences.sentenceTwo,
    sentenceThree: sentences.sentenceThree,
    sentenceFour: sentences.sentenceFour
  });
});

app.post('/', (req, res) => {
  console.log(req.body);
  // if/else-if statements check to see if the key of the POST method is in
  // the postSentenceKeys and postLinkKeys arrays, if they are then proceed
  // to process the request
  if (postSentenceKeys.includes(Object.keys(req.body)[0])) {
    addSentence(sentences, req.body);
    updateSentencesInList(sentences, sentencesList, req);
    sentencesList.forEach((obj) => console.log(obj));
    res.redirect('/');

  } else if (postLinkKeys.includes(Object.keys(req.body)[0])) {
    const postValue = Object.values(req.body)[0];
    const foundNextItem = findNextSentences(postValue, sentences, sentencesList);

    if (foundNextItem) {
      Object.assign(sentences, foundNextItem);

    } else {

      // Add item to the sentencesList or clear if it is the last path
      const sentencesExist = checkSentencesExist(postValue, sentences, sentencesList);

      // Only push object if there does not exist a sentences.
      if (!sentencesExist) sentencesList.push(Object.assign({}, sentences));

      //Set previousSentences so I can update the linkedTo values
      previousSentences = updateSentencesAndPreviousSentences(previousSentences, sentences, count, req);

      // Linking the two objects together
      const foundSentencesIndex = findSentencesIndex(sentencesList, previousSentences);
      if (foundSentencesIndex > -1) sentencesList.splice(foundSentencesIndex, 1, previousSentences);

    };
    sentencesList.forEach((obj) => console.log(obj));

    res.redirect('/');

  } else if (req.body.resetStory === 'true') {

    const foundSentences = findSentencesInList(sentencesList, sentences);

    if (!foundSentences) {
      sentencesList.push(Object.assign({}, sentences));
    }

    // set sentences to the first object in the sentencesList.
    Object.assign(sentences, sentencesList[0]);
    sentencesList.forEach((obj) => console.log(obj));
    res.redirect('/')

  } else {
    console.log('There was an error');
    res.redirect('/')
  }
});

app.listen(3000, () => console.log('Server is up on port 3000!'));
