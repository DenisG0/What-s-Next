// import React, { Component } from 'react';

// var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition
// var SpeechRecognitionEvent = SpeechRecognitionEvent || webkitSpeechRecognitionEvent

// var recognition = new SpeechRecognition();
// recognition.continuous = true;   //Suitable for dictation.
// recognition.interimResults = false;  //If we want to start receiving results even if they are not final.
// //Define some more additional parameters for the recognition:
// recognition.lang = "en-US";
// var orders = [ "Begin", "Whats Next", "What was before", "Finish"];
// recognition.onstart = function() {
//   //Listening (capturing voice from audio input) started.
//   //This is a good place to give the user visual feedback about that (i.e. flash a red light, etc.)
// };

// recognition.onend = function() {
//   console.log("Its Over")
// };

// recognition.onresult = function(event) { //the event holds the results
// //Yay – we have results! Let’s check if they are defined and if final or not:
//   if (typeof(event.results) === 'undefined') { //Something is wrong…
//       recognition.stop();
//       return;
//   }

//   for (var i = event.resultIndex; i < event.results.length; ++i) {
//   //    if (event.results[i].isFinal) { //Final results
//           console.log("final results: " + event.results[i][0].transcript);
//   }
// };
// var on = false;

// function startButton(event) {
//   return () => {
//   if(on){
//     recognition.stop();
//     start_img.src = "https://speechlogger.appspot.com/images/micoff2.png"
//     on = false;
//   } else {
//    recognition.start();
//    start_img.src = 'https://speechlogger.appspot.com/images/micslash2.png';
//    on = true;
//   }}}

// export default class Script extends Component {




//   render (){


//     return (

//       <div>
//       <h1></h1>

//       <div onClick={startButton(event)}><img alt="Start" id="start_img" src="https://speechlogger.appspot.com/images/micoff2.png"/></div>
//       </div>
//     )
//   }
// }
