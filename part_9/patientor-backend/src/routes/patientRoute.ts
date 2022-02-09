import express from 'express';
import patientService from '../services/patientService';

const patientR = express.Router();

patientR.get('/', (_req, res) => {
    // res.send('Fetching all patients!');
    res.send(patientService.getPatients());

});

patientR.post('/', (_req, res) => {
  res.send('Saving a patient!');
});

export default patientR;