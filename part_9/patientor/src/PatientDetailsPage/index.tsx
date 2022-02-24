import React from "react";
import { Header, Icon } from "semantic-ui-react";

import axios from "axios";
import { Patient } from "../types";
import { apiBaseUrl } from "../constants";
import { useStateValue } from "../state";
import { useParams } from 'react-router-dom';
import { setOnePatient } from "../state/reducer";


const PatientDetailsPage = () => {
  const [{ patients }, dispatch] = useStateValue(); 
  const { id } = useParams<{ id: string }>();
  
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
//  console.log("---what is entries---", patients[id].entries);
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
      <p>
        ssn: {patients[id].ssn} 
      </p>
      <p>
        occupation: {patients[id].occupation} 
      </p>

      {patients[id].entries
        ? patients[id].entries.length !== 0 
          ? <h3> entries </h3> 
          : null
        : null
      } 
      
      {patients[id].entries 
        ? patients[id].entries.map(e =>
          <p key={e.id}> {e.date} {e.description} </p>
        )
        : null
      } 

      {patients[id].entries 
        ? patients[id].entries.map(e =>
            e.diagnosisCodes
            ? <ul key={e.id}>
                {e.diagnosisCodes.map(d => <li key={d}> {d} </li>)}
              </ul>
            : null
        )
        : null
      }      

    </div>
  );
};

export default PatientDetailsPage;
