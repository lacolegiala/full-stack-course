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
 const text = 'yhteensä'

 return (
   <p>
     {text} {props.good + props.neutral + props.bad}
   </p>
 )
}


const Average = (props) => {
 const text = 'keskiarvo'

 return (
   <p>
     {text} {((props.good * 1) + (props.neutral * 0) + (props.bad * -1))     
     / (props.good + props.neutral + props.bad)}
   </p>
 )
}

const Positive = (props) => {
 const text = 'positiivisia'

 return (
   <p>
     {text} {(props.good) / (props.good + props.neutral + props.bad) * 100} %
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
     <div>
       hyvä {props.good}
     </div>
     <div>
       neutraali {props.neutral}
     </div>
     <div>
       huono {props.bad}
     </div>
     <div>
       <Total
         good={props.good}
         neutral={props.neutral}
         bad={props.bad}>
       </Total>
     </div>
     <div>
       <Average
         good={props.good}
         neutral={props.neutral}
         bad={props.bad}>
       </Average>
     </div>
     <div>
       <Positive
         good={props.good}
         neutral={props.neutral}
         bad={props.bad}>
       </Positive>
     </div>
   </div>
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
       <button onClick={() => setGood(good + 1)}>
         hyvä
       </button>
       <button onClick={() => setNeutral(neutral + 1)}>
         neutraali
       </button>
       <button onClick={() => setBad(bad + 1)}>
         huono
       </button>
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
