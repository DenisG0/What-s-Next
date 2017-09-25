'use strict';
import React from 'react'

const style = {
  'textAlign':'center',
  'margin': '22% 0% 22% 0%'
}

const stylin = {
  'color':'#fff',
  'fontSize': '2em',

}

const Top = () => {

    return (
      <div>
      <div className="App-header" style = {style}>
          <div className = "titlefont">Whats Next?</div>
          <div className = "titlefont" style = {stylin}>
          The Voice Recognition Instruction App <br/>
          Cooking edition
          </div>
     </div>


    </div>
    )
}

export default Top
