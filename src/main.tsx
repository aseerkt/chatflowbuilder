import React from 'react'
import ReactDOM from 'react-dom/client'
import 'reactflow/dist/style.css'
import App from './App.tsx'
import { Toaster } from './components/ui/toaster.tsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
    <Toaster />
  </React.StrictMode>,
)
