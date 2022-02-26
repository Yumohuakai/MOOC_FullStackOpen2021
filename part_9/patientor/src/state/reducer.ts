import { State } from "./state";
import { Patient, Diagnosis } from "../types";

export type Action =
| {
    type: "SET_DIAGNOSIS_LIST";
    payload: Diagnosis[];
  }
| {
    type: "SET_PATIENT_LIST";
    payload: Patient[];
  }
| {
    type: "ADD_PATIENT";
    payload: Patient;
  }
| {
    type: "SET_ONE_PATIENT";
    payload: Patient;
  }
| {
    type: "ADD_ENTRY_TO_PATIENT";
    payload: Patient;
  };

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_DIAGNOSIS_LIST":
      return {
        ...state,
        diagnoses: {
          ...action.payload.reduce(
            (memo, diagnosis) => ({ ...memo, [diagnosis.code]: diagnosis }),
            {}
          ),
          ...state.diagnoses
        }
      };
    case "SET_PATIENT_LIST":
      return {
        ...state,
        patients: {
          ...action.payload.reduce(
            (memo, patient) => ({ ...memo, [patient.id]: patient }),
            {}
          ),
          ...state.patients
        }
      };
    case "ADD_PATIENT":
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload
        }
      };
    case "SET_ONE_PATIENT":
      // console.log('----reducer.ts---what is state.patients[action.payload.id].ssn---', state.patients[action.payload.id].ssn);
      if (state.patients[action.payload.id].ssn) {
        // console.log("----clicked patient----------");
        return { ...state };
      }
      
      // console.log("----new patient----------");
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload
        }
      };
    case "ADD_ENTRY_TO_PATIENT":
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload
        }
      };
    default:
      return state;
  }
};

export const setDiagnosisList = (diagnosisList: Diagnosis[]): Action => {
  return {type: "SET_DIAGNOSIS_LIST", payload: diagnosisList};
};

export const setPatientList = (patientList: Patient[]): Action => {
  return {type: "SET_PATIENT_LIST", payload: patientList};
};

export const addPatient = (newPatient: Patient): Action => {
  return {type: "ADD_PATIENT", payload: newPatient};
};

export const setOnePatient = (selectedPatient: Patient): Action => {
  return {type: "SET_ONE_PATIENT", payload: selectedPatient};
};

export const addEntryToSelectedPatient = (selectedPatient: Patient): Action => {
  return {type: "ADD_ENTRY_TO_PATIENT", payload: selectedPatient};
};
