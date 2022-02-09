import express from 'express';
import diagnoseService from '../services/diagnoseService';

const diagnoseR = express.Router();

diagnoseR.get('/', (_req, res) => {
    // res.send('Fetching all diagnoses!');
    res.send(diagnoseService.getDiagnoses());

});

diagnoseR.post('/', (_req, res) => {
  res.send('Saving a diagnose!');
});

export default diagnoseR;