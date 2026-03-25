import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { CVProvider } from './context/CVContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <CVProvider>
      <App />
    </CVProvider>
  </StrictMode>,
)
