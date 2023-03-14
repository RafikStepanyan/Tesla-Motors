import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import './style.css';
import { getAllProduct, getProductByCategory } from '../../features/product/productSlice';
import { Button } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { getShopCategory } from '../../features/Category/categorySlice';

export const ShopByCategory: React.FC = (): JSX.Element => {
    const navigate = useNavigate();
    const params = useParams();
    const dispatch = useDispatch();
    const data = useSelector((state: any) => state.product.product);
    const [category, setCategory] = useState<any>();
    const [clone, setClone] = useState<any>([]);

    useEffect(() => {
        dispatch(getShopCategory()).then((res: any) => {
            const cat = res.payload[0].child.find((e: any) => e.path == params.name);
            setCategory(cat);
        }).catch(() => null);
    }, [params]);

    useEffect(() => {
        dispatch(getProductByCategory(category?.name)).then((res: any) => {
            setClone([...res.payload]);
        }).catch(() => null);
    }, [category]);

    const filterBySub = (subcategory: string): void => {
        setClone([...data.filter((e: any) => e.subcategory == subcategory)]);
    };

    return (
        <div className='shopbycategory'>
            <div className='categorymenu' style={{ margin: '15vh 5vh 5vh' }}>
                <h1 onClick={() => {
                    setClone([...data]);
                }} className='allbycategory' style={{ display: 'inline-block' }}>{category?.name}</h1>
                {
                    category?.child?.map((e: any, i: number) => {
                        return <Button onClick={() => {
                            filterBySub(e.name);
                        }} key={i} size='lg' variant='info'>{e.name}</Button>;
                    })
                }
            </div>
            <div className='allproduct' style={{ height: '55vh', marginLeft: '5vh' }}>
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