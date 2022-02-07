import express = require('express');
import { parseArguments, calculateBmi } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';
const app = express();
app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  
  try {
    const { value1, value2 } = parseArguments({
      height: req.query.height as string, 
      weight: req.query.weight as string
    });

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
    
    if (error) {
      res.status(400);
      res.send({ error: "malformatted parameters" });
    }
  }
  
});

app.post('/exercises', (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const body = req.body;

  try {

    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    if (!body.target || !body.daily_exercises) {
      res.status(400).json({ 
        error: 'parameters missing' 
      });
      throw new Error('Not enough parameters!');
    }


    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    const target = Number(req.body.target as number);
    if (isNaN(target)) {
      res.status(400).json({
        error: "malformatted parameters"
      });
      throw new Error('Provided value was not a number!');
    } 
    
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    const daily_exercises: Array<number> = req.body.daily_exercises as Array<number>;
    if (daily_exercises.length === 0) {
      res.status(400).json({ 
        error: 'parameters missing' 
      });        

      throw new Error('Not enough parameters!');
    }
    daily_exercises.map((e: number) => {
      if (isNaN(Number(e))) {
        res.status(400).json({
          error: "malformatted parameters"
        });
        throw new Error('Provided values were not numbers!');
      }
    });

    const result = (calculateExercises(daily_exercises, target));
    res.send(result);
  } catch (error) {
    let errorMessage = 'Something bad happened.';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    console.log(errorMessage);
  }
  
});

const PORT = 3002;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});