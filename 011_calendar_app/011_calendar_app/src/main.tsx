import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import CalendarPage from './pages/CalendarPage.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <CalendarPage />
  </StrictMode>,
)
