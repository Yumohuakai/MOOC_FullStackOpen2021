import express from 'express';
import patientService from '../services/patientService';
import toNewPatient from '../utils';

const patientR = express.Router();

patientR.get('/', (_req, res) => {
    res.send(patientService.getPatients());

});

patientR.post('/', (req, res) => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const newPatient = toNewPatient(req.body);

    const addedEntry = patientService.addPatient(newPatient);
    res.json(addedEntry);
  } catch (error: unknown) {
    let errorMessage = 'Something went wrong.';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    res.status(400).send(errorMessage);
  }
});

export default patientR;