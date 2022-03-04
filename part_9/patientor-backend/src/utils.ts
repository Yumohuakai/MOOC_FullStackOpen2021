import { Entry, Gender, NewPatient, NewEntry, EntryType, HealthCheckRating, Discharge } from './types';

const isString = (text: unknown): text is string => {
    return typeof text === 'string' || text instanceof String;
};

const parseStringField = (fieldValue: unknown, fieldName: string): string => {
    if (!fieldValue || !isString(fieldValue)) {
        throw new Error('Incorrect or missing ' + fieldName);
    }
    return fieldValue;
};

const isDate = (date: string): boolean => {
    return Boolean(Date.parse(date));
};
  
export const parseDateField = (date: unknown, fieldName: string): string => {
    if ((!date || !isString(date) || !isDate(date)) || (isString(date) && date.length !== 10)) {
        throw new Error('Incorrect or missing '  + fieldName + " " + date);
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

type PatientFields = { name: unknown, dateOfBirth: unknown, gender: unknown, occupation: unknown, ssn: unknown, entries: Entry[] };

const toNewPatient = ({ name, dateOfBirth, gender, occupation, ssn, entries } : PatientFields): NewPatient => {
    const newPatient: NewPatient = {
      name: parseStringField(name, "name"),
      dateOfBirth: parseDateField(dateOfBirth, "dateOfBirth"),
      gender: parseGender(gender),
      occupation: parseStringField(occupation, "occupation"),
      ssn: parseSsn(ssn, parseDateField(dateOfBirth, "dateOfBirth")),      
      entries
    };
  
    return newPatient;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isEntryType = (param: any): param is EntryType => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    return Object.values(EntryType).includes(param);
  };
  
const parseEntryType_HealthCheck = (type: unknown): EntryType.HealthCheck => {
    if (!type || !isEntryType(type) || type !== EntryType.HealthCheck) {
        throw new Error('Incorrect or missing type of Entry: ' + type);
    }
    return type;
};

const isNumber = (number: string): boolean => {
    const n = parseInt(number);
    return typeof n === 'number';
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isHealthCheckRating = (param: any): param is HealthCheckRating => {
    if (!isNumber){
        throw new Error('Incorrect or missing healthCheckRating 1: ' + param);    
    }

    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    return Object.values(HealthCheckRating).includes(parseInt(param));
  };
  
const parseHealthCheckRating = (healthCheckRating: unknown): HealthCheckRating => {
    let r;
    if (isString(healthCheckRating)) {
        r = parseInt(healthCheckRating);
    } else {
        r = healthCheckRating;
    }

    if (( !r && r !==0 ) || !isHealthCheckRating(r)) {
        throw new Error('Incorrect or missing healthCheckRating 2: ' + r);
    }
    
    return r ;
};


type HealthCheckEntryFields = { date: unknown, type: unknown, specialist: unknown, description: unknown, healthCheckRating: unknown };

export const toNewHealthCheckEntry = ({ date, type, specialist, description, healthCheckRating } : HealthCheckEntryFields): NewEntry => {
    const newHealthCheckEntry: NewEntry = {
      date: parseDateField(date, "date"),
      type: parseEntryType_HealthCheck(type),
      specialist: parseStringField(specialist, "specialist"),
      description: parseStringField(description, "description"),
      healthCheckRating: parseHealthCheckRating(healthCheckRating),
    };
  
    return newHealthCheckEntry;
};

const parseEntryType_Hospital = (type: unknown): EntryType.Hospital => {
    if (!type || !isEntryType(type) || type !== EntryType.Hospital) {
        throw new Error('Incorrect or missing type of Entry: ' + type);
    }
    return type;
};

type DischargeFields  = { date: unknown, criteria: unknown };
const toNewDischarge = ({date, criteria}: DischargeFields): Discharge => {
    const newDischarge: Discharge = {
        date: parseDateField(date, "date"),
        criteria: parseStringField(criteria, "criteria")
    };
    return newDischarge;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type HospitalEntryFields = { date: unknown, type: unknown, specialist: unknown, description: unknown, discharge: any };

export const toNewHospitalEntry = ({ date, type, specialist, description, discharge } : HospitalEntryFields): NewEntry => {
    const newHospitalEntry: NewEntry = {
      date: parseDateField(date, "date"),
      type: parseEntryType_Hospital(type),
      specialist: parseStringField(specialist, "specialist"),
      description: parseStringField(description, "description"),
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      discharge: toNewDischarge(discharge),
    };
  
    return newHospitalEntry;
};

const parseEntryType_OccupationalHealthcare = (type: unknown): EntryType.OccupationalHealthcare => {
    if (!type || !isEntryType(type) || type !== EntryType.OccupationalHealthcare) {
        throw new Error('Incorrect or missing type of Entry: ' + type);
    }
    return type;
};

type OccupationalHealthcareEntryFields = { date: unknown, type: unknown, specialist: unknown, description: unknown, employerName: unknown };

export const toNewOccupationalHealthcareEntry = ({ date, type, specialist, description, employerName } : OccupationalHealthcareEntryFields): NewEntry => {
    const newOccupationalHealthcareEntry: NewEntry = {
      date: parseDateField(date, "date"),
      type: parseEntryType_OccupationalHealthcare(type),
      specialist: parseStringField(specialist, "specialist"),
      description: parseStringField(description, "description"),
      employerName: parseStringField(employerName, "employerName")
    };
  
    return newOccupationalHealthcareEntry;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const toNewEntry = (newEntry: any): NewEntry | undefined => {
    switch(newEntry.type) {
        case "HealthCheck":
            // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
            return toNewHealthCheckEntry(newEntry);
            break;
    
        case "Hospital":
            // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
            return toNewHospitalEntry(newEntry);
            break;

        case "OccupationalHealthcare":
            // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
            return toNewOccupationalHealthcareEntry(newEntry);
            break;

        default:
            return undefined;    
    }
};

export default toNewPatient;