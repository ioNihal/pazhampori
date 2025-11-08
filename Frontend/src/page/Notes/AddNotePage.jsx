import { useNavigate } from 'react-router-dom';
import styles from './AddNotePage.module.css';
import { useState } from 'react';

export default function AddNotePage() {

    const [note, setNote] = useState({
        id: '',
        title: '',
        content: ''
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNote({ ...note, [name]: value });
    }

    const getId = async () => {
        try {
            const response = await fetch('http://localhost:5000/notes');
            const data = await response.json();
            return data.length > 0 ? data[data.length - 1].id + 1 : 1;
        } catch (error) {
            console.error('Error fetching notes for ID generation:', error);
            return 1;
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newId = await getId();
        const newNote = { ...note, id: newId };
        try {
            await fetch('http://localhost:5000/notes', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newNote),
            });
        } catch (error) {
            console.error('Error adding note:', error);
        } finally {
            navigate('/notes');
        }
    }

    return (
        <div className={styles.container}>
            <h2>Add Note Page</h2>
            <form className={styles.form} onSubmit={handleSubmit}>
                <div className={styles.field}>
                    <label>Title:</label>
                    <input type="text" onChange={handleChange} name='title' value={note.title} />
                </div>
                <div className={styles.field}>
                    <label>Content:</label>
                    <textarea onChange={handleChange} name='content' value={note.content}></textarea>
                </div>
                <button type="submit" className={styles.button}>Add Note</button>
            </form>
        </div>
    )
}
