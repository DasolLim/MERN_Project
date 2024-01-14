import { FaSignInAlt, FaSignOutAlt, FaUser } from 'react-icons/fa'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logout, reset } from '../features/auth/authSlice'
import { FaShieldAlt } from 'react-icons/fa';
import { FaRegThumbsUp } from 'react-icons/fa';
import { FaExclamationTriangle } from 'react-icons/fa';

function Header() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { user } = useSelector((state) => state.auth)

    const onLogout = () => {
        dispatch(logout())
        dispatch(reset())
        navigate('/login')
    }

    return (
        <header className='header'>
            <div className='logo'>
                {/* <Link to='/dashboard'>GoalSetter</Link> */}
                MERN Stack Project
            </div>
            <ul>
                {user ? (
                    <ul>
                        <li>
                            <Link to='/dashboard'>
                                <FaUser /> Dashboard
                            </Link>
                        </li>
                        <li>
                            <Link to='/search'>
                                <FaUser /> Search
                            </Link>
                        </li>
                        <li>
                            <button className='btn' onClick={onLogout}>
                                <FaSignOutAlt /> Logout
                            </button>
                        </li>
                    </ul>
                ) : (
                    <>
                        <li>
                            <Link to='/'>
                                <FontAwesomeIcon icon={faHome} /> Home
                            </Link>
                        </li>
                        <li>
                            <Link to='/privacy-policy'>
                                <FaShieldAlt /> Privacy Policy
                            </Link>
                        </li>
                        <li>
                            <Link to='/AUP'>
                                <FaRegThumbsUp /> AUP
                            </Link>
                        </li>
                        <li>
                            <Link to='/DMCA'>
                                <FaExclamationTriangle /> DMCA
                            </Link>
                        </li>
                        <li>
                            <Link to='/register'>
                                <FaUser /> Register
                            </Link>
                        </li>
                        <li>
                            <Link to='/login'>
                                <FaSignInAlt /> Login
                            </Link>
                        </li>
                    </>
                )}
            </ul>
        </header>
    )
}

export default Header