import express from 'express';
import patientRouter from './routes/patientRoute';
import diagnosisRoute from './routes/diagnosisRoute';
import cors from 'cors';
const app = express();
app.use(express.json());

// eslint-disable-next-line @typescript-eslint/no-unsafe-call
app.use(cors());

const PORT = 3001;

app.get('/api/ping', (_req, res) => {
  console.log('ping............');
  res.send('pong');
});


app.use('/api/patients', patientRouter);
app.use('/api/diagnoses', diagnosisRoute);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});