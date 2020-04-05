import React, { useState } from 'react'

const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [pressed, setPressed] = useState(false)
  const [array, setArray] = useState(props.points)

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
        <Button onClick={() => {
          const copy = [...array]
          copy[selected] += 1
          setArray(copy)
          console.log("Voted ", copy[selected])
        }
        } 
        text='Vote'></Button>
        {array[selected]}
      </div>
      <div>
        {pressed===true ?
        props.anecdotes[selected] : props.anecdotes[0]}
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
