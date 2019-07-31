import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Feedback = (props) => {
 const header = props.header

 return (
   <h1>
     {header}
   </h1>
 )
}

const Total = (props) => {
 const total = props.good + props.neutral + props.bad

 return (
   <p>
     {total}
   </p>
 )
}


const Average = (props) => {

 return (
   <p>
     {((props.good * 1) + (props.neutral * 0) + (props.bad * -1))     
     / (props.good + props.neutral + props.bad)}
   </p>
 )
}

const Positive = (props) => {

 return (
   <p>
     {(props.good) / (props.good + props.neutral + props.bad) * 100} %
   </p>
 )
}

const Statistic = (props) => {
  const text = props.text
  const value = props.value

  return (
    <p>
      {text} {value}
    </p>
  )
}

const Statistics = (props) => {
 const header = props.header
 const total = props.good + props.neutral + props.bad

 if (total === 0) {
   return (
     <div>
       <h1>
         {header}
       </h1>
       <div>
         Ei yhtään palautetta annettu
       </div>
     </div>
   )
 }

 return (
   <div>
  <h1>
    {header}
  </h1>
   <table>
     <tbody>
      <tr>
        <td>hyvä</td>
        <td>neutraali</td>
        <td>huono</td>
        <td>yhteensä</td>
        <td>keskiarvo</td>
        <td>positiivisia</td>
      </tr>
      </tbody>
      <tbody>
      <tr>
        <td>{props.good}</td>
        <td>{props.neutral}</td>
        <td>{props.bad}</td>
        <td>{
          <Total 
          good={props.good} 
          neutral= {props.neutral} 
          bad= {props.bad} 
        />
        }</td>
        <td>{
          <Average
          good={props.good}
          neutral={props.neutral}
          bad={props.bad}
        />
        }</td>
        <td>{
          <Positive
          good={props.good}
          neutral={props.neutral}
          bad={props.bad}
          />
        }</td>
      </tr>
      </tbody>
   </table>
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



const App = () => {
 // tallenna napit omaan tilaansa
 const [good, setGood] = useState(0)
 const [neutral, setNeutral] = useState(0)
 const [bad, setBad] = useState(0)


 return (
   <div>
     <div>
       <Feedback
          header = 'anna palautetta'>
       </Feedback>
       <Button text='hyvä' onClick={() => setGood(good + 1)}>
       </Button>
       <Button text='neutraali' onClick={() => setNeutral(neutral + 1)}>
       </Button>
       <Button text='huono' onClick={() => setBad(bad + 1)}>
       </Button>
     </div>
     <div>
       <Statistics
         header = 'statistiikka'
         good={good}
         neutral={neutral}
         bad={bad}>
       </Statistics>
     </div>
   </div>
 )
}

ReactDOM.render(<App />,
 document.getElementById('root')
)
  