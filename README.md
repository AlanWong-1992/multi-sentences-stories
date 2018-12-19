# Multi-Path-Stories

The application shows a sentence in the middle with four empty boxes above, below, left and right of it. You can enter a sentence in any of these boxes and when you click submit the sentence gets saved and the box turns into a link of the sentence that you just submitted.
If you click on a saved sentence the application directs you to a new panel where the sentence you clicked gets placed in the middle and four more empty boxes appear where you can enter another sentence, click submit and the box turns into a link of the sentence and you can click on it once again taking you to another iteration.
There is a ‘Go back to Start’ link at the top where if you click it, it takes you back to the beginning of the application with the first sentence in the middle and the four boxes around this initial sentence. If the boxes have not been submitted with a sentence before then you can enter a sentence and click on it creating a sentence with the link. Else if it has been filled in before the sentence gets repopulated and you can click on it taking you to the next panel where this sentence is in the middle and any sentences submitted before showing up as links.

## Approach and Implementation
The screencast showed that this was a single page application so I thought the best way to implement this was to use handlebars templating engine to serve the HTML files back to the client as this would allow for conditional rendering of components to be sent to the clients.
Each sentence in the middle with the corresponding empty boxes or submitted sentences would be stored in an object with a unique id and these would be saved in an array.
A GET request would send back a HTML page with the correct object to be displayed.
A POST request would submit information to the server and depending on the key of the POST request would alter a property of the object, look for the object or create a new object entirely.
If the key of the POST request was sentencesOne, sentencesTwo, sentencesThree, sentencesFour then the server would set the value from this POST request to the current object with the same property name.
If the key of the POST request was linkOne, linkTwo, linkThree, linkFour this would first search the array containing all the objects to see if there is an object with the sentence in the middle which I have called sentenceZero with this value.
If there is return this object and send the page back with these sentences.  
If there is not then make a new object with the sentenceZero value equal to the value from the link just pressed, make all the sentences property empty and add this to the array of objects. Now in the previous object which linked to this object add a tag which tells the previous object to come to this object should the link with the same value as the sentenceZero value.
If the key of the POST request is ‘resetStory’ then search the array to see if the current sentence is in the arrays list if not add this object, else just go back to the first object of the story.

## List of things this is Testing
1) Knowledge of how to design and then implement so as to not waste time writing and rewriting code.
2) Knowledge of web frameworks as the company builds products which work similarly to this coding challenge.
3) Ability to think logically.
4) Ability to write clean code.
5) The short report to demonstrate to convey good written communication skills.

## Instructions for Running the application
Node.js must be installed on your system if it is not please download it from their website before proceeding. Open up the command line and go into the main folder /multi-path-stories from here type in and run:
`npm install`
Once all the node modules have been installed, type and run the following command:
`node server/server.js`
The application should then be running on port 3000. If the application does not automatically load up in your default web browser. Open up a web browser (like Chrome or firefox) and enter ‘http://localhost:3000/’ into the web address bar and hit enter.
