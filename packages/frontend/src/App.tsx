import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route path="/" element={<div className="flex items-center justify-center h-screen"><h1 className="text-4xl font-bold">Welcome to NOTE</h1></div>} />
          {/* TODO: Add routes for login, dashboard, classes, students, feedback, etc. */}
        </Routes>
      </Router>
    </QueryClientProvider>
  )
}

export default App
