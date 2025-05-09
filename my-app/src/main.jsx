import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import { SupabaseProvider } from './supabase/index.js'
import { UserProvider } from './context/userContext.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <SupabaseProvider>
      <UserProvider>
        <App />
      </UserProvider>
    </SupabaseProvider>
  </BrowserRouter>,
)
