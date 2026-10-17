import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import AuthProvider from './context/AuthContext.jsx'
import { ToastContainer } from 'react-toastify'

createRoot(document.getElementById('root')).render(
    <AuthProvider>
     <ToastContainer position="top-right" autoClose={3000} />
        <App />
    </AuthProvider>
)
