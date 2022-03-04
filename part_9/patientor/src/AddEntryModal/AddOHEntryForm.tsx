import React from "react";
import { Grid, Button } from "semantic-ui-react";
import { Field, Formik, Form } from "formik";

import { DiagnosisSelection, TextField,  } from "./EntryFormField";
import { EntryType, OccupationalHealthcareEntryFormValues } from "../types";
import { useStateValue } from "../state";

interface Props {
  onSubmit: (values: OccupationalHealthcareEntryFormValues) => void;
  onCancel: () => void;
}

export const AddOHEntryForm = ({ onSubmit, onCancel } : Props ) => {
  
  const [{  diagnoses }] = useStateValue(); 
  return (
    <Formik
      initialValues={{
        date: "",
        type: EntryType.OccupationalHealthcare,
        specialist: "",
        description: "", 
        employerName: "",
        sickLeave: {
          startDate: "", 
          endDate: ""
        }      
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
        console.log("---what is dirty---", dirty);
        console.log("---what is isValid---", isValid);
        return (
          <Form className="form ui">
            <Field
              label="Type"
              value="OccupationalHealthcare"
              name="type"
              component={TextField}
              disabled={true}
            />
            <Field
              label="Date"
              placeholder="YYYY-MM-DD"
              name="date"
              component={TextField}
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
              label="Employer name"
              placeholder="employerName"
              name="employerName"
              component={TextField}
            />
            <Field
              label="Sick leave start date"
              placeholder="YYYY-MM-DD"
              name="sickLeave.startDate"
              component={TextField}
            />
            <Field
              label="Sick leave end date"
              placeholder="YYYY-MM-DD"
              name="sickLeave.endDate"
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

export default AddOHEntryForm;
