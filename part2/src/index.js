import React from 'react'
import ReactDOM from 'react-dom'

const Header = (props) => {
  return (
    <h1>
      {props.course.name}  
    </h1>
  )
}



const Part = (props) => {
  return (
    <p>
      {props.part.name} {props.part.exercises}
    </p>
  )
 }
 

const Content = (props) => {
  return (
    <div>
      <Part
        part={props.parts[0]} 
      />
      <Part
        part={props.parts[1]}
      />
      <Part
        part={props.parts[2]}
      />
    </div>
  )
}

const Course = (props) => {
  return (
    <div>
      <Header course={props.course}></Header>
      <Content parts={props.course.parts}> </Content>
    </div>
  )
}

const Total = (props) => {
  return (
    <p>
      yhteensä {props.parts[0].exercises
      + props.parts[1].exercises
      + props.parts[2].exercises} tehtävää
    </p>
  )
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    id: 1,
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      },
      {
        name: 'Rendering and modules',
        exercises: 8,
        id:4
      }
    ]
  }

  return (
    <div>
      <Course course={course} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))