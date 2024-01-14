import { useState, useEffect } from 'react'
// Icon component that represent a sign-in icon from a library
import { FaSignInAlt } from 'react-icons/fa'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
// Actions imported
import { login, reset } from '../features/auth/authSlice'
import Spinner from '../components/Spinner'

function Login() {
    // Used to manage form data
    // 'formData' holds the values for the email and password
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    })

    // email and password are extracted from formData
    const { email, password } = formData

    const navigate = useNavigate()
    const dispatch = useDispatch()

    // Used to extract data from the Redux store
    const { user, isLoading, isError, isSuccess, message } = useSelector(
        (state) => state.auth
    )

    useEffect(() => {
        if (isError) {
            toast.error(message)
        }

        if (isSuccess || user) {
            navigate('/')
        }

        dispatch(reset())
    }, [user, isError, isSuccess, message, navigate, dispatch])

    // Updates the form data in response to changes in the input field
    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }))
    }

    // Prevents the default form submission
    const onSubmit = async (e) => {
        e.preventDefault();

        // Creates userData with email and password
        const userData = {
            email,
            password,
        };

        try {
            await dispatch(login(userData));

            console.log(userData);

            // Check if the logged-in user is an admin
            if (userData.email === "admin@admin.com") {
                // Redirect to the Admin page
                navigate('/admin');
            } else {
                // Redirect to the user's dashboard
                navigate('/dashboard');
            }
        } catch (error) {
            console.error('Login Error:', error);
        }

        // Dispatch accepts an object that represents the type of action we want to execute when it is called
        dispatch(login(userData))
    }

    if (isLoading) {
        return <Spinner />
    }

    return (
        <>
            <section className='heading'>
                <h1>
                    <FaSignInAlt /> Login
                </h1>
                <p>Login and start creating lists</p>
            </section>

            <section className='form'>
                <form onSubmit={onSubmit}>
                    <div className='form-group'>
                        <input
                            type='email'
                            className='form-control'
                            id='email'
                            name='email'
                            value={email}
                            placeholder='Enter your email'
                            onChange={onChange}
                        />
                    </div>
                    <div className='form-group'>
                        <input
                            type='password'
                            className='form-control'
                            id='password'
                            name='password'
                            value={password}
                            placeholder='Enter password'
                            onChange={onChange}
                        />
                    </div>

                    <div className='form-group'>
                        <button type='submit' className='btn btn-block'>
                            Submit
                        </button>
                    </div>
                </form>
            </section>
        </>
    )
}

export default Login