// import rawPatients from '../../data/oldVersionOfPatients.json';
import patients from '../../data/patients';
import { 
  PatientOrigin, 
  Patient, 
  NewPatient, 
  NewHealthCheckEntry,
  NewHospitalEntry,
  NewOccupationalHealthcareEntry,
  // NewEntry 
} from '../types';
import toNewPatient from "../utils";
import {v1 as uuid} from 'uuid';

// because we use the enum for Gender, also for the validation purpose
// we have to map the initial data elements to PatientOrigin type with the toNewPatient function
// this part is only used before exercise 9.19 starts
// const formattedPatients = ():  Array<PatientOrigin> => {
//   return rawPatients.map(obj => {
//     const object = toNewPatient(obj) as PatientOrigin;
//     object.id = obj.id;
//     return object;
//     });
// };

// validation all fields (except entries) of patients by calling 'toNewPatient'
const formattedPatients = ():  Array<PatientOrigin> => {
  return patients.map(obj => {
    const object = toNewPatient(obj) as PatientOrigin;
    object.id = obj.id;
    return object;
    });
};



const getPatients = (): Array<Patient> => {
  
  return formattedPatients().map(({ id, name, dateOfBirth, gender, occupation }) => ({
      id,
      name,
      dateOfBirth,
      gender,
      occupation
    }));
};


const findById = (id: string): PatientOrigin | undefined => {
  const entry = formattedPatients().find(p => p.id === id);
  return entry;
};


const addPatient = ( entry: NewPatient ): Patient => {
  
  const newPatient = {
    id: uuid(),
    ...entry
  };

  patients.push(newPatient);
  return newPatient;
};


const addEntriesToPatient = ( 
      patient: PatientOrigin, 
      // entry: NewEntry
      entry: NewHealthCheckEntry | NewHospitalEntry | NewOccupationalHealthcareEntry

): PatientOrigin => {  
  const newEntry = {
    id: uuid(),
    ...entry
  };

  patient
    ? patient.entries.push(newEntry)
    : null;

  return patient;
};

export default {
    getPatients,
    findById,
    addPatient,
    addEntriesToPatient
};