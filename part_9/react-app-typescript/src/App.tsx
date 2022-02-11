import React from 'react';

const Header = ({ courseName }: { courseName: string }) => (
  <h1>{courseName}</h1>
);

const Total = ({ totalNumber }: { totalNumber: number }) => (
  <p>
    Number of exercises{" "} {totalNumber}
  </p>
);

interface ContnetProps {
  contentArray: {
    name: string;
    exerciseCount: number;
  }[]
}

const Content : React.FC<ContnetProps> = ({ contentArray }) => (
  <>
    {contentArray.map((c) => <p key={c.name} > {c.name} {c.exerciseCount} </p>)}
  </>  
);

const App = () => {
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