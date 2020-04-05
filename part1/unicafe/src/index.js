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
   <div>
     {total}
   </div>
 )
}


const Average = (props) => {

 return (
   <div>
     {((props.good * 1) + (props.neutral * 0) + (props.bad * -1))     
     / (props.good + props.neutral + props.bad)}
   </div>
 )
}

const Positive = (props) => {

 return (
   <div>
     {(props.good) / (props.good + props.neutral + props.bad) * 100} %
   </div>
 )
}

const Statistic = (props) => {
  const text = props.text
  const value = props.value

  return (
    <tr>
      <td>{text}</td> 
      <td>{value}</td> 
    </tr>
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
      <Statistic text = "hyvä" value = {props.good}></Statistic>
      <Statistic text = "neutraali" value = {props.neutral}></Statistic>
      <Statistic text = "huono" value = {props.bad}></Statistic>
      <Statistic text = "keskiarvo" value = {
        <Average
          good={props.good}
          neutral={props.neutral}
          bad={props.bad}
        />
      }
      ></Statistic>
      <Statistic text = "positiivisia" value = {
        <Positive
          good={props.good}
          neutral={props.neutral}
          bad={props.bad}
        />
      }
      ></Statistic>
      <Statistic text = "yhteensä" value ={
        <Total 
        good={props.good} 
        neutral= {props.neutral} 
        bad= {props.bad} 
      />
      }
      ></Statistic>
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
  