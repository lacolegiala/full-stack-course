import React from 'react'

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

export default Course