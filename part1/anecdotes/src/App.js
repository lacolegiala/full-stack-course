import React, { useState } from 'react'

const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [pressed, setPressed] = useState(false)
  const [voted, setVoted] = useState(0)

  return (
    <div>
      <Button onClick={() => {
        setSelected(randomNumber(props.anecdotes.length))
        setPressed(true)
      }
      }
      text='Next anecdote'>
      </Button> 
      <div>
        {pressed===true ?
        <Button onClick={() => {
          setVoted(voted + 1)
          props.points[selected] += 1
          console.log("Voted ", props.points[selected])
        }
        } 
        text='Vote'></Button> : ''}
      </div>
      <div>
        {pressed===true ?
        props.anecdotes[selected] : ''}
      </div>
      <div>
        {pressed===true ?
        props.points[selected] : ''}
      </div>
    </div>
  )
}

const Button = (props) => {
  const text = props.text

  return (
    <button onClick={props.onClick}>
      {text}
    </button>
  )
}

const randomNumber = (numberOfAnecdotes) => {
  return Math.floor(Math.random() * numberOfAnecdotes)
}


export default App;
