import Table from 'react-bootstrap/Table';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import './style.css';
import { Button } from 'react-bootstrap';
import { deleteById, } from '../../firebase/Firestore';
import { getProduct } from '../../features/product/productSlice';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../firebase/Firebase';
import { getUserByEmailAsync } from '../../features/User/userSlice';
import { useNavigate } from 'react-router-dom';

export const MyProduct: React.FC = (): JSX.Element => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const data = useSelector((state: any) => state);
    const [managerId, setManagerId] = useState<any>('');

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                dispatch(getUserByEmailAsync({ email: user.email })).then((res: any) => {
                    setManagerId(res.payload.id);
                }).catch((e: any) => null);
            }
        });
    }, []);

    useEffect(() => {
        dispatch(getProduct(managerId)).then(() => null).catch(() => null);
    }, [managerId]);

    return (
        <div style={{ height: '70vh', width: '100%', textAlign: 'center', overflowY: 'auto' }} className='myproduct'>
            <h1 style={{ fontSize: '50px', fontWeight: '100', textAlign: 'left' }}>My products</h1>
            <Table responsive striped bordered hover>
                <thead>
                    <tr>
                        <th>image</th>
                        <th>name</th>
                        <th>count</th>
                        <th>price</th>
                        <th>description</th>
                        <th>edit</th>
                        <th>delete</th>
                    </tr>
                </thead>
                <tbody style={{ height: '30vh', overflowY: 'scroll', verticalAlign: 'middle' }}>
                    {
                        data?.product?.product?.map((e: any) => {
                            return <tr key={e.id}>
                                <td style={{ backgroundPosition: 'center', backgroundImage: `url(${e.pictures[0]})`, backgroundSize: 'cover', width: '200px', height: '200px' }}></td>
                                <td>{e.name}</td>
                                <td>{e.count}</td>
                                <td>{e.price}</td>
                                <td>{e.desc}</td>
                                <td><Button onClick={() => {
                                    navigate('/profile/edit-product/' + e.id);
                                }} variant='info'>Edit</Button></td>
                                <td><Button onClick={() => {
                                    deleteById({ collectionName: 'products', id: e.id });
                                    dispatch(getProduct(managerId)).then(() => null).catch(() => null);
                                }} variant='danger'>Delete</Button></td>
                            </tr>;
                        })
                    }
                </tbody>
            </Table>
        </div >
    );
};