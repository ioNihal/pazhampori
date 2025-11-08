import { StrictMode } from 'react'
import { createBrowserRouter } from "react-router";
import { RouterProvider } from 'react-router';
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import NotesPage from './page/Notes/NotesPage.jsx';
import HomePage from './page/HomePage.jsx';
import NotesViewPage from './page/Notes/NotesViewPage.jsx';
import EditNotePage from './page/Notes/EditNotePage.jsx';
import AddNotePage from './page/Notes/AddNotePage.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <HomePage />
      },
      {
        path: "/notes",
        element: <NotesPage />
      },
      {
        path: "/notes/:id",
        element: <NotesViewPage />
      },
      {
        path: "/notes/edit/:id",
        element: <EditNotePage />
      },
      {
        path: "/notes/add",
        element: <AddNotePage />
      },
    ]
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
