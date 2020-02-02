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
  const { parts } = props
  return (
    <div>
      {parts.map(part =>
        <Part
          key={part.id} part={part}>
        </Part>
      )}
    </div>
  )
}

const Course = (props) => {
  return (
    <div>
      <Header course={props.course}></Header>
      <Content parts={props.course.parts}></Content>
      <Total parts={props.course.parts}></Total>
    </div>
  )
}

const Total = (props) => {
  const {parts} = props
  const total =
    parts.reduce( (accumulator, currentValue) => accumulator + currentValue.exercises, 0)
  return (
    <p>
      Total of {total} exercises
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