import React from "react";
import ReactDOM from "react-dom";

interface HeaderProps {
  title: string
}

interface ContentProps {
  name: string,
  numberOfExercises: number
}

interface TotalProps {
  totalNumberOfExercises: number
}

const Header: React.FC<HeaderProps> = (props) => {
  return <h1>{props.title}</h1>
}

const Content: React.FC<ContentProps> = (props) => {
  return (
    <p>
      <div>{props.name}</div>
      <div>{props.numberOfExercises}</div>
    </p>
  )
}

const Total: React.FC<TotalProps> = (props) => {
  return (
    <div>Number of exercises {props.totalNumberOfExercises}</div>
  )
}

const App: React.FC = () => {
  const courseName = "Half Stack application development";
  const courseParts = [
    {
      name: "Fundamentals",
      exerciseCount: 10
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14
    }
  ];

  const totalNumberOfExercises = courseParts.reduce((carry, part) => carry + part.exerciseCount, 0)

  return (
    <div>
      <Header title={courseName}></Header>
      <Content name={courseParts[0].name} numberOfExercises={courseParts[0].exerciseCount}></Content>
      <Content name={courseParts[1].name} numberOfExercises={courseParts[1].exerciseCount}></Content>
      <Content name={courseParts[2].name} numberOfExercises={courseParts[2].exerciseCount}></Content>
      <Total totalNumberOfExercises={totalNumberOfExercises}></Total>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));