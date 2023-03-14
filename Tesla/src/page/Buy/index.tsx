import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { getMainProduct } from '../../features/mainProduct/mainProductSlice';
import { useEffect, useState } from 'react';
import './style.css';
import { Button } from 'react-bootstrap';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../firebase/Firebase';
import Swal from 'sweetalert2';
import { getUserByEmailAsync } from '../../features/User/userSlice';
import { updateById } from '../../firebase/Firestore';

export const Buy: React.FC = (): JSX.Element => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();
    const pathname = location.pathname.split('/buy/')[1];
    const data = useSelector((state: any) => state.mainProduct.product);
    const user = useSelector((state: any) => state.user.user);
    const [bool, setBool] = useState<boolean>(false);
    const [slider, setSlider] = useState<number>(0);

    const minus = (): void => {
        if (slider == 0) {
            setSlider(data[0]?.buyPic.length - 1);
        } else {
            setSlider(slider - 1);
        }
    };

    const plus = (): void => {
        if (slider >= data[0]?.buyPic.length - 1) {
            setSlider(0);
        } else {
            setSlider(slider + 1);
        }
    };

    useEffect(() => {
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
        dispatch(getMainProduct(pathname)).then((res: any) => null).catch((e: any) => null);
    }, [location]);

    return <div className='buy'>
        {
            pathname == 'solarroof' || pathname == 'solarpanels' ?
                <>
                    <div style={{ padding: '0px 50px', backgroundImage: `url(${data[0]?.mainPic[0]})`, backgroundSize: 'cover', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>

                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', textAlign: 'center', gap: '20px', fontSize: '30px', padding: '10px 30px' }}>
                        <div style={{ height: 'auto', justifyContent: 'center', alignItems: 'center' }} className='login'>
                            <form style={{ width: '400px', display: 'grid', gap: '30px', alignItems: 'center' }}>
                                <h1>{data[0]?.name}</h1>
                                <label style={{ textAlign: 'left' }}>Home Address</label>
                                <input type="text" />
                                <label style={{ textAlign: 'left' }}>Average Electric Bill</label>
                                <input type="text" />
                            </form>
                            <br />
                            <button onClick={() => {
                                Swal.fire(
                                    'This product not available in your region',
                                    '',
                                    'error'
                                );
                            }}>Next</button>
                        </div>

                    </div>
                </> :
                <>
                    <div style={{ height: '55vh', padding: '0px 50px', backgroundImage: `url(${data[0]?.buyPic[slider]})`, backgroundSize: 'cover', display: 'flex', alignItems: 'center', justifyContent: 'space-between', backgroundPosition: 'center' }}>
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
                    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', textAlign: 'center', gap: '20px', fontSize: '30px', padding: '10px 70px' }}>
                        <h1>{data[0]?.name}</h1>
                        <h3>price: ${data[0]?.price}</h3>
                        <Button className='main' onClick={() => {
                            if (bool) {
                                if (user?.basket?.find((e: any) => e.id == data[0].id)) {
                                    Swal.fire(
                                        'This product in your basket',
                                        '',
                                        'error'
                                    );
                                } else if (user?.type == 'user' && user?.blocked == false) {
                                    const array = [...user.basket];
                                    array.push({ ...data[0], quantity: 1 });
                                    updateById({ collectionName: 'user', id: user?.id, obj: { basket: array } });
                                    Swal.fire(
                                        'Product successfully added to your basket',
                                        '',
                                        'success'
                                    );
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
                    </div>
                    <div className='allpicturess' style={{ marginTop: '0px' }}>
                        {
                            data[0]?.buyPic?.map((e: any, i: number) => {
                                return <div onClick={() => {
                                    setSlider(i);
                                }} key={i} style={{ backgroundImage: `url(${data[0]?.buyPic[i]})` }}>

                                </div>;
                            })
                        }
                    </div>
                </>
        }
    </div>;
};