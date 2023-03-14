import { signInWithEmailAndPassword } from 'firebase/auth';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../firebase/Firebase';
import './style.css';

export const Login: React.FC = (): JSX.Element => {
    const navigate = useNavigate();
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const data = useSelector((state: any) => state.user.user);

    const save = (data: any): void => {
        signInWithEmailAndPassword(auth, data.email, data.password).then(res => {
            if (res.user) {
                navigate('/profile');
            }
        }).catch(e => alert('user not found'));
        reset();
    };
    return (
        <div className='login'>
            <form onSubmit={handleSubmit(save)}>
                <h1 style={{ fontSize: '50px', fontWeight: '500' }}>Sign in</h1>
                <br />
                <label>Email</label>
                <input type="text" {...register('email', { required: 'true' })} />
                {errors.email && errors.email.type == 'required' && <p>Enter your email</p>}
                <label>Password</label>
                <input type="text"  {...register('password', { required: 'true' })} />
                {errors.password && errors.password.type == 'required' && <p>Enter your password</p>}
                <br />
                <button>Sign in</button>
            </form>
            <br />
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '5px' }}>
                <div style={{ borderBottom: '3px solid gray', width: '100%' }} ></div>
                Or
                <div style={{ borderBottom: '3px solid gray', width: '100%' }}></div>
            </div>
            <br />
            <button style={{ background: '#d8d8d8', color: 'black' }} onClick={() => {
                navigate('/register');
            }}>Create Account</button>
        </div>
    );
};