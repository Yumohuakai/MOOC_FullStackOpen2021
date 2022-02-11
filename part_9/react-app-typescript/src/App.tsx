import React from 'react';

const Header = ({ courseName }: { courseName: string }) => (
  <h1>{courseName}</h1>
);

const Total = ({ totalNumber }: { totalNumber: number }) => (
  <p>
    Number of exercises{" "} {totalNumber}
  </p>
);

// new types
interface CoursePartBase {
  name: string;
  exerciseCount: number;
  type: string;
}

interface CoursePartBaseDes  extends CoursePartBase {  
  description: string;
}

interface CourseNormalPart extends CoursePartBaseDes {
  type: "normal";
}
interface CourseProjectPart extends CoursePartBase {
  type: "groupProject";
  groupProjectCount: number;
}

interface CourseSubmissionPart extends CoursePartBaseDes {
  type: "submission";
  exerciseSubmissionLink: string;
}

interface CourseSpecialPart extends CoursePartBaseDes {
  type: "special";
  requirements: Array<string>;
}

type CoursePart = CourseNormalPart | CourseProjectPart | CourseSubmissionPart | CourseSpecialPart;


interface PartProps {
  name: string;
  exerciseCount: number;  
  type?: string;
  description?: string;
  groupProjectCount?: number;
  exerciseSubmissionLink?: string;
  requirements?: Array<string>;
}

/**
 * Helper function for exhaustive type checking
 */
 const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const Content = ({ contentArray }: { contentArray: CoursePart[] }) => (
  <>
    {
      contentArray.map(part => {
        switch(part.type) {
          case "normal":
            return (<Part key={part.name} 
                          name={part.name}
                          exerciseCount={part.exerciseCount}
                          description={part.description}
                    />);
            break;
          case "groupProject":
            return (<Part key={part.name} 
                          name={part.name}
                          exerciseCount={part.exerciseCount}
                          groupProjectCount={part.groupProjectCount}
                    />);
            break;
          case "submission":
            return (<Part key={part.name} 
                          name={part.name}
                          exerciseCount={part.exerciseCount}
                          description={part.description}
                          exerciseSubmissionLink={part.exerciseSubmissionLink}
                    />);
            break;
          case "special":
            return (<Part key={part.name} 
                          name={part.name}
                          exerciseCount={part.exerciseCount}                          
                          description={part.description}
                          requirements={part.requirements}
                    />);
            break;
          default:
            return assertNever(part);
        }
      })
    }
  </>                          
);

const Part = ({ name, exerciseCount, description, groupProjectCount, exerciseSubmissionLink, requirements }: PartProps) => (
  <>
    <h3> {name} {exerciseCount} </h3>
    {
      description
        ? <p><i><b> {description} </b></i></p>
        : null
    }
    {
      groupProjectCount 
        ? <p> project exercises{" "} {groupProjectCount} </p>
        : null
    }
    {
      exerciseSubmissionLink 
        ? <p> submit to{" "} {exerciseSubmissionLink} </p>
        : null
    }
    {
      requirements 
        ? <p> required skills:{" "} {requirements.join(', ')} </p>
        : null
    }
     
     <br></br>    
  </>
);

const App = () => {
  const courseName = "Half Stack application development";

  // this is the new coursePart variable
  const courseParts: CoursePart[] = [
    {
      name: "Fundamentals",
      exerciseCount: 10,
      description: "This is the leisured course part",
      type: "normal"
    },
    {
      name: "Advanced",
      exerciseCount: 7,
      description: "This is the harded course part",
      type: "normal"
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7,
      groupProjectCount: 3,
      type: "groupProject"
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14,
      description: "Confusing description",
      exerciseSubmissionLink: "https://fake-exercise-submit.made-up-url.dev",
      type: "submission"
    },
    {
      name: "Backend development",
      exerciseCount: 21,
      description: "Typing the backend",
      requirements: ["nodejs", "jest"],
      type: "special"
    }
  ]
  const totalNumber = courseParts.reduce((carry, part) => carry + part.exerciseCount, 0);

  return (
    <div>
      <Header courseName={courseName} />
      <Content contentArray={courseParts} />   
      <Total totalNumber={totalNumber} />
    </div>
  );
};

export default App;