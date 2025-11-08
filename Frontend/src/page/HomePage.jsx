import { useNavigate } from 'react-router';
export default function HomePage() {

    const navigate = useNavigate();
    return (
        <>
            <div className='grid'>
                <div className='card'>
                    <h2>Notes APP</h2>
                    <p>Add, Manage, Delete Notes</p>
                    <button onClick={() => navigate('/notes')}>Click to Open</button>
                </div>
            </div>
        </>
    )
}
