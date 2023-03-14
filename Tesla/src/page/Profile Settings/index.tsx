import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import { getUserByIdAsync } from '../../features/User/userSlice';
import { updateById } from '../../firebase/Firestore';
import './style.css';

export const Settings: React.FC = (): JSX.Element => {
    const dispatch = useDispatch();
    const data1 = useSelector((state: any) => state.user.user);
    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    const save = (data2: any): void => {
        for (let e in data2) {
            if (data2[e] == '') {
                delete data2[e];
            }
        }
        updateById({ collectionName: 'user', id: data1.id, obj: data2 });
        dispatch(getUserByIdAsync(data1.id)).then(() => null).catch(() => null);
        reset();
        Swal.fire(
            'Your profile has been successfully edited',
            '',
            'success',
        );
    };

    return (
        <div className='login' style={{ justifyContent: 'left', }}>
            <form style={{ width: '400px', height: '400px', overflowY: 'auto', gap: '0px' }} onSubmit={handleSubmit(save)}>
                <h1 style={{ fontSize: '50px', fontWeight: '500' }}>Profile Settings</h1>
                <label>Name</label>
                <input placeholder={data1?.name} type="text"  {...register('name', { minLength: 2, pattern: /^[a-zA-Z]+$/ })} />
                <label>Surname</label>
                <input placeholder={data1?.surname} type="text" {...register('surname', { minLength: 2, pattern: /^[a-zA-Z]+$/ })} />
                <label>Phone</label>
                <input placeholder={data1?.phone} className='form-control' type="text" {...register('phone')} />
                <button>Edit Profile</button>
            </form>
        </div>
    );
};