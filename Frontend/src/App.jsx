import { Outlet, useNavigate } from 'react-router'
import './App.css'

function App() {

  const navigate = useNavigate();

  return (
    <>
      <header style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "1rem 2rem"
      }}>
        <h1>Pazhampori Industries</h1>
        <nav>
          <button onClick={() => navigate('/')}>Home</button>
        </nav>
      </header>


      <main>
        <Outlet />
      </main>
    </>
  )
}

export default App
