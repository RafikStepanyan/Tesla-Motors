import './style.css';
import { useForm } from 'react-hook-form';
import { auth, storage } from '../../firebase/Firebase';
import { addData, updateById } from '../../firebase/Firestore';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { getShopCategory } from '../../features/Category/categorySlice';
import Form from 'react-bootstrap/Form';
import { EnumCollection } from '../../features/User/userSlice';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';

export const AddProduct: React.FC = (): JSX.Element => {
    const dispatch = useDispatch();
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const data = useSelector((state: any) => state);
    const [arr, setArr] = useState<any>([]);
    const [img, setImg] = useState<any>([]);

    useEffect(() => {
        dispatch(getShopCategory()).then(() => null).catch(() => null);

    }, []);

    const save = async (product: any): Promise<void> => {
        await addData({
            collectionName: EnumCollection.PRODUCTS,
            obj: {
                ...product,
                managerId: data.user.user?.id,
                pictures: [],
                rating: [],
                review: [],
            },
        }).then((res: any) => {
            if (img.length) {
                let arr: string[] = [];
                for (let e of img) {
                    const storageRef = ref(storage, `/shopImages/${e.name}`);
                    const uploadTask = uploadBytesResumable(storageRef, e);
                    uploadTask.on(
                        "state_changed",
                        (snapshot) => { },
                        (err) => console.log(err),
                        () => {
                            getDownloadURL(uploadTask.snapshot.ref).then((url) => {
                                arr.push(url);
                                updateById({
                                    collectionName: EnumCollection.PRODUCTS,
                                    id: res,
                                    obj: { pictures: arr },
                                });
                            });
                        }
                    );
                }
            }
        });
        reset();

    };

    return (
        <div className='login' style={{ justifyContent: 'left', alignContent: 'end' }}>
            <form style={{ height: '600px', overflowY: 'auto' }} onSubmit={handleSubmit(save)}>
                <h1 style={{ fontSize: '45px', fontWeight: '500', margin: '0px' }}>Add product</h1>
                <label>Name</label>
                <input type="text"  {...register('name', { required: 'true', })} />
                {errors.name && errors.name.type == 'required' && <p>Enter your product name</p>}
                <label>Count</label>
                <input type="number" {...register('count', { required: 'true', pattern: /^[0-9]+$/ })} />
                {errors.count && errors.count.type == 'required' && <p>Enter your product count</p>}
                <label>Price</label>
                <input type="number" {...register('price', { required: 'true', pattern: /^[0-9]+$/ })} />
                {errors.price && errors.price.type == 'required' && <p>Enter your product price</p>}
                <label>Description</label>
                <textarea className='form-control' style={{ background: '#d8d8d8' }} {...register('desc', { required: 'true' })}></textarea>
                {errors.desc && errors.desc.type == 'required' && <p>Enter your product description</p>}
                <label>Categorys</label>
                <Form.Select {...register('category', { required: 'true', })} onChange={(e) => {
                    console.log(data.category);

                    setArr([...data.category.arrShop[0]?.child.find((elm: any) => elm.name === e.target.value).child]);
                }}  >
                    <option value="" hidden>Choose category</option>
                    {
                        data.category.arrShop[0]?.child.map((e: any, i: number) => {
                            return <option key={i} value={e.name}>{e.name}</option>;
                        })
                    }

                </Form.Select>
                {errors.category && errors.category.type == 'required' && <p>Choose product category</p>}
                <label>Subcategorys</label>
                <Form.Select  {...register('subcategory', { required: 'true', })} >
                    <option value="" hidden>Choose subcategory</option>
                    {
                        arr.map((e: any, i: number) => {
                            return <option key={i} value={e.name}>{e.name}</option>;
                        })
                    }
                </Form.Select>
                {errors.subcategory && errors.subcategory.type == 'required' && <p>Choose Product Subcategory</p>}
                <Form.Control
                    required={true}
                    type="file"
                    multiple
                    onChange={(e: any) => {
                        setImg(e.target.files);
                    }}
                />
                <button>Add Product</button>
            </form>
        </div >
    );
};