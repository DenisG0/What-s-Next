import React, { Component } from 'react';
import axios from 'axios';
import Top from './TopPage';
//import Script from './script'
//import tinyreq from "tinyreq";

var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition
// var SpeechRecognitionEvent = SpeechRecognitionEvent || webkitSpeechRecognitionEvent

var recognition = new SpeechRecognition();
recognition.continuous = true;
recognition.interimResults = false;
recognition.lang = "en-US";
recognition.onstart = function() {
  var ready = new SpeechSynthesisUtterance("Say ready to  start");
  window.speechSynthesis.speak(ready);
  //Listening (capturing voice from audio input) started.
  //This is a good place to give the user visual feedback about that (i.e. flash a red light, etc.)
};

recognition.onend = function() {
  console.log("Its Over")
  recipeList = []
  var finalmsg = new SpeechSynthesisUtterance("Cooking is Completed");
  window.speechSynthesis.speak(finalmsg);
  start_img.src = "http://cdn.mysitemyway.com/icons-watermarks/simple-black/raphael/raphael_microphone-mute/raphael_microphone-mute_simple-black_512x512.png"
  on = false;
};

let recipeList = []

var noWay=(recipe)=>{
  return () => {
  startButton()
  var list = recipe.split("|")
  list.map(function(each){
    if(each.length>1){
    recipeList.push(each)
    }
  })
}}

recognition.onresult = function(event) { //the event holds the results
//Yay – we have results! Let’s check if they are defined and if final or not:
  // if (typeof (event.results) === 'undefined') {
  //     var waiting = function() {
  //     var leave = new SpeechSynthesisUtterance("Are you still there?");
  //     window.speechSynthesis.speak(leave);
  //     recognition.stop()
  //     }
  //     setTimeout(waiting(), 1000);
  //     return;
  // }
  var previousMessage, newMessage
  for (var i = event.resultIndex; i < event.results.length; ++i) {
        let store = event.results[i][0].transcript.trim()
      //let previousMessage
      console.log("store:", store)
      // if(recipeList.length > 0){
      //   this.onend();
      // }
       if(store === "ready"){
              previousMessage = recipeList.shift();
              var msg = new SpeechSynthesisUtterance(previousMessage);
              window.speechSynthesis.speak(msg);
            }
        //Very buggy
        // else if(store ==='please repeat'){
        //   var repeat = new SpeechSynthesisUtterance(previousMessage);
        //   return window.speechSynthesis.speak(repeat);
        // }
           if(store === "what's next"){
            newMessage = recipeList.shift();
            var msg2 = new SpeechSynthesisUtterance(newMessage);
            console.log("msg2",msg2)
            window.speechSynthesis.speak(msg2);
          }

      }
};

var on = false;

const center = {
  'textAlign': 'center',
}

function startButton() {

  if(on){
    recognition.stop();
  } else {
   recognition.start();
   start_img.src = 'https://maxcdn.icons8.com/Share/icon/p1em/Music//microphone1600.png';
   on = true;
  }}

export default class App extends Component {

  constructor(){
    super()
    this.state = {
      Instruction:[]
    }
    this.handleSubmit = this.handleSubmit.bind(this)
  //  this.noWay = this.noWay.bind(this)
  }

 componentDidMount(){
  axios.get('/api/recipe')
  .then(res => res.data)
  .then( recipe => {
    this.setState({
      Instruction: recipe
    })
  })
}


  handleSubmit(event){
    axios.post('/api/recipe', {
      url: event.target.url.value
    })
    .then(res => res.data)
    .then( () => {
      console.log("succesful add!")
      this.forceUpdate()
    })
    //ADD ERROR Handling
    .catch()
  }




  render() {

    const List = this.state.Instruction

    return (
      <div className="background">
      <Top />
          <div className = "backfront">
          <div className = "backbox" style = {center}>
          <h1 className = "specialfont">In Partner With Better Home and Gardens</h1>
          <h5 className="specialfont">
            To get started, pick a recipe from <a href ='http://www.bhg.com/' style = {{'color':'#000000', 'fontWeight':'bold'}}> HERE </a>  and submit to play.
           </h5>
          <form role="submit" onSubmit = {this.handleSubmit}>
          <div>
            <input type="text" className="form-control" placeholder="Submit Url of Recipe" name="url"/>
           </div>
          <button className="btn btn-primary btn-lg" type="submit">Submit</button>
         </form>
         <div className="list-group">
               <div className="list-group-item active" style = {{'fontWeight':'bold', 'fontFamil': 'Times New Roman'}}>
               <h4>Saved Recipes</h4>
                </div>
         {
           List.map( (recipe) => {
             return (
              <a key ={recipe.id}
              onClick={noWay(recipe.directions)}
              className="list-group-item">{recipe.Name}
              </a>
           )})
         }
       </div>
         <div ><img alt="Start" id="start_img" className ="mic" src='http://cdn.mysitemyway.com/icons-watermarks/simple-black/raphael/raphael_microphone-mute/raphael_microphone-mute_simple-black_512x512.png'/></div>
         </div>
         </div>
      </div>
    );
  }
}


