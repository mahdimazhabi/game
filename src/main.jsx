import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import "./FirebaseConfiguration.css"
import FirebaseConfiguration from './FirebaseConfiguration.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <FirebaseConfiguration />
  </StrictMode>,
)
