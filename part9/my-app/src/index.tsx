import React from "react";
import ReactDOM from "react-dom";

interface CoursePartBase {
  name: string,
  exerciseCount: number
}

interface CoursePartOne extends CoursePartBase {
  name: "Fundamentals";
  description: string;
}

interface CoursePartTwo extends CoursePartBase {
  name: "Using props to pass data";
  groupProjectCount: number;
}

interface CoursePartThree extends CoursePartBase {
  name: "Deeper type usage";
  description: string;
  exerciseSubmissionLink: string;
}

type CoursePart = CoursePartOne | CoursePartTwo | CoursePartThree

interface HeaderProps {
  title: string
}

interface ContentProps {
  courses: CoursePart[]
}

interface PartProps {
  coursePart: CoursePart
}

const Header: React.FC<HeaderProps> = (props: HeaderProps) => {
  return <h1>{props.title}</h1>
}

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const Part: React.FC<PartProps> = (props: PartProps) => {

  switch (props.coursePart.name) {
    case "Fundamentals":
      return (
        <div>
          {props.coursePart.name}
          {props.coursePart.exerciseCount}
          {props.coursePart.description}
        </div>
      )
    case "Using props to pass data":
      return (
        <div>
          {props.coursePart.name}
          {props.coursePart.exerciseCount}
          {props.coursePart.groupProjectCount}
        </div>
      )
    case "Deeper type usage":
      return (
        <div>
          {props.coursePart.name}
          {props.coursePart.exerciseCount}
          {props.coursePart.description}
          {props.coursePart.exerciseSubmissionLink}
        </div>
      )
    default:
      return assertNever(props.coursePart);
  }
}

const Content: React.FC<ContentProps> = (props) => {

  return (
    <div>
      {props.courses.map(part => 
        <div key={part.name}>
          <Part coursePart={part}></Part>
        </div>
      )}
    </div>
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
  const courseParts: CoursePart[] = [
    {
      name: "Fundamentals",
      exerciseCount: 10,
      description: "This is an awesome course part"
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7,
      groupProjectCount: 3
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14,
      description: "Confusing description",
      exerciseSubmissionLink: "https://fake-exercise-submit.made-up-url.dev"
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