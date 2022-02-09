export interface Diagnose {
    code: string;
    name: string;
    latin?: string;
}

interface PatientOrigin {
    id: string;
    name: string;
    dateOfBirth: string;
    ssn: string;
    gender: string;
    occupation: string;
}

export type Patient = Omit<PatientOrigin, 'ssn'>;