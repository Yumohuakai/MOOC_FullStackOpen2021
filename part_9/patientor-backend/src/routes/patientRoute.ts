import express from 'express';
import patientService from '../services/patientService';
import toNewPatient from '../utils';

import { 
  // toNewEntry, 
  parseDateField, 
  toNewHealthCheckEntry,
  toNewHospitalEntry,
  toNewOccupationalHealthcareEntry 
} from '../utils';

import { 
  PatientOrigin, 
  Diagnosis,
  NewOccupationalHealthcareEntry 
} from '../types';

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
    // res.status(400).send("Something went wrong. Error: the patient is not exist...");  
    res.status(400).json({message: "Something went wrong. Error: the patient is not exist."});  
  }
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
    // res.status(400).send(errorMessage);
    res.status(400).json({message: errorMessage});
  }
});


patientR.post('/:id/entries', (req, res) => {
  
  const patient = patientService.findById(req.params.id);
  if (!patient) {
    // res.sendStatus(404);
    // res.status(400).send("Something went wrong. Error: the patient is not exist.");   
    res.status(400).json({message: "Something went wrong. Error: the patient is not exist."});   
  } 
  console.log("---patientRoute.ts---post---req.body---", req.body);

  try {
    let newBody = null;
    let newSickLeave = null;
    
    if (req.body.diagnosisCodes) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const {diagnosisCodes, ...y} = req.body;

      if (y.sickLeave && y.sickLeave.startDate && y.sickLeave.endDate) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        const {sickLeave, ...x} = y;
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        newBody = x;
        newSickLeave = { 
          startDate: parseDateField(sickLeave.startDate, "startDate"),          
          endDate: parseDateField(sickLeave.endDate, "endDate")
        };
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        const newEntry = toNewOccupationalHealthcareEntry(newBody);
        
        const addedEntryWithDianosisToPatient = patientService.addEntriesToPatient(
          patient as PatientOrigin, 
            { ...newEntry, 
              diagnosisCodes: diagnosisCodes as Array<Diagnosis['code']>,
              sickLeave: newSickLeave
            } as NewOccupationalHealthcareEntry
        );
        console.log("---patientRoute.ts---post---patientService--1---", addedEntryWithDianosisToPatient);
        res.json(addedEntryWithDianosisToPatient);
      } else {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        newBody = y;
        if (newBody.type === "HealthCheck") {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
          const newEntry = toNewHealthCheckEntry(y);
          const addedEntryWithDianosisToPatient = patientService.addEntriesToPatient(
            patient as PatientOrigin, 
              { ...newEntry, 
                diagnosisCodes: diagnosisCodes as Array<Diagnosis['code']>
              }
          );
          console.log("---patientRoute.ts---post---patientService--2---", addedEntryWithDianosisToPatient);
          res.json(addedEntryWithDianosisToPatient);
        }

        if (newBody.type === "Hospital") {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
          const newEntry = toNewHospitalEntry(y);
          const addedEntryWithDianosisToPatient = patientService.addEntriesToPatient(
            patient as PatientOrigin, 
              { ...newEntry, 
                diagnosisCodes: diagnosisCodes as Array<Diagnosis['code']>
              }
          );
          console.log("---patientRoute.ts---post---patientService--3---", addedEntryWithDianosisToPatient);
          res.json(addedEntryWithDianosisToPatient);
        }

        if (newBody.type === "OccupationalHealthcare") {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
          const newEntry = toNewOccupationalHealthcareEntry(y);
          
          const addedEntryWithDianosisToPatient = patientService.addEntriesToPatient(
            patient as PatientOrigin, 
              { ...newEntry,
                diagnosisCodes: diagnosisCodes as Array<Diagnosis['code']>
              } as NewOccupationalHealthcareEntry
          );
          console.log("---patientRoute.ts---post---patientService--4---", addedEntryWithDianosisToPatient);
          res.json(addedEntryWithDianosisToPatient);
        }
        
      }
         
    } else {
      if (req.body.sickLeave && req.body.sickLeave.startDate && req.body.sickLeave.endDate) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        const {sickLeave, ...x} = req.body;
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        newBody = x;
        newSickLeave = { 
          startDate: parseDateField(sickLeave.startDate, "startDate"),          
          endDate: parseDateField(sickLeave.endDate, "endDate")
        };
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        const newEntry = toNewOccupationalHealthcareEntry(newBody);
        
        const addedEntryWithDianosisToPatient = patientService.addEntriesToPatient(
          patient as PatientOrigin, 
            { ...newEntry, 
              sickLeave: newSickLeave
            } as NewOccupationalHealthcareEntry
        );
        console.log("---patientRoute.ts---post---patientService--5---", addedEntryWithDianosisToPatient);
        res.json(addedEntryWithDianosisToPatient);
      } else {
        if (req.body.type === "HealthCheck") {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
          const newEntry = toNewHealthCheckEntry(req.body);
          const addedEntryWithDianosisToPatient = patientService.addEntriesToPatient(
            patient as PatientOrigin, 
              { ...newEntry }
          );
          console.log("---patientRoute.ts---post---patientService--6---", addedEntryWithDianosisToPatient);
          res.json(addedEntryWithDianosisToPatient);
        }

        if (req.body.type === "Hospital") {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
          const newEntry = toNewHospitalEntry(req.body);
          const addedEntryWithDianosisToPatient = patientService.addEntriesToPatient(
            patient as PatientOrigin, 
              { ...newEntry }
          );
          console.log("---patientRoute.ts---post---patientService--7---", addedEntryWithDianosisToPatient);
          res.json(addedEntryWithDianosisToPatient);
        }

        if (req.body.type === "OccupationalHealthcare") {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
          const newEntry = toNewOccupationalHealthcareEntry(req.body);
          
          const addedEntryWithDianosisToPatient = patientService.addEntriesToPatient(
            patient as PatientOrigin, 
              { ...newEntry
              } as NewOccupationalHealthcareEntry
          );
          console.log("---patientRoute.ts---post---patientService--8---", addedEntryWithDianosisToPatient);
          res.json(addedEntryWithDianosisToPatient);
        }
        
      }
     
    }
    
  } catch (error: unknown) {
    let errorMessage = 'Something went wrong.';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    // res.status(400).send(errorMessage);
    res.status(400).json({message: errorMessage});
  }
  
});



export default patientR;