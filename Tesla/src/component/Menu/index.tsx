import './style.css';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useRef, useState } from 'react';
import { getCarCategory, getShopCategory } from '../../features/Category/categorySlice';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../firebase/Firebase';
import { getUserByEmailAsync } from '../../features/User/userSlice';

export const Menu: React.FC = (): JSX.Element => {
    const resmenu = useRef<any>(null);
    const black = useRef<any>(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const data = useSelector((state: any) => state.category);
    const [bool, setBool] = useState<boolean>(false);

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setBool(true);
                dispatch(getUserByEmailAsync({ email: user.email })).then((res: any) => null).catch((e: any) => console.log(e));
            } else {
                setBool(false);
            }
        });
    }, []);

    window.onscroll = () => {
        if (resmenu.current.style.display == 'block') {
            window.scrollTo(0, 0);
        }
    };

    useEffect(() => {
        if (location.pathname.startsWith("/shop")) {
            dispatch(getShopCategory()).then((res: any) => { }).catch((e: any) => { });
        } else {
            dispatch(getCarCategory()).then((res: any) => { }).catch((e: any) => { });
        }
    }, [location]);

    return (
        <div className='menu' style={{ background: location.pathname == '/model/solarroof' || location.pathname == '/shop' ? 'white' : 'none' }}>
            <div onClick={() => {
                if (location.pathname != '/') {
                    navigate('/');
                    window.scrollTo(0, 0);
                    resmenu.current.style.display = 'none';
                }
            }} style={{ cursor: 'pointer' }}>
                <svg className="tds-icon tds-icon-logo-wordmark tds-site-logo-icon" viewBox="0 0 342 35" xmlns="http://www.w3.org/2000/svg"><path d="M0 .1a9.7 9.7 0 0 0 7 7h11l.5.1v27.6h6.8V7.3L26 7h11a9.8 9.8 0 0 0 7-7H0zm238.6 0h-6.8v34.8H263a9.7 9.7 0 0 0 6-6.8h-30.3V0zm-52.3 6.8c3.6-1 6.6-3.8 7.4-6.9l-38.1.1v20.6h31.1v7.2h-24.4a13.6 13.6 0 0 0-8.7 7h39.9v-21h-31.2v-7h24zm116.2 28h6.7v-14h24.6v14h6.7v-21h-38zM85.3 7h26a9.6 9.6 0 0 0 7.1-7H78.3a9.6 9.6 0 0 0 7 7zm0 13.8h26a9.6 9.6 0 0 0 7.1-7H78.3a9.6 9.6 0 0 0 7 7zm0 14.1h26a9.6 9.6 0 0 0 7.1-7H78.3a9.6 9.6 0 0 0 7 7zM308.5 7h26a9.6 9.6 0 0 0 7-7h-40a9.6 9.6 0 0 0 7 7z" fill="currentColor"></path></svg>
            </div>
            <div className='menunone'>
                {
                    data ?
                        location.pathname.startsWith("/shop") ?
                            <>
                                {
                                    data?.arrShop[0]?.child?.map((e: any, id: number) => {
                                        return <Button style={{ color: location.pathname == '/model/solarroof' ? 'whitesmoke' : 'black' }} key={id} onClick={() => {
                                            navigate('/shop/shopbycategory/' + e.path);
                                        }}>{e.name}</Button>;

                                    })
                                }
                                <div style={{ display: 'inline-grid', gridTemplateColumns: '6fr 1fr', border: '3px solid gray', padding: '5px', borderRadius: '8px' }}>
                                    <input onKeyDown={(e) => {
                                        if (e.key == 'Enter') {
                                            console.log(e.currentTarget.value);
                                            navigate('/shop/search/' + e.currentTarget.value);
                                        }
                                    }} style={{ border: 'none', background: 'none', color: 'black' }} placeholder='Search' type="text" />
                                    <svg style={{ width: '25px', height: '25px' }} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="gray" className="bi bi-search" viewBox="0 0 16 16">
                                        <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                                    </svg>
                                </div>
                                <div onClick={() => {
                                    navigate('/shop/basket');
                                }} style={{ cursor: 'pointer', display: 'inline', border: '3px solid gray', padding: '8px', borderRadius: '8px', marginLeft: '10px' }}>
                                    <svg style={{ width: '25px', height: '25px' }} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="gray" className="bi bi-cart" viewBox="0 0 16 16">
                                        <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l1.313 7h8.17l1.313-7H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
                                    </svg>
                                </div>
                            </>
                            :
                            <>
                                {
                                    data?.arrCar[0]?.child?.map((e: any, id: number) => {
                                        return <Button style={{ color: location.pathname == '/model/solarroof' ? 'black' : 'black' }} key={id} onClick={() => {
                                            navigate('/model' + e.path);
                                        }}>{e.name}</Button>;
                                    })
                                }
                            </>
                        : <></>
                }
            </div>
            <div className='menunone' >
                <Button style={{ color: location.pathname == '/model/solarroof' ? 'black' : 'black' }} onClick={() => {
                    navigate('/shop');
                }}>Shop</Button>
                <Button style={{ color: location.pathname == '/model/solarroof' ? 'black' : 'black' }} onClick={() => {
                    navigate(bool ? '/profile' : '/login');
                }}>Account</Button>
            </div>
            <div className='menubutton' >
                <button onClick={() => {
                    resmenu.current.style.display == 'none' ? resmenu.current.style.display = 'block' : resmenu.current.style.display = 'none';
                    black.current.style.display == 'none' ? black.current.style.display = 'block' : black.current.style.display = 'none';
                }}>Menu</button>
            </div>
            <div className='menu100' ref={resmenu} style={{ display: 'none' }}>
                <div style={{ display: 'flex', justifyContent: 'right' }}>
                    <Button onClick={() => {
                        resmenu.current.style.display == 'none' ? resmenu.current.style.display = 'block' : resmenu.current.style.display = 'none';
                        black.current.style.display == 'none' ? black.current.style.display = 'block' : black.current.style.display = 'none';
                    }} style={{ color: 'black', fontSize: '50px' }} variant='light'>&times;</Button>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <input onKeyDown={(e) => {
                        if (e.key == 'Enter') {
                            navigate('/shop/search/' + e.currentTarget.value);
                            e.currentTarget.value = '';
                            resmenu.current.style.display = 'none';
                            black.current.style.display = 'none';
                        }
                    }} style={{ color: 'black', fontSize: '25px' }} placeholder='Search' type="text" />

                    <Button style={{ color: 'black' }} onClick={() => {
                        navigate('/model/models');
                        resmenu.current.style.display = 'none';
                        black.current.style.display = 'none';
                    }}>Model S</Button>
                    <Button style={{ color: 'black' }} onClick={() => {
                        navigate('/model/model3');
                        resmenu.current.style.display = 'none';
                        black.current.style.display = 'none';
                    }}>Model 3</Button>
                    <Button style={{ color: 'black' }} onClick={() => {
                        navigate('/model/modelx');
                        resmenu.current.style.display = 'none';
                        black.current.style.display = 'none';
                    }}>Model X</Button>
                    <Button style={{ color: 'black' }} onClick={() => {
                        navigate('/model/modely');
                        resmenu.current.style.display = 'none';
                        black.current.style.display = 'none';
                    }}>Model Y</Button>
                    <Button style={{ color: 'black' }} onClick={() => {
                        navigate('/shop/shopbycategory/charging');
                        resmenu.current.style.display = 'none';
                        black.current.style.display = 'none';
                    }}>Charging</Button>
                    <Button style={{ color: 'black' }} onClick={() => {
                        navigate('/shop/shopbycategory/vehicleaccessories');
                        resmenu.current.style.display = 'none';
                        black.current.style.display = 'none';
                    }}>Vehicle Accessories</Button>
                    <Button style={{ color: 'black' }} onClick={() => {
                        navigate('/shop/shopbycategory/apparel');
                        resmenu.current.style.display = 'none';
                        black.current.style.display = 'none';
                    }}>Apparel</Button>
                    <Button style={{ color: 'black' }} onClick={() => {
                        navigate('/shop/shopbycategory/lifestyle');
                        resmenu.current.style.display = 'none';
                        black.current.style.display = 'none';
                    }}>Lifestyle</Button>
                    <Button style={{ color: 'black' }} onClick={() => {
                        navigate('/shop/basket');
                        resmenu.current.style.display = 'none';
                        black.current.style.display = 'none';
                    }}>Basket</Button>
                    <Button style={{ color: 'black' }} onClick={() => {
                        navigate('/shop');
                        resmenu.current.style.display = 'none';
                        black.current.style.display = 'none';
                    }}>Shop</Button>
                    <Button style={{ color: 'black' }} onClick={() => {
                        navigate(bool ? "/profile" : '/login');
                        resmenu.current.style.display = 'none';
                        black.current.style.display = 'none';
                    }}>Account</Button>
                </div>
            </div>
            <div onClick={() => {
                resmenu.current.style.display == 'none' ? resmenu.current.style.display = 'block' : resmenu.current.style.display = 'none';
                black.current.style.display == 'none' ? black.current.style.display = 'block' : black.current.style.display = 'none';
            }} ref={black} className='black' style={{ display: 'none' }}>
            </div>
        </div>
    );
};