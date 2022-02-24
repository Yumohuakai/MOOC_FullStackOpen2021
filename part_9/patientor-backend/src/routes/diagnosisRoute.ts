import express from 'express';
import diagnosisService from '../services/diagnosisService';

const diagnosisR = express.Router();

diagnosisR.get('/', (_req, res) => {
    // res.send('Fetching all diagnoses!');
    res.send(diagnosisService.getDiagnoses());

});

diagnosisR.post('/', (_req, res) => {
  res.send('Saving a diagnosis!');
});

export default diagnosisR;