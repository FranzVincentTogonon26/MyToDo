import { useAuth } from "./context/useAuth"
import { Loader } from "lucide-react";
import { BrowserRouter, Navigate, Route, Routes } from 'react-router'
import LoginPage from './pages/components/Authentication/LoginPage'
import RegisterPage from './pages/components/Authentication/RegisterPage'
import ProtectedRoutes from './pages/components/Authentication/ProtectedRoutes'
import Notes from './pages/Note/Notes'
import Calendars from "./pages/Calendar/Calendars";
import UpdateNote from "./pages/Note/UpdateNote.jsx";


function App() {

  const { loading, isAuthenticated } = useAuth();

  if(loading){
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="animate-spin" />
      </div>
    )
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={ isAuthenticated ? <Navigate to='/notes' replace /> : <Navigate to='/login' replace /> }  />
        <Route path="/login" element={ <LoginPage /> } />
        <Route path="/register" element={ <RegisterPage /> } />

        {/* Protected Routes */}
        <Route element={ <ProtectedRoutes /> }>
          <Route path="/notes" element={ <Notes /> } />
          <Route path="/notes/:id" element={ <UpdateNote /> } />
          <Route path="/calendars" element={ <Calendars /> } />
        </Route>

      </Routes>
    </BrowserRouter>
  )
}

export default App
