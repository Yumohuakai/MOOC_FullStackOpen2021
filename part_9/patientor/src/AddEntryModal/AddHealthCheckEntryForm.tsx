import React from "react";
import { Grid, Button } from "semantic-ui-react";
import { Field, Formik, Form } from "formik";

import { 
  DiagnosisSelection, 
  TextField, 
  HealthCheckRatingTypeOption, 
  HealthCheckRatingSelectField 
} from "./EntryFormField";
import { 
  EntryType,
  HealthCheckRating,
  HealthCheckEntryFormValues 
} from "../types";
import { useStateValue } from "../state";

interface Props {
  onSubmit: (values: HealthCheckEntryFormValues) => void;
  onCancel: () => void;
}

const healthCheckRatingOptions: HealthCheckRatingTypeOption[] = [
  { value: HealthCheckRating.Healthy, label: "Healthy" },
  { value: HealthCheckRating.LowRisk, label: "LowRisk" },
  { value: HealthCheckRating.HighRisk, label: "HighRisk" },
  { value: HealthCheckRating.CriticalRisk, label: "CriticalRisk" }
];

export const AddHealthCheckEntryForm = ({ onSubmit, onCancel } : Props ) => {
  
  const [{  diagnoses }] = useStateValue(); 
  return (
    <Formik
      initialValues={{
        date: "",
        type: EntryType.HealthCheck,
        specialist: "",
        description: "",
        healthCheckRating: HealthCheckRating.Healthy
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
        return errors;
      }}
    >
      {({ isValid, dirty, setFieldValue, setFieldTouched }) => {
        return (
          <Form className="form ui">
            <Field
              label="Type"
              value="HealthCheck"
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

            <HealthCheckRatingSelectField
              label="Health Check Rating"
              name="healthCheckRating"
              options={healthCheckRatingOptions}
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

export default AddHealthCheckEntryForm;
