import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import './style.css';
import { Button } from 'react-bootstrap';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../firebase/Firebase';
import { getOneProduct } from '../../features/product/productSlice';
import Swal from 'sweetalert2';
import { addData, updateById } from '../../firebase/Firestore';
import { getUserByEmailAsync } from '../../features/User/userSlice';
import { Rating } from 'react-simple-star-rating';
import { Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';

export const SeeProduct: React.FC = (): JSX.Element => {
    const { register, reset, handleSubmit, formState: { errors } } = useForm<any>();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const params = useParams();
    const data = useSelector((state: any) => state.product.editProduct);
    const user = useSelector((state: any) => state.user.user);
    const [bool, setBool] = useState<boolean>(false);
    const [slider, setSlider] = useState<number>(0);
    const [quantity, setQuantity] = useState<number>(1);
    const [value, setValue] = useState<number>(0);

    const saveFeed = (d: any) => {
        console.log('hello');
        if (!bool) {
            navigate('/login');
        } else if (!user.blocked) {
            const review = [...data.review];
            review.push({ ...d, username: user.name + ' ' + user.surname });

            updateById({ collectionName: 'products', id: data.id, obj: { review } });
            reset();
            dispatch(getOneProduct(params.id)).then((res: any) => {
                const val = res.payload.rating.length ? res.payload.rating.reduce((a: any, b: any) => a + b.rate, 0) / res.payload.rating.length : 0;
                setValue(val);
            }).catch((e: any) => null);
        } else {
            Swal.fire(
                'Blocked user can`t write feedback',
                '',
                'error'
            );
        }
    };

    const handleRating = (rate: number) => {
        if (!bool) {
            Swal.fire(
                'Login befor rate product',
                '',
                'error'
            );
        } else if (data?.rating?.find((e: any) => e.userId == user.id)) {
            dispatch(getOneProduct(params.id)).then((res: any) => {
                const val = res.payload.rating.length ? res.payload.rating.reduce((a: any, b: any) => a + b.rate, 0) / res.payload.rating.length : 0;
                setValue(val);
            }).catch((e: any) => null);
            Swal.fire(
                'You have already rated this product',
                '',
                'error'
            );
            setTimeout(() => {
                window.location.reload();
            }, 3000);
        } else {
            const ratingArray = [...data?.rating];
            ratingArray.push({ rate: rate, userId: user.id });
            updateById({ collectionName: 'products', id: data.id, obj: { rating: ratingArray } });
            dispatch(getOneProduct(params.id)).then((res: any) => {
                const val = res.payload.rating.length ? res.payload.rating.reduce((a: any, b: any) => a + b.rate, 0) / res.payload.rating.length : 0;
                setValue(val);
            }).catch((e: any) => null);
        }
    };


    const minus = (): void => {
        if (slider == 0) {
            setSlider(data?.pictures.length - 1);
        } else {
            setSlider(slider - 1);
        }
    };

    const plus = (): void => {
        if (slider >= data?.pictures.length - 1) {
            setSlider(0);
        } else {
            setSlider(slider + 1);
        }
    };

    useEffect(() => {
        window.scrollTo(0, 0);
        onAuthStateChanged(auth, (user1) => {
            if (user1) {
                setBool(true);
                dispatch(getUserByEmailAsync({ email: user1?.email })).then(() => null).catch(() => null);
            } else {
                setBool(false);
            }
        });
    }, []);

    useEffect(() => {
        dispatch(getOneProduct(params.id)).then((res: any) => {
            const val = res.payload.rating.length ? res.payload.rating.reduce((a: any, b: any) => a + b.rate, 0) / res.payload.rating.length : 0;
            setValue(val);
        }).catch((e: any) => null);
    }, []);

    return <div >
        <section className='buy'>
            <div style={{ height: '55vh', padding: '0px 50px', backgroundImage: data?.pictures && `url(${data.pictures[slider]})`, backgroundSize: 'cover', display: 'flex', alignItems: 'center', justifyContent: 'space-between', backgroundPosition: 'center' }}>
                <button onClick={() => {
                    minus();
                }} className='slider'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" fill="#000000"><path clipRule="evenodd" d="M13.11 17.975 25.246 6.348l-2.49-2.599-13.5 12.935-1.366 1.308 1.374 1.3 13.5 12.765 2.474-2.616L13.11 17.975Z" /></svg>
                </button>
                <button onClick={() => {
                    plus();
                }} className='slider'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" fill="#000000"><path clipRule="evenodd" d="M22.138 18 10.004 6.374l2.49-2.6 13.5 12.935 1.366 1.308-1.374 1.3-13.5 12.765-2.474-2.616L22.138 18Z" /></svg>
                </button>
            </div>
            <div className='seeproduct1'>
                <h1 >{data?.name}</h1>
                <h3>Price: ${data?.price}</h3>
                <h4>Quantity</h4>
                <section className='desc1' style={{ display: 'flex', gap: '20px', padding: '0px', alignItems: 'center', }}>
                    <Button onClick={() => {
                        if (quantity == 1) {
                            Swal.fire(
                                'Minimum quantity of product is 1',
                                '',
                                'error'
                            );
                        } else {
                            setQuantity(quantity - 1);
                        }
                    }} variant='light'>-</Button>
                    <h4>{quantity}</h4>
                    <Button onClick={() => {
                        if (data.count == quantity) {
                            Swal.fire(
                                'Maximum quantity of product',
                                '',
                                'error'
                            );
                        } else {
                            setQuantity(quantity + 1);
                        }
                    }} variant='light'>+</Button>
                </section>
                <Button className='main' onClick={() => {
                    if (bool) {
                        if (user?.basket?.find((e: any) => e.id == data.id)) {
                            Swal.fire(
                                'This product in your basket',
                                '',
                                'error'
                            );
                        } else if (user?.type == 'user' && user?.blocked == false) {
                            const array = [...user.basket];
                            array.push({ ...data, quantity: quantity });
                            updateById({ collectionName: 'user', id: user?.id, obj: { basket: array } });
                            Swal.fire(
                                'Product successfully added to your basket',
                                '',
                                'success'
                            );
                            console.log(user);
                            setQuantity(1);
                        } else if (user?.type != 'user') {
                            Swal.fire(
                                'Only user can by product',
                                '',
                                'error'
                            );
                        } else if (user?.blocked == true) {
                            Swal.fire(
                                'Blocked user can`t buy product',
                                '',
                                'error'
                            );
                        }
                        dispatch(getUserByEmailAsync({ email: user?.email })).then(() => null).catch(() => null);
                    } else {
                        navigate('/login');
                    }
                }}>Order with card</Button>
                <h3>Description: {data?.desc}</h3>
            </div>
            <div className='allpicturess' style={{ marginTop: '0px' }}>
                {
                    data?.pictures?.map((e: any, i: number) => {
                        return <div onClick={() => {
                            setSlider(i);
                        }} key={i} style={{ backgroundImage: `url(${data?.pictures[i]})` }}>

                        </div>;
                    })
                }
            </div>
            <div style={{ marginTop: '0px', padding: '50px' }}>
                {
                    bool ?
                        <>
                            <h1>Rating:</h1>
                            <Rating initialValue={value}
                                onClick={handleRating}
                            />
                        </>
                        : <></>
                }
            </div>
        </section>
        <section className='feed'>
            <div className='send'>
                <form onSubmit={handleSubmit(saveFeed)}>
                    <h1>Feedback</h1>
                    <Form.Control as='textarea' {...register('feedback', { required: true })}></Form.Control>
                    {errors.feedback && errors.feedback.type === 'required' && <p>Write your feedback</p>}
                    <Button type='submit'>Send</Button>
                </form>
            </div>
            <div className='allreview'>
                {
                    data?.review?.map((e: any, id: number) => {
                        return <div key={id}>
                            <h1>{e.username}:</h1>
                            <p>{e.feedback}</p>
                        </div>;
                    })
                }
            </div>
        </section>
    </div >;
};