import React from "react";
import { Grid, Button } from "semantic-ui-react";
import { Field, Formik, Form } from "formik";

import { DiagnosisSelection, TextField } from "./EntryFormField";
import { EntryType, HospitalEntryFormValues } from "../types";
import { useStateValue } from "../state";

interface Props {
  onSubmit: (values: HospitalEntryFormValues) => void;
  onCancel: () => void;
}

export const AddHospitalEntryForm = ({ onSubmit, onCancel } : Props ) => {
  
  const [{  diagnoses }] = useStateValue(); 
  return (
    <Formik
      initialValues={{
        date: "",
        type: EntryType.Hospital,
        specialist: "",
        description: "",
        discharge: {
          date: "", 
          criteria: ""
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
        if (!values.discharge.date) {
          errors.discharge = requiredError;
        }
        if (!values.discharge.criteria) {
          errors.discharge = requiredError;
        }
        return errors;
      }}
    >
      {({ isValid, dirty, setFieldValue, setFieldTouched }) => {
        return (
          <Form className="form ui">
            <Field
              label="Type"
              value="Hospital"
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
              label="Discharge date"
              placeholder="YYYY-MM-DD"
              name="discharge.date"
              component={TextField}
            />
            <Field
              label="Discharge criteria"
              placeholder=""
              name="discharge.criteria"
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

export default AddHospitalEntryForm;
