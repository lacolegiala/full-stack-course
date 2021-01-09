import React from "react";
import ReactDOM from "react-dom";

interface CoursePart {
  name: string,
  exerciseCount: number
}

interface HeaderProps {
  title: string
}

interface ContentProps {
  courses: CoursePart[]
}

// interface TotalProps {
//   totalNumberOfExercises: number
// }

const Header: React.FC<HeaderProps> = (props: HeaderProps) => {
  return <h1>{props.title}</h1>
}

const Content: React.FC<ContentProps> = (props: ContentProps) => {
  return (
    <p>
      {props.courses.map(part =>
        <div key={part.name}>
          {part.name}
          {part.exerciseCount}
        </div>
      )}
    </p>
  )
}

const Total: React.FC<ContentProps> = (props: ContentProps) => {
  const totalNumberOfExercises = props.courses.reduce((carry, part) => carry + part.exerciseCount, 0)

  return (
    <div>Number of exercises {totalNumberOfExercises}</div>
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

  return (
    <div>
      <Header title={courseName}></Header>
      <Content courses={courseParts}></Content>
      <Total courses={courseParts}></Total>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));