import './style.css';
import { useForm } from 'react-hook-form';
import { createUserWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth } from '../../firebase/Firebase';
import { addData } from '../../firebase/Firestore';

export const Register: React.FC = (): JSX.Element => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    const save = (data: any): void => {
        createUserWithEmailAndPassword(auth, data.email, data.password).then(res => {
            delete data.password;
            addData({ collectionName: 'user', obj: { ...data, type: 'user', blocked: false, basket: [] } }).then(res => console.log(res)).catch(res => console.log(res));
            signOut(auth);
        }).catch(e => console.log(e));
        reset();
    };

    return (
        <div className='login'>
            <form style={{ width: '400px', height: '550px', overflowY: 'auto' }} onSubmit={handleSubmit(save)}>
                <h1 style={{ fontSize: '50px', fontWeight: '500' }}>Create Account</h1>
                <br />
                <label>Name</label>
                <input type="text"  {...register('name', { required: 'true', minLength: 2, pattern: /^[a-zA-Z]+$/ })} />
                {errors.name && errors.name.type == 'required' && <p>Enter your name</p>}
                {errors.name && errors.name.type == 'minLength' && <p>min length 2</p>}
                {errors.name && errors.name.type == 'pattern' && <p>only letters in name</p>}
                <label>Surname</label>
                <input type="text" {...register('surname', { required: 'true', minLength: 2, pattern: /^[a-zA-Z]+$/ })} />
                {errors.surname && errors.surname.type == 'required' && <p>Enter your surname</p>}
                {errors.surname && errors.surname.type == 'minLength' && <p>min length 2</p>}
                {errors.surname && errors.surname.type == 'pattern' && <p>only letters in surname</p>}
                <label>Email</label>
                <input type="text" {...register('email', { required: 'true' })} />
                {errors.email && errors.email.type == 'required' && <p>Enter your email</p>}
                <label>Phone</label>
                <input className='form-control' type="text" {...register('phone', { required: 'true', })} />
                {errors.phone && errors.phone.type == 'required' && <p>Enter your phone number</p>}
                <label>Password</label>
                <input type="text" {...register('password', { required: 'true', minLength: 6 })} />
                {errors.password && errors.password.type == 'required' && <p>Enter your password</p>}
                {errors.password && errors.password.type == 'minLength' && <p>min length 6</p>}
                <br />
                <button>Create Account</button>
            </form>
        </div>
    );
};