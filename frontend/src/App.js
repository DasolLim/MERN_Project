// Used for handling routing in a React application
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
// Simple way to toast notification in a React app
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
// Components from specific file paths
import Header from './components/Header'
import Main from './pages/Main'
import Dashboard from './pages/Dashboard'
import Login from './pages/Login'
import Register from './pages/Register'

// App is the functional component in react
function App() {
  return (
    <>
      <Router>
        <div className='container'>
          <Header />
          {/* Define multiple routes in the application */}
          <Routes>
            {/* Set the default route to Main */}
            <Route path='/' element={<Main />} />
            <Route path='/dashboard' element={<Dashboard />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
          </Routes>
        </div>
      </Router>
      {/* Used to display toast notifications */}
      <ToastContainer />
    </>
  );
}

export default App;