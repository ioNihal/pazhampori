import { useEffect } from 'react';
import styles from './NotesViewPage.module.css';
import { useNavigate, useParams } from 'react-router-dom';
import { useState } from 'react';

export default function NotesViewPage() {

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

    const handleEdit = () => {
        navigate(`/notes/edit/${id}`);
    }

    const handleDelete = async () => {
        try {
            await fetch(`${import.meta.env.VITE_API_URL}/notes/${id}`, {
                method: 'DELETE',
            });
        } catch (error) {
            console.error('Error deleting note:', error);
        } finally {
            navigate('/notes');
        }
    }

    return (
        <div className={styles.container}>
            <div className={styles.actions}>
                <button onClick={() => navigate(-1)}>Back</button>
                <button onClick={handleEdit}>Edit</button>
                <button onClick={handleDelete}>Delete</button>
            </div>
            {note && (
                <div className={styles.card}>
                    {note && (
                        <>
                            <h2>{note.title}</h2>
                            <p className={styles.content}>{note.content}</p>
                        </>
                    )}
                </div>
            )}
        </div>
    )
}
