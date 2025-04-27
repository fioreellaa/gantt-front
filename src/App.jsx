import { lazy, Suspense  } from 'react'
import{
  BrowserRouter as Router,
  Routes,
  Route
}from 'react-router-dom'

function App() {
  
  const GanttPage = lazy(()=> import("./pages/GanttPage"))
  return (
    <>
    
      <Router>
        <Suspense fallback={<div>Cargando...</div>}>
        <div className="w-full min-h-[60vh] p-4">
          <Routes>
            <Route path='/' element={<GanttPage />} />
          </Routes>
          </div>  
        </Suspense>
      </Router>
      
    </>
  )
}

export default App
