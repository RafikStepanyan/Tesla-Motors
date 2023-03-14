import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import './style.css';
import { onAuthStateChanged } from 'firebase/auth';
import { getUserByEmailAsync } from '../../features/User/userSlice';
import { auth } from '../../firebase/Firebase';
import { useNavigate } from 'react-router-dom';
import { Table } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import { updateById } from '../../firebase/Firestore';
import Swal from 'sweetalert2';

export const Basket: React.FC = (): JSX.Element => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const data = useSelector((state: any) => state);
    const [bool, setBool] = useState<boolean>(false);
    const [total, setTotal] = useState<number>(0);

    useEffect(() => {
        onAuthStateChanged(auth, (user1) => {
            if (user1) {
                setBool(true);
                dispatch(getUserByEmailAsync({ email: user1?.email })).then((res: any) => {
                    const tot = res.payload.basket.reduce((a: any, b: any) => a + (b.price * b.quantity), 0);
                    if (tot !== undefined) {
                        setTotal(tot);
                    }
                }).catch(() => null);
            } else {
                setBool(false);
                navigate('/login');
            }
        });
    }, []);

    return (
        <div style={{ height: '90vh', width: '100%', textAlign: 'center', overflowY: 'auto' }} className='alluser'>
            <h1 style={{ fontSize: '50px', fontWeight: '100', textAlign: 'left', padding: '10vh 5vh' }}>Basket</h1>
            <div style={{ width: '95%', height: '50vh', overflowX: 'auto', overflowY: 'auto', marginLeft: '5vh' }}>
                <Table responsive striped bordered hover>
                    <thead>
                        <tr>
                            <th>name</th>
                            <th>quantity</th>
                            <th>price</th>
                            <th>total</th>
                            <th>delete</th>
                        </tr>
                    </thead>
                    <tbody style={{ height: '30vh', overflowY: 'scroll', verticalAlign: 'middle' }}>
                        {
                            data?.user?.user?.basket?.map((e: any) => {
                                return <tr key={e.id}>
                                    <td>{e.name}</td>
                                    <td><Button onClick={() => {
                                        if (e.quantity == 1) {
                                            Swal.fire(
                                                'Minimum quantity of product is 1',
                                                '',
                                                'error'
                                            );
                                        } else {
                                            const array = [...data.user.user.basket];
                                            const index = array.findIndex((elm: any) => elm.id == e.id);
                                            const newArray = array.map((item, i) => {
                                                if (i === index) {
                                                    return {
                                                        ...item,
                                                        quantity: item.quantity - 1
                                                    };
                                                }
                                                return item;
                                            });
                                            updateById({ collectionName: 'user', id: data.user.user.id, obj: { basket: newArray } });
                                            dispatch(getUserByEmailAsync({ email: data?.user?.user?.email })).then((res: any) => {
                                                const tot = res.payload.basket.reduce((a: any, b: any) => a + (b.price * b.quantity), 0);
                                                if (tot !== undefined) {
                                                    setTotal(tot);
                                                }
                                            }).catch(() => null);
                                        }
                                    }} variant='light' className='quantity'>-</Button>
                                        {e.quantity}
                                        <Button disabled={e.buyPic ? true : false} onClick={() => {
                                            if (e.count == e.quantity) {
                                                Swal.fire(
                                                    'Maximum quantity of product',
                                                    '',
                                                    'error'
                                                );
                                            } else {
                                                const array = [...data.user.user.basket];
                                                const index = array.findIndex((elm: any) => elm.id == e.id);
                                                const newArray = array.map((item, i) => {
                                                    if (i === index) {
                                                        return {
                                                            ...item,
                                                            quantity: item.quantity + 1
                                                        };
                                                    }
                                                    return item;
                                                });
                                                updateById({ collectionName: 'user', id: data.user.user.id, obj: { basket: newArray } });
                                                dispatch(getUserByEmailAsync({ email: data?.user?.user?.email })).then((res: any) => {
                                                    const tot = res.payload.basket.reduce((a: any, b: any) => a + (b.price * b.quantity), 0);
                                                    if (tot !== undefined) {
                                                        setTotal(tot);
                                                    }
                                                }).catch(() => null);
                                            }
                                        }} variant='light' className='quantity'>+</Button></td>
                                    <td>{e.price}</td>
                                    <td>{e.price * e.quantity}</td>
                                    <td><Button onClick={() => {
                                        const array = [...data.user.user.basket];
                                        const index = array.findIndex((elm: any) => elm.id == e.id);
                                        array.splice(index, 1);
                                        updateById({ collectionName: 'user', id: data.user.user.id, obj: { basket: array } });
                                        dispatch(getUserByEmailAsync({ email: data?.user?.user?.email })).then((res: any) => {
                                            const tot = res.payload.basket.reduce((a: any, b: any) => a + (b.price * b.quantity), 0);
                                            if (tot !== undefined) {
                                                setTotal(tot);
                                            }
                                        }).catch(() => null);
                                    }} variant='danger'>Delete</Button></td>
                                </tr>;
                            })
                        }
                    </tbody>
                </Table>
            </div>
            <h1 style={{ textAlign: 'left', marginLeft: '5vh' }}>Total:{'$ ' + total}</h1>
        </div >
    );
};