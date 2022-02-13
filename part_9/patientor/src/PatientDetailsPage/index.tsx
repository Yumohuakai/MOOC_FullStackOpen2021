import React from "react";
import { Header, Icon } from "semantic-ui-react";

import axios from "axios";
import { Patient } from "../types";
import { apiBaseUrl } from "../constants";
import { useStateValue } from "../state";
import { useParams } from 'react-router-dom';

const PatientDetailsPage = () => {
  const [{ patients }, dispatch] = useStateValue(); 
  const { id } = useParams<{ id: string }>();
  
  React.useEffect(() => { 

    const fetchPatientDetails = async (id: string) => {
      try {
        const { data: patientDetailsFromApi } = await axios.get<Patient>(
          `${apiBaseUrl}/patients/${id}`
        );
        dispatch({ type: "SET_ONE_PATIENT", payload: patientDetailsFromApi });
        // console.log('---what is patientDetailsFromApi---', patientDetailsFromApi);
      } catch (e) {
        console.error(e);
      }
    };
    void fetchPatientDetails(id);
  }, [dispatch]);
 
  // console.log('----waht is patients---', patients[id].name);

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
    </div>
  );
};

export default PatientDetailsPage;
