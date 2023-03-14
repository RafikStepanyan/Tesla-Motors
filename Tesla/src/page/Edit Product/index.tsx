import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import { getOneProduct } from '../../features/product/productSlice';
import { updateById } from '../../firebase/Firestore';
import './style.css';

export const EditProduct: React.FC = (): JSX.Element => {
    const params = useParams();
    const dispatch = useDispatch();
    const data1 = useSelector((state: any) => state.product.editProduct);
    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    useEffect(() => {
        dispatch(getOneProduct(params.id)).then(() => null).catch((e: any) => console.log(e));
    }, []);

    const save = (data2: any): void => {
        for (let e in data2) {
            if (data2[e] == '') {
                delete data2[e];
            }
        }
        updateById({ collectionName: 'products', id: data1.id, obj: data2 });
        dispatch(getOneProduct(params.id)).then(() => null).catch((e: any) => console.log(e));
        reset();
        Swal.fire(
            'Your product has been successfully edited',
            '',
            'success',
        );
    };

    return (
        <div className='login'>
            <form style={{ width: '400px', overflowY: 'auto', gap: '0px' }} onSubmit={handleSubmit(save)}>
                <h1 style={{ fontSize: '50px', fontWeight: '500' }}>Edit product</h1>
                <label>Name</label>
                <input placeholder={data1?.name} type="text"  {...register('name',)} />
                <label>Count</label>
                <input placeholder={data1?.count} type="text" {...register('count',)} />
                <label>Price</label>
                <input placeholder={data1?.price} className='form-control' type="text" {...register('price')} />
                <label>Description</label>
                <textarea style={{ height: '150px', resize: 'none' }} placeholder={data1?.desc} className='form-control' {...register('desc')}></textarea>
                <br />
                <button>Edit Product</button>
            </form>
        </div>
    );
};