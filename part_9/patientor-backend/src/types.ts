export enum Gender {
    Male = 'male',
    Female = 'female',
    Other = 'other',
}

export interface Diagnose {
    code: string;
    name: string;
    latin?: string;
}

export interface PatientOrigin {
    id: string;
    name: string;
    dateOfBirth: string;
    ssn: string;
    gender: Gender;
    occupation: string;
}

export type Patient = Omit<PatientOrigin, 'ssn'>;

export type NewPatient = Omit<PatientOrigin, 'id'>;