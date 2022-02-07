// The two different imports for express work at different environments,
// because the command 'npm install --save-dev ts-node' installs the version 10.4.0 of ts-node, 
// but the package 'ts-node-dev' uses version 9.1.1 of ts-node, so finally I changed the version of ts-node from 10.4.0 to 9.1.1:

// import express from 'express';   //this line works for 'npm start' (ts-node: 10.4.0)
import * as express from 'express'; //this line works for 'npm run dev', ts-node-dev ver. 1.1.8 (using ts-node ver. 9.1.1, typescript ver. 4.5.5)
import { parseArguments, calculateBmi } from './bmiCalculator'
const app = express();


app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  // console.log('----what is req----', req.query)
  
  try {
    const { value1, value2 } = parseArguments(req.query);
    // console.log(calculateBmi(value1, value2));
    res.send(
      {
        weight: value2,
        height: value1,
        bmi: calculateBmi(value1, value2)
      }
    );

  } catch (error: unknown) {
    let errorMessage = 'Something bad happened.'
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