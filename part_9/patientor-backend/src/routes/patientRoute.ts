import express from 'express';
import patientService from '../services/patientService';
import toNewPatient from '../utils';

const patientR = express.Router();

patientR.get('/', (_req, res) => {
    // res.send('Fetching all patients!');
    res.send(patientService.getPatients());

});

// patientR.post('/', (_req, res) => {
//   res.send('Saving a patient!');
// });

// patientR.post('/', (req, res) => {
//   /* eslint-disable @typescript-eslint/no-unsafe-assignment */
//   const { name, dateOfBirth, gender, occupation, ssn } = req.body;
//   const newPatient = patientService.addPatient({
//     name,
//     dateOfBirth,
//     gender,
//     occupation,
//     ssn,
//   });
//   res.json(newPatient);
// });


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