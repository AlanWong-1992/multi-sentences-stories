// original

const {addSentence} = require('./utils/addSentence');
const bodyParser = require('body-parser');
const express = require('express');
const {findSentenceInSentencesList} = require('./utils/findSentenceInSentencesList');
const hbs = require('hbs');
const path = require('path');
const {populateSentencesList} = require('./utils/populateSentencesList');
const {resetSentences} = require('./utils/resetSentences');
const {saveAndUpdateSentences} = require('./utils/saveAndUpdateSentences');
const viewsPath = path.join(__dirname, '/../views/partials');

// key names during POST requests for forms and links
const postSentenceKeys = ['sentenceOne', 'sentenceTwo', 'sentenceThree', 'sentenceFour'];
const postLinkKeys = ['linkOne', 'linkTwo', 'linkThree', 'linkFour'];

// sentences and the form used to submit the sentence. sentenceZero is the sentences
// in the middle of the page
let count = 0;
let sentences = {
  id: count,
  sentenceZero: 'Start your story here!',
  sentenceOne: '',
  sentenceTwo: '',
  sentenceThree: '',
  sentenceFour: ''
};

// sentencesList is the container used to hold the selected and submitted sentences
let sentencesList = [];

const app = express();

hbs.registerPartials(viewsPath);

app.set('view engine', 'hbs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.render('home.hbs', {
    pageTitle: 'Haplo Coding Challenge',
    message: 'This is the coding challenge for Haplo',
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
    res.redirect('/');

  } else if (postLinkKeys.includes(Object.keys(req.body)[0])) {
    // Check to see if there is an object with a sentenceZero.value === to the req.body.link value if there is we can auto populate that object
    const postValue = Object.values(req.body)[0];

    const oldSentences = findSentenceInSentencesList(postValue, sentencesList, sentences)[0];
    console.log(oldSentences);
    if (oldSentences) {
      sentences = Object.assign(sentences, oldSentences);
    } else {
      saveAndUpdateSentences(sentences, count, sentencesList, req);
      count++;
    }

    res.redirect('/');

  } else if (req.body.resetStory === 'true') {
    // 1) Need to get data from the first item in sentencesList and replace the
    // sentences object with all the properties in this item
    // 2) refresh page to update and show these items
    // 3) Check if item is duplicate
    // If I click on the first square I need to check if there are any objects whereby the sentenceZero is the same as the one I clicked on
    // The problem is when there are duplicate sentences if this is the case I then need to check for sentencesOne, I could keep a copy of the
    // previous properties and then check for the duplicates which would avoid duplicates.
    console.log('Need to go back to the beginning of the story now');
    Object.assign(sentences, sentencesList[0]);
    console.log(`The beginning sentences id: ${sentences.id}`);
    // console.log('SentencesList: ', sentencesList);
    // console.log('Sentences: ', sentences);
    res.redirect('/')

  } else {
    console.log('There was an error');
    res.redirect('/')
  }
});

app.listen(3000, () => console.log('Server is up on port 3000!'));
