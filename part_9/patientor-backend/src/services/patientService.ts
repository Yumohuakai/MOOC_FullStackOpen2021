import rawPatients from '../../data/patients.json';
import { PatientOrigin, Patient, NewPatient } from '../types';
import toNewPatient from "../utils";
import {v1 as uuid} from 'uuid';

// because we use the enum for Gender, 
// we have to map the initial data elements to PatientOrigin type with the toNewPatient function
const formattedPatients = ():  Array<PatientOrigin> => {
  return rawPatients.map(obj => {
    const object = toNewPatient(obj) as PatientOrigin;
    object.id = obj.id;
    return object;
    });
};



const getPatients = (): Array<Patient> => {
  
  return formattedPatients().map(({ id, name, dateOfBirth, gender, occupation, entries }) => ({
      id,
      name,
      dateOfBirth,
      gender,
      occupation,
      entries
    }));
};


const findById = (id: string): Patient | undefined => {
  const entry = formattedPatients().find(p => p.id === id);
  return entry;
};


const addPatient = ( entry: NewPatient ): Patient => {
  
  const newPatient = {
    id: uuid(),
    ...entry
  };

  rawPatients.push(newPatient);
  return newPatient;
};

export default {
    getPatients,
    findById,
    addPatient
};