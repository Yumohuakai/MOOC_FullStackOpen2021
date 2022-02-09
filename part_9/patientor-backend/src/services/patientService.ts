import patients from '../../data/patients.json';
import { Patient, NewPatient } from '../types';
import {v1 as uuid} from 'uuid';


const getPatients = (): Array<Patient> => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};


const addPatient = ( entry: NewPatient ): Patient => {
  
  const newPatient = {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    id: uuid() as string,
    ...entry
  };

  patients.push(newPatient);
  return newPatient;
};

export default {
    getPatients,
    addPatient
};