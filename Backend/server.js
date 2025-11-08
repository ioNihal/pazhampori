import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';
import { addNote, deleteMultipleNotes, deteleNote, readNotes, readSingleNoteById, updateNote } from './handlers/notesHandlers.js';


dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// const corsOptions = { origin: "https://ionihal.vercel.app", optionsSuccessStatus: 200 };

app.use(morgan("dev"));
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World!');
})


// getting notes from server
app.get('/notes', readNotes);

// getting single note from server
app.get('/notes/:id', readSingleNoteById);

// addding new note
app.post('/notes', addNote);

// updating a note
app.put('/notes/:id', updateNote);

// deleting a note
app.delete('/notes/:id', deteleNote);

// delete multiple notes
app.delete('/notes', deleteMultipleNotes);

app.listen(PORT, () => {
    console.log(`Server is listening on PORT: ${PORT}`)
})
