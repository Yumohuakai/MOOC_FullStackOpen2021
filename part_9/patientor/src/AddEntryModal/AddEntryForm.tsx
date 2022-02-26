import React from "react";
import { Grid, Button } from "semantic-ui-react";
import { Field, Formik, Form } from "formik";

import { DiagnosisSelection, TextField, EntryTypeSelectField, EntryTypeOption } from "./EntryFormField";
import { EntryType, Entry, OccupationalHealthcareEntry } from "../types";
import { useStateValue } from "../state";

/*
 * use type Entry 
 * (the union of types: HospitalEntry, OccupationalHealthcareEntry, HealthCheckEntry ), 
 * but omit id, because it is irrelevant for new entry object.
 */
export type EntryFormValues = Omit<Entry, "id">;

// interface Props {
//   onSubmit: (values: EntryFormValues) => void;
//   onCancel: () => void;
// }


export type OccupationalHealthcareEntryFormValues = Omit<OccupationalHealthcareEntry, "id">;

interface OccupationalHealthcareEntryProps {
  onSubmit: (values: OccupationalHealthcareEntryFormValues) => void;
  onCancel: () => void;
}

const entryTypeOptions: EntryTypeOption[] = [
  { value: EntryType.HealthCheck, label: "HealthCheck" },
  { value: EntryType.Hospital, label: "Hospital" },
  { value: EntryType.OccupationalHealthcare, label: "OccupationalHealthcare" }
];

export const AddOccupationalHealthcareEntryForm = ({ onSubmit, onCancel } : OccupationalHealthcareEntryProps ) => {
  
  const [{  diagnoses }] = useStateValue(); 
  return (
    <Formik
      initialValues={{
        date: "",
        type: EntryType.OccupationalHealthcare,
        specialist: "",
        description: "", 
        employerName: ""        
      }}
      onSubmit={onSubmit}
      validate={values => {
        const requiredError = "Field is required";
        const errors: { [field: string]: string } = {};
        if (!values.date) {
          errors.date = requiredError;
        }
        if (!values.specialist) {
          errors.specialist = requiredError;
        }
        if (!values.description) {
          errors.description = requiredError;
        }
        if (!values.employerName) {
          errors.employerName = requiredError;
        }
        return errors;
      }}
    >
      {({ isValid, dirty, setFieldValue, setFieldTouched }) => {
        return (
          <Form className="form ui">
            <Field
              label="Date"
              placeholder="YYYY-MM-DD"
              name="date"
              component={TextField}
            />
            <EntryTypeSelectField
              label="Type"
              name="type"
              options={entryTypeOptions}
            />
            <Field
              label="Specialist"
              placeholder="Specialist"
              name="specialist"
              component={TextField}
            />
            <Field
              label="Description"
              placeholder="description"
              name="description"
              component={TextField}
            />
            <Field
              label="Employer Name"
              placeholder="employerName"
              name="employerName"
              component={TextField}
            />
            
            <DiagnosisSelection
              diagnoses={Object.values(diagnoses)}              
              setFieldValue={setFieldValue}
              setFieldTouched={setFieldTouched}
            />
            
            <Grid>
              <Grid.Column floated="left" width={5}>
                <Button type="button" onClick={onCancel} color="red">
                  Cancel
                </Button>
              </Grid.Column>
              <Grid.Column floated="right" width={5}>
                <Button
                  type="submit"
                  floated="right"
                  color="green"
                  disabled={!dirty || !isValid}
                >
                  Add
                </Button>
              </Grid.Column>
            </Grid>
          </Form>
        );
      }}
    </Formik>
  );
};

// export default AddEntryForm;
