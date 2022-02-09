import express from 'express';
import patientService from '../services/patientService';

const patientR = express.Router();

patientR.get('/', (_req, res) => {
    // res.send('Fetching all patients!');
    res.send(patientService.getPatients());

});

// patientR.post('/', (_req, res) => {
//   res.send('Saving a patient!');
// });

patientR.post('/', (req, res) => {
  /* eslint-disable @typescript-eslint/no-unsafe-assignment */
  const { name, dateOfBirth, gender, occupation, ssn } = req.body;
  const newPatient = patientService.addPatient({
    name,
    dateOfBirth,
    gender,
    occupation,
    ssn,
  });
  res.json(newPatient);
});

export default patientR;