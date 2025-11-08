
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { readFile, writeFile } from 'fs/promises';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const filePath = path.join(__dirname, '../data/notes.json')

export async function readNotes(req, res) {
    try {
        const data = await readFile(filePath, 'utf8');
        const notes = JSON.parse(data);
        res.json(notes);
    } catch (err) {
        console.error('Error: ', err);
        res.status(500).json({ error: "Error loading notes!" });
    }
}

export async function readSingleNoteById(req, res) {
    try {
        const data = await readFile(filePath, 'utf8');
        const notes = JSON.parse(data);

        const noteId = parseInt(req.params.id);
        const note = notes.find(n => n.id === noteId);
        if (!note) return res.status(401).json({ error: 'Note not found' });

        res.json(note);
    } catch (err) {
        console.error('Error: ', err);
        res.status(500).json({ error: "Error loading note!" });
    }
}

export async function addNote(req, res) {
    try {
        const data = await readFile(filePath, 'utf8');
        const notes = JSON.parse(data);

        const newNote = req.body;

        notes.push(newNote);

        await writeFile(filePath, JSON.stringify(notes, null, 2));

        res.status(201).json({ message: "Note added", note: newNote });
    } catch (err) {
        console.error('Write error:', err);
        res.status(500).json({ error: 'Failed to write note' });
    }
}

export async function updateNote(req, res) {
    try {
        const data = await readFile(filePath, 'utf8');
        const notes = JSON.parse(data);

        const updatedFields = req.body;
        const noteId = parseInt(req.params.id);

        const noteIndex = notes.findIndex(note => note.id === noteId);
        if (noteIndex === -1) return res.status(404).json({ error: "Note not found!" });

        notes[noteIndex] = { ...notes[noteIndex], ...updatedFields };

        await writeFile(filePath, JSON.stringify(notes, null, 2));

        res.json({ message: "Note updated", note: notes[noteIndex] })
    } catch (err) {
        console.log("Write error:", err);
        res.status(500).json({ error: "Failed to update note" });
    }
}

export async function deteleNote(req, res) {
    try {
        const data = await readFile(filePath, 'utf8');
        const notes = JSON.parse(data);

        const noteId = parseInt(req.params.id);

        const noteIndex = notes.findIndex(note => note.id === noteId)
        if (noteId === -1) return res.status(404).json({ error: "Note not found!" });

        const deteledNote = notes.splice(noteIndex, 1)[0];

        await writeFile(filePath, JSON.stringify(notes, null, 2));

        res.json({ message: "Note Deleted!", note: deteledNote })

    } catch (err) {
        console.error('Delete error:', err);
        res.status(500).json({ error: 'Failed to delete note' });
    }
}

export async function deleteMultipleNotes(req, res) {
    try {
        const data = await readFile(filePath, 'utf8');
        const notes = JSON.parse(data);

        const idsToDelete = req.body.ids.map(id => parseInt(id)) || [];

        if (idsToDelete.length === 0) {
            return res.status(400).json({ error: 'No IDs provided for deletion' });
        }

        const intialLength = notes.length;

        const remainingNotes = notes.filter(note => !idsToDelete.includes(note.id));

        const deletedCount = intialLength - remainingNotes.length;

        if (deletedCount === 0) {
            return res.status(404).json({ error: 'No matching notes found to delete' });
        }

        await writeFile(filePath, JSON.stringify(remainingNotes, null, 2));

        res.json({
            message: `${deletedCount} note(s) deleted`,
        });
    } catch (err) {
        console.error('Delete error:', err);
        res.status(500).json({ error: 'Failed to delete notes' });
    }
}