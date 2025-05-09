import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { SupabaseProvider } from './supabase/index.js'
import { AuthProvider } from './context/AuthContext.jsx';

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <SupabaseProvider>
      <AuthProvider> 
        <App />
      </AuthProvider>
    </SupabaseProvider>
  </BrowserRouter>
)
