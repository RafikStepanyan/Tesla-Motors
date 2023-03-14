import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useRef } from 'react';
import './style.css';
import { getAllProduct } from '../../features/product/productSlice';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

export const Shop: React.FC = (): JSX.Element => {
    const ref1 = useRef<any>(null);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const data = useSelector((state: any) => state.product.product);

    useEffect(() => {
        dispatch(getAllProduct()).then(() => null).catch(() => null);
    }, []);


    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div ref={ref1} className='shop'>
            <section style={{ height: '100vh', backgroundImage: `url('img/shopmain.png')`, backgroundSize: 'cover', display: 'flex', justifyContent: "center", alignItems: 'center' }}>
                <div className='shopmain' >
                    <h1 >Welcome to Tesla store</h1>
                    <br />
                    <h3 >Find useful gadgets <br /> for your home and car</h3>
                    <Button variant='light' size='lg' onClick={() => {
                        window.scrollTo(0, window.innerHeight);
                    }}>Go to shop</Button>
                </div>
            </section>
            <section style={{ height: '90vh', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <h1 style={{ padding: '15vh 5vh 5vh' }}>All products</h1>
                <div className='allproduct'>
                    {
                        data?.map((e: any) => {
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
            </section>
        </div>
    );
};