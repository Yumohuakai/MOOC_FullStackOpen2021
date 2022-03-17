import React, { useState } from "react";
import { Header, Icon, Segment, Menu } from "semantic-ui-react";

import axios from "axios";
import { 
  Patient, 
  Entry, 
  Diagnosis, 
  HealthCheckEntry, 
  HospitalEntry, 
  OccupationalHealthcareEntry, 
  EntryType,
  HealthCheckEntryFormValues,
  HospitalEntryFormValues,
  OccupationalHealthcareEntryFormValues
} from "../types";

import { apiBaseUrl } from "../constants";
import { useStateValue } from "../state";
import { useParams } from 'react-router-dom';
import { setOnePatient, addEntryToSelectedPatient } from "../state/reducer";
import { 
  AddOccupationalHealthcarEntryModal, 
  AddHospitalEntryModal, 
  AddHealthCheckEntryModal 
} from "../AddEntryModal";


 const HealthCheck = ({ entryInfo, diagnoses }: {entryInfo: HealthCheckEntry, diagnoses: { [code: string]: Diagnosis }}) => (
    <>
      <Segment>
        <Header as="h4"> 
          {entryInfo.date}   
          <Icon name='user md' />
        </Header>
        <Header as="h5"> {entryInfo.specialist} </Header>
        <p style={{color: "grey"}}><i> {entryInfo.description} </i></p>
        {
          entryInfo.diagnosisCodes
            ? <ul key={entryInfo.id}>
                {entryInfo.diagnosisCodes.map(d => <li key={d}> {d} - {diagnoses[d].name} </li>)}
              </ul>
            : null
        }
        <p> {
              entryInfo.healthCheckRating === 0
                ? <Icon color="green"  name='heart' />
                : entryInfo.healthCheckRating === 1
                  ? <Icon color="yellow"  name='heart' />
                    : entryInfo.healthCheckRating === 2
                      ? <Icon color="orange"  name='heart' />
                      : <Icon color="red"  name='heart' />
            } 
        </p>
      </Segment>
    </>
 );

 const Hospital = ({ entryInfo, diagnoses }: {entryInfo: HospitalEntry, diagnoses: { [code: string]: Diagnosis }}) => (
    <>
      <Segment>
        <Header as="h4"> 
          {entryInfo.date}   
          <Icon name='hospital' />
        </Header>
        <Header as="h5"> {entryInfo.specialist} </Header>
        <p style={{color: "grey"}}><i> {entryInfo.description} </i></p>
        {
          entryInfo.diagnosisCodes
            ? <ul key={entryInfo.id}>
                {entryInfo.diagnosisCodes.map(d => <li key={d}> {d} - {diagnoses[d].name} </li>)}
              </ul>
            : null
        }
        <p> 
          <Icon name='flag checkered' />
          {entryInfo.discharge.date}: {entryInfo.discharge.criteria} 
        </p>
      </Segment>
    </>
);

const OccupationalHealthcare = ({ entryInfo, diagnoses }: {entryInfo: OccupationalHealthcareEntry, diagnoses: { [code: string]: Diagnosis }}) => (
  <>
    <Segment>
        <Header as="h4"> 
          {entryInfo.date}   
          <Icon name='stethoscope' />
          {entryInfo.employerName}
        </Header>
        <Header as="h5"> {entryInfo.specialist} </Header>
        <p style={{color: "grey"}}><i> {entryInfo.description} </i></p>
        {
          entryInfo.diagnosisCodes
            ? <ul key={entryInfo.id}>
                {entryInfo.diagnosisCodes.map(d => <li key={d}> {d} - {diagnoses[d].name} </li>)}
              </ul>
            : null
        }
        {
          entryInfo.sickLeave
            ? <p>                
                <Icon name='calendar alternate' />                
                {entryInfo.sickLeave.startDate} ~ {entryInfo.sickLeave.endDate}
              </p>
            : null
        }
      </Segment>
  </>
);

/**
 * Helper function for exhaustive type checking
 */
 const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const EntryDetails = ({ entryInfo, diagnoses }: {entryInfo: Entry, diagnoses: { [code: string]: Diagnosis }}) => {
  switch(entryInfo.type) {
    case EntryType.HealthCheck:
      return <HealthCheck entryInfo={entryInfo} diagnoses={diagnoses} />;
      break;
    
    case EntryType.Hospital:
      return <Hospital entryInfo={entryInfo} diagnoses={diagnoses} />;
      break;
    
    case EntryType.OccupationalHealthcare:
      return <OccupationalHealthcare entryInfo={entryInfo} diagnoses={diagnoses} />;
      break;
    
    default:
      return assertNever(entryInfo);
  }
};

const PatientDetailsPage = () => {
  const [{ patients, diagnoses }, dispatch] = useStateValue(); 
  const { id } = useParams<{ id: string }>();  

  const [modalOpen, setModalOpen] = useState<boolean>(false); 
  const [error, setError] = useState<string | undefined>();
  const [typeOfEntry, setTypeOfEntry] = useState<string>("");
  
  const openModal = (): void => setModalOpen(true);

  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

  const handleItemClick = (name: string) => {
    // console.log("---what is selected type---", name);
    setTypeOfEntry(name);
    openModal();
  };
  
  React.useEffect(() => { 

    const fetchPatientDetails = async (id: string) => {
      try {
        const { data: patientDetailsFromApi } = await axios.get<Patient>(
          `${apiBaseUrl}/patients/${id}`
        );
        
        dispatch(setOnePatient(patientDetailsFromApi));
      } catch (e) {
        console.error(e);
      }
    };
    void fetchPatientDetails(id);
  }, [dispatch]);

  const submitNewEntry = async (
    values: OccupationalHealthcareEntryFormValues 
    | HospitalEntryFormValues 
    | HealthCheckEntryFormValues 
  ) => {
     try {
      const { data: selectedPatient } = await axios.post<Patient>(
        `${apiBaseUrl}/patients/${id}/entries`,
        values
      );
      // console.log("---what is values---PatientDetailsPage-index.tsx---", values);
      dispatch(addEntryToSelectedPatient(selectedPatient));
      closeModal();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
      console.error(e.response?.data || 'Unknown Error');
      setError(e.response?.data?.message || 'Unknown error');
      // setError(e.response?.data?.error || 'Unknown error');
    }
  };

  return (
    <div className="App">
      <Header as="h1">
        {patients[id].name}  
        {
          patients[id].gender === 'male'
            ? <Icon name='mars' />
            : patients[id].gender === 'female'
              ? <Icon name='venus' />
              : <Icon name='neuter' />
        }
      </Header>
      <Header as="h4">
        ssn: {patients[id].ssn} 
      </Header>
      <Header as="h4">
        occupation: {patients[id].occupation} 
      </Header>

      {patients[id].entries
        ? patients[id].entries.length !== 0 
          ? <Header as="h3"> entries </Header>
          : null
        : null
      } 

      {patients[id].entries 
        ? patients[id].entries.map(e =>
          <EntryDetails key={e.id} entryInfo={e} diagnoses={diagnoses}/>
        )
        : null
      } 

      {
        typeOfEntry === 'HealthCheck'
          ? <AddHealthCheckEntryModal
              modalOpen={modalOpen}
              onSubmit={submitNewEntry}
              error={error}
              onClose={closeModal}
            />
          : null
      }

      {
        typeOfEntry === 'Hospital'
          ? <AddHospitalEntryModal
              modalOpen={modalOpen}
              onSubmit={submitNewEntry}
              error={error}
              onClose={closeModal}
            />
          : null
      }

      {
        typeOfEntry === 'OccupationalHealthcare'
          ? <AddOccupationalHealthcarEntryModal
              modalOpen={modalOpen}
              onSubmit={submitNewEntry}
              error={error}
              onClose={closeModal}
            />
          : null
      }
      
      <Header as="h4"> Please pick a type to create entry: </Header>
      <Menu>
        <Menu.Item
          name='HealthCheck'
          active={typeOfEntry === 'HealthCheck'}
          onClick={() => handleItemClick('HealthCheck')}
        >
          HealthCheck
        </Menu.Item>

        <Menu.Item
          name='Hospital'
          active={typeOfEntry === 'Hospital'}
          onClick={() => handleItemClick('Hospital')}
        >
          Hospital
        </Menu.Item>

        <Menu.Item
          name='OccupationalHealthcare'
          active={typeOfEntry === 'OccupationalHealthcare'}
          onClick={() => handleItemClick('OccupationalHealthcare')}
        >
          OccupationalHealthcare
        </Menu.Item>
      </Menu>
      
      {/* <Button onClick={() => openModal()}>Add New Entry</Button> */}
    </div>
  );
};

export default PatientDetailsPage;
