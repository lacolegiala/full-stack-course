import React, { useState } from 'react'

const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(props.points)

  return (
    <div>
      <h2>Anecdote of the day</h2>
      <Button
        onClick={() => {
          setSelected(randomNumber(props.anecdotes.length))
        }}
        text='Next anecdote'
      />
      <div>
        <Button 
          onClick={() => {
            const copyOfVotes = [...votes]
            copyOfVotes[selected] += 1
            setVotes(copyOfVotes)
            console.log("Voted ", copyOfVotes[selected])
          }} 
          text='Vote'
        />
        This has {votes[selected]} votes
      </div>
      <div>
        {props.anecdotes[selected]}
      </div>
      <h2>Anecdote with most votes</h2>
      <div>{props.anecdotes[mostVotes(votes)]}</div>
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

const mostVotes = (votes) => {
  const maxValue = Math.max(...votes)
  let maxIndex = 0

  for (let i = 0; i < votes.length; i++) {
    if (votes[i] === maxValue) {
      maxIndex = i
    }
  }

  return maxIndex
}


export default App;
