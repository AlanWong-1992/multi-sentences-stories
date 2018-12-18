const {addSentence} = require('./utils/addSentence');
const bodyParser = require('body-parser');
const {checkSentencesExist} = require('./utils/checkSentencesExist');
const express = require('express');
const {findNextSentences} = require('./utils/findNextSentences');
const {findSentencesIndex} = require('./utils/findSentencesIndex');
const hbs = require('hbs');
const path = require('path');
const {populateSentencesList} = require('./utils/populateSentencesList');
const {pushSentences} = require('./utils/pushSentences');
const {resetSentences} = require('./utils/resetSentences');
const {updateSentences} = require('./utils/updateSentences');
const viewsPath = path.join(__dirname, '/../views/partials');

// key names during POST requests for forms and links
const postSentenceKeys = ['sentenceOne', 'sentenceTwo', 'sentenceThree', 'sentenceFour'];
const postLinkKeys = ['linkOne', 'linkTwo', 'linkThree', 'linkFour'];

// sentences and the form used to submit the sentence. sentenceZero is the sentences
// in the middle of the page
let count = {count: 0};

let previousSentences = {

}

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
  // console.log(sentencesList);
  // if/else-if statements check to see if the key of the POST method is in
  // the postSentenceKeys and postLinkKeys arrays, if they are then proceed
  // to process the request
  if (postSentenceKeys.includes(Object.keys(req.body)[0])) {
    addSentence(sentences, req.body);
    const newSentences = updateSentences(sentences, sentencesList, req);
    // console.log('New Sentences: ', newSentences);
    // console.log('sentencesList: ', sentencesList);
    res.redirect('/');

  } else if (postLinkKeys.includes(Object.keys(req.body)[0])) {
    console.log('Current Sentences Object: ', sentences);
    const postValue = Object.values(req.body)[0];
    const foundNextItem = findNextSentences(postValue, sentences, sentencesList);

    if (foundNextItem) {
      console.log('Found Next Item: ', foundNextItem);
      Object.assign(sentences, foundNextItem);

    } else {
      const sentencesExist = checkSentencesExist(sentences, sentencesList);
      if (!sentencesExist) {sentencesList.push(Object.assign({}, sentences));} // Only push object if there does not exist a sentence.

      // Set previousSentences so I can update the linkedTo values
      previousSentences = Object.assign({}, sentences);
      count.count++;
      resetSentences(sentences);
      sentences.id = count.count;
      sentences.sentenceZero = Object.values(req.body)[0];
      if (!sentences.linkedTo) {sentences.linkedTo = []};
      previousSentences.linkedTo.push([sentences.sentenceZero, sentences.id]);

      // console.log('previousSentences', previousSentences);
      // console.log('sentences', sentences);
      //
      // console.log('SentencesList: ', sentencesList)

      // Linking the two objects together
      const foundSentenceIndex = findSentencesIndex(sentencesList, previousSentences);

      sentencesList.splice(foundSentenceIndex, 1, previousSentences);
      // console.log('Printing SentencesList:');
      // sentencesList.forEach((theSentences) => {
      //   console.log(theSentences);
      // });

    }
    console.log('Printing Sentences List');
    sentencesList.forEach((theSentences) => {
      console.log(theSentences);
    })
    res.redirect('/');

  } else if (req.body.resetStory === 'true') {

    console.log('Reset Story');
    console.log('Sentences Object before reset: ', sentences);

    const foundSentences = sentencesList.filter((theSentences) => {
      if (theSentences.id === sentences.id && theSentences.sentenceZero === sentences.sentenceZero) {
        console.log('On Reset we found a match');
        return theSentences;
      };
    })[0];

    if (!foundSentences) {
      sentencesList.push(Object.assign({}, sentences));
    }
    console.log('found Sentences value: ', foundSentences);
    Object.assign(sentences, sentencesList[0]);
    console.log('Sentences Object on Reset: ', sentences);
    res.redirect('/')

  } else {
    console.log('There was an error');
    res.redirect('/')
  }
});

app.listen(3000, () => console.log('Server is up on port 3000!'));
