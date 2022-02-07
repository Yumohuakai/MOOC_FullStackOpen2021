import express from 'express';   
// import express = require('express');
import { parseArguments, calculateBmi } from './bmiCalculator';
const app = express();


app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  // console.log('----what is req----', req.query)
  
  try {
    const { value1, value2 } = parseArguments({height: req.query.height as string, weight: req.query.weight as string});
    // console.log(calculateBmi(value1, value2));
    res.send(
      {
        weight: value2,
        height: value1,
        bmi: calculateBmi(value1, value2)
      }
    );

  } catch (error: unknown) {
    let errorMessage = 'Something bad happened.';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    console.log(errorMessage);
    
    // console.log('-----------what is error------', error);
    if (error) {
      res.status(400);
      res.send({ error: "malformatted parameters" });
    }
  }
  
});

const PORT = 3002;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});