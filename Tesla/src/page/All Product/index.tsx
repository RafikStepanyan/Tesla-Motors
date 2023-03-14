import Table from 'react-bootstrap/Table';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import './style.css';
import { getUsersAsync } from '../../features/User/userSlice';
import { Button } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import { deleteById, updateById } from '../../firebase/Firestore';
import { getAllProduct } from '../../features/product/productSlice';



export const AllProduct: React.FC = (): JSX.Element => {
    const dispatch = useDispatch();
    const data = useSelector((state: any) => state);

    useEffect(() => {
        dispatch(getAllProduct()).then(() => null).catch(() => null);
    }, []);

    return (
        <div style={{ height: '60vh', width: '100%', textAlign: 'center', overflowY: 'auto' }} className='alluser'>
            <h1 style={{ fontSize: '50px', fontWeight: '100', textAlign: 'left' }}>All users</h1>
            <Table responsive striped bordered hover>
                <thead>
                    <tr>
                        <th>image</th>
                        <th>name</th>
                        <th>count</th>
                        <th>price</th>
                        <th>description</th>
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
                                    deleteById({ collectionName: 'products', id: e.id });
                                    dispatch(getAllProduct()).then(() => null).catch(() => null);
                                }} variant='danger'>Delete</Button></td>
                            </tr>;
                        })
                    }
                </tbody>
            </Table>
        </div >
    );
};