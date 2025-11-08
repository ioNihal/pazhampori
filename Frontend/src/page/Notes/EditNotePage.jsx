import { useNavigate, useParams } from 'react-router-dom';
import styles from './EditNotePage.module.css';
import { useState } from 'react';
import { useEffect } from 'react';

export default function EditNotePage() {

    const { id } = useParams()
    const [note, setNote] = useState(null);

    const navigate = useNavigate();

    const fetchNote = async (noteId) => {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/notes/${noteId}`);
            const data = await response.json();
            setNote(data);
        } catch (error) {
            console.error('Error fetching note:', error);
        }
    }

    useEffect(() => {
        fetchNote(id);
    }, [id])

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await fetch(`${import.meta.env.VITE_API_URL}/notes/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(note),
            });
        } catch (error) {
            console.error('Error updating note:', error);
        } finally {
            navigate(`/notes/${id}`);
        }
    }

    return (
        <div className={styles.container}>
            <form className={styles.form} onSubmit={handleSubmit}>
                {note && (
                    <>
                        <div className={styles.field}>
                            <label>Title:</label>
                            <input
                                type="text"
                                value={note.title}
                                onChange={(e) => setNote({ ...note, title: e.target.value })}
                            />
                        </div>
                        <div className={styles.field}>
                            <label>Content:</label>
                            <textarea
                                value={note.content}
                                onChange={(e) => setNote({ ...note, content: e.target.value })}
                            />
                        </div>
                        <button type="submit">Save</button>
                    </>
                )}
            </form>
        </div>
    )
}
