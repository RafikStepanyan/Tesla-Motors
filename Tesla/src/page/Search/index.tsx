import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import './style.css';
import { getAllProduct, getProductByCategory } from '../../features/product/productSlice';
import { Button } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { getShopCategory } from '../../features/Category/categorySlice';

export const Search: React.FC = (): JSX.Element => {
    const navigate = useNavigate();
    const params = useParams();
    const dispatch = useDispatch();
    const data = useSelector((state: any) => state.product.product);
    const [clone, setClone] = useState<any>([]);

    useEffect(() => {
        dispatch(getAllProduct()).then((res: any) => {
            setClone([...res.payload.filter((e: any) => e.name.includes(params.value))]);
        }).catch(() => null);
    }, [params]);


    return (
        <div className='shopbycategory' style={{ height: '80vh' }}>
            <div style={{ margin: '10vh 0px 5vh 5vh' }}>
                <h1>Results for <span style={{ fontStyle: 'italic', fontWeight: '100', fontSize: '35px' }}>{params.value}</span></h1>
                <p>{clone.length ? '' : 'No Results Found'}</p>
            </div>
            <div className='allproduct' style={{ height: '65vh', marginLeft: '5vh' }}>
                {
                    clone?.map((e: any) => {
                        return <div key={e.id}>
                            <h4>{e.name}</h4>
                            <img src={e.pictures[0]} alt="" />
                            <Button onClick={() => {
                                navigate('/shop/seeproduct/' + e.id);
                            }} variant='light'>View details</Button>
                        </div>;
                    })
                }
            </div>
        </div>
    );
};