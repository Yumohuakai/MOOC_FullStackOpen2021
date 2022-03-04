import React from "react";
import { ErrorMessage, Field, FieldProps, FormikProps } from "formik";
import { Dropdown, DropdownProps, Form } from "semantic-ui-react";
import { Diagnosis, EntryType, HealthCheckRating } from "../types";


//-------------------------for exercises 9.23  - selectField for entry type---------------------------------
  
export type EntryTypeOption = {
    value: EntryType;
    label: string;
  };
  
  type EntryTypeSelectFieldProps = {
    name: string;
    label: string;
    options: EntryTypeOption[];
  };
  
  export const EntryTypeSelectField = ({
    name,
    label,
    options
  }: EntryTypeSelectFieldProps) => (
    <Form.Field>
      <label>{label}</label>
      <Field as="select" name={name} className="ui dropdown">
        {options.map(option => (
          <option key={option.value} value={option.value}>
            {option.label || option.value}
          </option>
        ))}
      </Field>
    </Form.Field>
  );

//-------------------------------------------------------------------------------------------------------------

//-------------------------for exercises 9.26 - 9.27  - selectField for HealthCheckRating type-----------------
  
export type HealthCheckRatingTypeOption = {
  value: HealthCheckRating;
  label: string;
};

type HealthCheckRatingSelectFieldProps = {
  name: string;
  label: string;
  options: HealthCheckRatingTypeOption[];
};

export const HealthCheckRatingSelectField = ({
  name,
  label,
  options
}: HealthCheckRatingSelectFieldProps) => (
  <Form.Field>
    <label>{label}</label>
    <Field as="select" name={name} className="ui dropdown">
      {options.map(option => (
        <option key={option.value} value={option.value}>
          {option.label || option.value}
        </option>
      ))}
    </Field>
  </Form.Field>
);

//--------------------------------------------------------------------------------------------------------------

interface TextProps extends FieldProps {
  label: string;
  placeholder: string;
  disabled: boolean;
}

export const TextField= ({
  field,
  label,
  placeholder,
  disabled
}: TextProps) => (
  <Form.Field>
    <label>{label}</label>
    <Field placeholder={placeholder} {...field} disabled={disabled} />
    <div style={{ color:'red' }}>
      <ErrorMessage name={field.name} />
    </div>
  </Form.Field>
);


/*
  for exercises 9.24.-
*/
interface NumberProps extends FieldProps {
  label: string;
  errorMessage?: string;
  min: number;
  max: number;
}

export const NumberField = ({ field, label, min, max } : NumberProps ) => (
  <Form.Field>
    <label>{label}</label>
    <Field {...field} type='number' min={min} max={max} />

    <div style={{ color:'red' }}>
      <ErrorMessage name={field.name} />
    </div>
  </Form.Field>
);


// interface SickLeaveProps extends FieldProps {
//   label: string;
//   placeholder: string;
// }

// export const SickLeaveField= ({  
//     setFieldValue,
//     setFieldTouched
//   }: {
//     setFieldValue: FormikProps<{ sickLeave: string }>["setFieldValue"];
//     setFieldTouched: FormikProps<{ sickLeave: string }>["setFieldTouched"];
//   }) => {
//     const field = "sickLeave";
//     const onChange = (
//       _event: React.SyntheticEvent<HTMLElement, Event>,
//       data: DropdownProps
//     ) => {
//       setFieldTouched(field, true);
//       setFieldValue(field, data.value);
//     };

//   return (
//     <Form.Field>
//       <label>{label}</label>
//       <Field placeholder={placeholder} {...field} />
//       <div style={{ color:'red' }}>
//         <ErrorMessage name={field.name} />
//       </div>
//     </Form.Field>
//   )
  
// );



export const DiagnosisSelection = ({
  diagnoses,
  setFieldValue,
  setFieldTouched
}: {
  diagnoses: Diagnosis[];
  setFieldValue: FormikProps<{ diagnosisCodes: string[] }>["setFieldValue"];
  setFieldTouched: FormikProps<{ diagnosisCodes: string[] }>["setFieldTouched"];
}) => {
  const field = "diagnosisCodes";
  const onChange = (
    _event: React.SyntheticEvent<HTMLElement, Event>,
    data: DropdownProps
  ) => {
    setFieldTouched(field, true);
    setFieldValue(field, data.value);
  };

  const stateOptions = diagnoses.map(diagnosis => ({
    key: diagnosis.code,
    text: `${diagnosis.name} (${diagnosis.code})`,
    value: diagnosis.code
  }));

  return (
    <Form.Field>
      <label>Diagnoses</label>
      <Dropdown
        fluid
        multiple
        search
        selection
        options={stateOptions}
        onChange={onChange}
      />
      <ErrorMessage name={field} />
    </Form.Field>
  );
};
