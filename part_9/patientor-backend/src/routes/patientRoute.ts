import express from 'express';
import patientService from '../services/patientService';
import toNewPatient from '../utils';
import { toNewEntry } from '../utils';
import { PatientOrigin, Diagnosis } from '../types';

const patientR = express.Router();

patientR.get('/', (_req, res) => {
    res.send(patientService.getPatients());
});

patientR.get('/:id', (req, res) => {
  const patient = patientService.findById(req.params.id);

  if (patient) {
    res.send(patient);
  } else {
    // res.sendStatus(404);
    res.status(400).send("Something went wrong. Error: the patient is not exist...");  
  }
});


patientR.post('/', (req, res) => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const newPatient = toNewPatient(req.body);
    // console.log("-----patientoute.ts-----what is req.body---", req.body);

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


patientR.post('/:id/entries', (req, res) => {
  
  const patient = patientService.findById(req.params.id);
  if (!patient) {
    // res.sendStatus(404);
    res.status(400).send("Something went wrong. Error: the patient is not exist...");      
  } 

  
  console.log("-----patientoute.ts--/:id/entries---what is req.body---", req.body);

  try {
    let newBody = null;
    if (req.body.diagnosisCodes) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const {diagnosisCodes, ...y} = req.body;
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      newBody = y;
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      const newEntry = toNewEntry(newBody);      
      console.log("-----patientoute.ts--/:id/entries---what is newEntry-1--", newEntry);

      if (newEntry) {
        const addedEntryWithDianosisToPatient = patientService.addEntriesToPatient(
            patient as PatientOrigin, 
            { ...newEntry, diagnosisCodes: diagnosisCodes as Array<Diagnosis['code']>}
        );

        res.json(addedEntryWithDianosisToPatient);
      } else {
        res.status(400).send("Something went wrong. Error: the entry type is not correct...");
      }
      
      
    } else {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      const newEntry = toNewEntry(req.body);
      console.log("-----patientoute.ts--/:id/entries---what is newEntry-2--", newEntry);
      
      if (newEntry) {
        const addedEntryToPatient = patientService.addEntriesToPatient(
            patient as PatientOrigin, 
            newEntry
        );

        res.json(addedEntryToPatient);
      } else {
        res.status(400).send("Something went wrong. Error: the entry type is not correct...");
      }      
    }
    
  } catch (error: unknown) {
    let errorMessage = 'Something went wrong.';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    res.status(400).send(errorMessage);
  }
});



export default patientR;