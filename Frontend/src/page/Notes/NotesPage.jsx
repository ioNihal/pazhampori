import { useState } from 'react';
import styles from './NotesPage.module.css'
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function NotesPage() {

    const [notes, setNotes] = useState([]);
    const navigate = useNavigate();
    const [selectionMode, setSelectionMode] = useState(false);
    const [selectedNotes, setSelectedNotes] = useState([]);

    const fetchNotes = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/notes`);
            const data = await response.json();
            setNotes(data);
        } catch (error) {
            console.error('Error fetching notes:', error);
        }
    }

    useEffect(() => {
        fetchNotes();
    }, [])

    const handleSelectNote = (noteId) => {
        setSelectedNotes(prevSelected => {
            if (prevSelected.includes(noteId)) {
                return prevSelected.filter(id => id !== noteId);
            } else {
                return [...prevSelected, noteId];
            }
        });
    }

    const handleDelete = async (mode) => {
        let ids = [];
        if (mode === "selected") {
            ids = selectedNotes;
        } else if (mode === "all") {
            ids = notes.map(note => note.id);
        }
        try {
            await fetch(`${import.meta.env.VITE_API_URL}/notes`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ ids }),
            });
            fetchNotes();
            setSelectedNotes([]);
            setSelectionMode(false);
        } catch (error) {
            console.error('Error deleting all notes:', error);
        }
    }

    return (
        <div>
            <div className={styles.container}>
                <div className={styles.actions}>
                    <button onClick={() => navigate('/notes/add')}>Add New note</button>
                    <button onClick={() => setSelectionMode(prev => !prev)}>Select Notes</button>
                    <button
                         onClick={() => handleDelete(selectionMode ? "selected" : "all")}>
                        {selectionMode ?
                            `Deletet ${selectedNotes.length} notes`
                            : 'Delete All notes'}</button>
                </div>

                <div className={styles.grid}>
                    {notes.sort((a, b) => a.id - b.id).map((note) => selectionMode ? (
                        <div key={note.id} className={styles.selectableCard}>
                            <input type="checkbox" onChange={() => handleSelectNote(note.id)} />
                            <h3>{note.title}</h3>
                            <p>{note.content}</p>
                        </div>) : (
                        <div key={note.id} className={styles.card} onClick={() => navigate(`/notes/${note.id}`)}>
                            <h3>{note.title}</h3>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
