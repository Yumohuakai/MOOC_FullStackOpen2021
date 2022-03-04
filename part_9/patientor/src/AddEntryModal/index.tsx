import React from 'react';
import { Modal, Segment } from 'semantic-ui-react';
import { 
  HealthCheckEntryFormValues,
  HospitalEntryFormValues,
  OccupationalHealthcareEntryFormValues
} from "../types";
import { AddOHEntryForm } from './AddOHEntryForm';
import { AddHospitalEntryForm } from './AddHospitalEntryForm';
import { AddHealthCheckEntryForm } from './AddHealthCheckEntryForm';

interface OccupationalHealthcareEntryProps {
  modalOpen: boolean;
  onClose: () => void;
  onSubmit: (values: OccupationalHealthcareEntryFormValues) => void;
  error?: string;
}

export const AddOccupationalHealthcarEntryModal = ({ modalOpen, onClose, onSubmit, error }: OccupationalHealthcareEntryProps) => (
  <Modal open={modalOpen} onClose={onClose} centered={false} closeIcon>
    <Modal.Header>Add a new entry</Modal.Header>
    <Modal.Content>
      {error && <Segment inverted color="red">{`Error: ${error}`}</Segment>}
      <AddOHEntryForm onSubmit={onSubmit} onCancel={onClose} />
    </Modal.Content>
  </Modal>
);


interface HospitalEntryProps {
  modalOpen: boolean;
  onClose: () => void;
  onSubmit: (values: HospitalEntryFormValues) => void;
  error?: string;
}

export const AddHospitalEntryModal = ({ modalOpen, onClose, onSubmit, error }: HospitalEntryProps) => (
  <Modal open={modalOpen} onClose={onClose} centered={false} closeIcon>
    <Modal.Header>Add a new entry</Modal.Header>
    <Modal.Content>
      {error && <Segment inverted color="red">{`Error: ${error}`}</Segment>}
      <AddHospitalEntryForm onSubmit={onSubmit} onCancel={onClose} />
    </Modal.Content>
  </Modal>
);


interface HealthCheckEntryProps {
  modalOpen: boolean;
  onClose: () => void;
  onSubmit: (values: HealthCheckEntryFormValues) => void;
  error?: string;
}

export const AddHealthCheckEntryModal = ({ modalOpen, onClose, onSubmit, error }: HealthCheckEntryProps) => (
  <Modal open={modalOpen} onClose={onClose} centered={false} closeIcon>
    <Modal.Header>Add a new entry</Modal.Header>
    <Modal.Content>
      {error && <Segment inverted color="red">{`Error: ${error}`}</Segment>}
      <AddHealthCheckEntryForm onSubmit={onSubmit} onCancel={onClose} />
    </Modal.Content>
  </Modal>
);
