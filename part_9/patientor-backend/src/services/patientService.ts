import patients from '../../data/patients.json';
import { PatientOrigin, Patient, NewPatient } from '../types';
import toNewPatient from "../utils";
import {v1 as uuid} from 'uuid';


// const getPatients = (): Array<Patient> => {
  // return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
  //   id,
  //   name,
  //   dateOfBirth,
  //   gender,
  //   occupation,
  // }));
// };

const getPatients = (): Array<Patient> => {
  // because we use the enum for Gender, we have to map the initial data elements to PatientOrigin type with the toNewPatient function
  return patients.map(obj => {
    const object = toNewPatient(obj) as PatientOrigin;
    object.id = obj.id;
    return object;
    }).map(({ id, name, dateOfBirth, gender, occupation }) => ({
      id,
      name,
      dateOfBirth,
      gender,
      occupation,
    }));
};


const addPatient = ( entry: NewPatient ): Patient => {
  
  const newPatient = {
    id: uuid(),
    ...entry
  };

  patients.push(newPatient);
  return newPatient;
};

export default {
    getPatients,
    addPatient
};