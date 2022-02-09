import { Gender, NewPatient } from './types';

const isString = (text: unknown): text is string => {
    return typeof text === 'string' || text instanceof String;
};

const parseStringField = (fieldValue: unknown, fieldName: string): string => {
    if (!fieldValue || !isString(fieldValue)) {
        throw new Error('Incorrect or missing' + fieldName);
    }
    return fieldValue;
};

const isDate = (date: string): boolean => {
    // console.log('---------what happened to date------', Date.parse(date));
    return Boolean(Date.parse(date));
};
  
const parseDateField = (date: unknown): string => {
    if ((!date || !isString(date) || !isDate(date)) || (isString(date) && date.length !== 10)) {
        throw new Error('Incorrect or missing date of birth: ' + date);
    }
    return date;
};


// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isGender = (param: any): param is Gender => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    return Object.values(Gender).includes(param);
  };
  
const parseGender = (gender: unknown): Gender => {
    if (!gender || !isGender(gender)) {
        throw new Error('Incorrect or missing gender: ' + gender);
    }
    return gender;
};

type Fields = { name: unknown, dateOfBirth: unknown, gender: unknown, occupation: unknown, ssn: unknown };

const toNewPatient = ({ name, dateOfBirth, gender, occupation, ssn } : Fields): NewPatient => {
    const newPatient: NewPatient = {
      name: parseStringField(name, "name"),
      dateOfBirth: parseDateField(dateOfBirth),
      gender: parseGender(gender),
      occupation: parseStringField(occupation, "occupation"),
      ssn: parseStringField(ssn, "ssn")
    };
  
    return newPatient;
};

export default toNewPatient;