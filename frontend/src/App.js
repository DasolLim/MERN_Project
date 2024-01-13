// Used for handling routing in a React application
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useSelector } from 'react-redux';
// Simple way to toast notification in a React app
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
// Components from specific file paths
import Header from './components/Header'
import Home from './pages/Home'
import Search from './pages/Search'
import Dashboard from './pages/Dashboard'
import Login from './pages/Login'
import Register from './pages/Register'
import Admin from './pages/Admin';
import PrivacyPolicy from './copyright/PrivacyPolicy';
import AUP from './copyright/AUP';
import DMCANotice from './copyright/DMCANotice';

// App is the functional component in react
function App() {

  const { user } = useSelector((state) => state.auth);

  return (
    <>
      <Router>
        <div className='container'>
          <Header />
          {/* Define multiple routes in the application */}
          <Routes>
            {/* Set the default route to Main */}
            <Route path='/' element={<Home />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/AUP" element={<AUP />} />
            <Route path="/DMCA" element={<DMCANotice />} />
            <Route path='/search' element={<Search />} />
            <Route path='/dashboard' element={<Dashboard />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/admin' element={<Admin />} />
          </Routes>
        </div>
      </Router>
      {/* Used to display toast notifications */}
      <ToastContainer />
    </>
  );
}

export default App;