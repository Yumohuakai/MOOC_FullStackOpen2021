import diagnoses from '../../data/diagnoses.json';
import { Diagnosis } from '../types';

const getDiagnoses = (): Array<Diagnosis> => {
  return diagnoses;
};


const addDiagnosis = () => {
  return null;
};

export default {
    getDiagnoses,
    addDiagnosis
};