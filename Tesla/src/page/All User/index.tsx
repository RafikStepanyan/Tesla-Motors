import Table from 'react-bootstrap/Table';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import './style.css';
import { getUsersAsync } from '../../features/User/userSlice';
import { Button } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import { deleteById, updateById } from '../../firebase/Firestore';



export const AllUser: React.FC = (): JSX.Element => {
    const dispatch = useDispatch();
    const data = useSelector((state: any) => state.user.arr);

    useEffect(() => {
        dispatch(getUsersAsync({ done: false })).then((res: any) => null).catch((e: any) => null);
    }, []);

    return (
        <div style={{ height: '60vh', width: '100%', textAlign: 'center' }} className='alluser'>
            <h1 style={{ fontSize: '50px', fontWeight: '100', textAlign: 'left' }}>All users</h1>
            <Table responsive striped bordered hover>
                <thead>
                    <tr>
                        <th>name</th>
                        <th>surname</th>
                        <th>email</th>
                        <th>phone</th>
                        <th>status</th>
                        <th>type</th>
                        <th>delete</th>
                    </tr>
                </thead>
                <tbody style={{ height: '30vh', overflowY: 'scroll', verticalAlign: 'middle' }}>
                    {
                        data?.map((e: any) => {
                            return e.type != 'admin' ? <tr key={e.id}>
                                <td>{e.name}</td>
                                <td>{e.surname}</td>
                                <td>{e.email}</td>
                                <td>{e.phone}</td>
                                <td>{e.blocked ? 'blocked' : 'not blocked'} <br /> <Button onClick={() => {
                                    const obj = { blocked: !e.blocked };
                                    updateById({ collectionName: 'user', id: e.id, obj });
                                    dispatch(getUsersAsync({ done: false })).then((res: any) => console.log(res)).catch((e: any) => null);
                                }}>Change status</Button></td>
                                <td>{e.type} <Form.Select onChange={(event) => {
                                    const obj = { type: e.type == 'user' ? 'manager' : 'user' };
                                    updateById({ collectionName: 'user', id: e.id, obj }).then(() => {
                                        dispatch(getUsersAsync({ done: false })).then((res: any) => console.log(res)).catch((e: any) => null);
                                        event.target.value = '';
                                    });
                                }}>
                                    <option value="" hidden>Change type</option>
                                    <option value="user">user</option>
                                    <option value="manager">manager</option>
                                </Form.Select>
                                </td>
                                <td><Button onClick={() => {
                                    deleteById({ collectionName: 'user', id: e.id });
                                    dispatch(getUsersAsync({ done: false })).then((res: any) => console.log(res)).catch((e: any) => null);
                                }} variant='danger'>delete</Button></td>
                            </tr> : null;
                        })
                    }
                </tbody>
            </Table>
        </div >
    );
};