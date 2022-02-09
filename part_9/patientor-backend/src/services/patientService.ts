import patients from '../../data/patients.json';
import { Patient } from '../types';

const getPatients = (): Array<Patient> => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};


const addPatient = () => {
  return null;
};

export default {
    getPatients,
    addPatient
};