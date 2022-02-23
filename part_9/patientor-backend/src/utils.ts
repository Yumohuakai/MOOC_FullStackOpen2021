import { Entry, Gender, NewPatient } from './types';

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

const parseSsn = (ssn: unknown, birthDate: string): string => {
    const pssn = parseStringField(ssn, "ssn");
   
    const sday: string = pssn.slice(0,2);
    const smon: string = pssn.slice(2,4);
    const syear: string = pssn.slice(4,6);
    
    const byear: string = birthDate.slice(2,4);
    const bmon: string = birthDate.slice(5,7);
    const bday: string = birthDate.slice(8,10);

    if (sday !== bday || smon !== bmon || syear !== byear) {
        throw new Error('Incorrect SSN: date of birth and SSN do not match: ' + ssn + ' VS. ' + birthDate);
     }

    return pssn;
};

type Fields = { name: unknown, dateOfBirth: unknown, gender: unknown, occupation: unknown, ssn: unknown, entries: Entry[] };

const toNewPatient = ({ name, dateOfBirth, gender, occupation, ssn, entries } : Fields): NewPatient => {
    const newPatient: NewPatient = {
      name: parseStringField(name, "name"),
      dateOfBirth: parseDateField(dateOfBirth),
      gender: parseGender(gender),
      occupation: parseStringField(occupation, "occupation"),
      ssn: parseSsn(ssn, parseDateField(dateOfBirth)),      
      entries
    };
  
    return newPatient;
};

export default toNewPatient;