import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { getMainProduct } from '../../features/mainProduct/mainProductSlice';
import { useEffect } from 'react';
import './style.css';
import { Button } from 'react-bootstrap';

export const Model: React.FC = (): JSX.Element => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();
    const data = useSelector((state: any) => state.mainProduct.product);

    useEffect(() => {
        const pathname = location.pathname.split('/model/')[1];
        dispatch(getMainProduct(pathname)).then((res: any) => null).catch((e: any) => null);
    }, [location]);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className='model'>
            <section style={{ backgroundImage: `url(${data[0]?.mainPic[0]})`, backgroundPosition: 'center', height: '100vh', backgroundSize: 'cover', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '50vh' }}>
                <h1 style={{ color: location.pathname == '/model/solarroof' ? 'whitesmoke' : 'black', fontSize: '50px' }}>{data[0]?.name}</h1>
                <div className='modelinfo'>
                    {
                        location.pathname == '/model/solarroof' || location.pathname == '/model/solarpanels' ?
                            <>
                                <div>
                                    <h3>Beautiful <br />Solar</h3>
                                </div>
                                <div>
                                    <h3>Tile <br /> Warranthy</h3>
                                </div>
                                <div>
                                    <h3>Outage <br /> Protection</h3>
                                </div>
                            </> :
                            <>
                                <div>
                                    <h2>{data[0]?.range}</h2>
                                    <h3>Range</h3>
                                </div>
                                <div>
                                    <h2>{data[0]?.mph}</h2>
                                    <h3>0-60 mph</h3>
                                </div>
                                <div>
                                    <h2>{data[0]?.topspeed}</h2>
                                    <h3>Top Speed</h3>
                                </div>
                                <div>
                                    <h2>{data[0]?.peakpower}</h2>
                                    <h3>Peak Power</h3>
                                </div>
                            </>
                    }
                    <div>
                        <Button onClick={() => {
                            navigate('/buy/' + data[0]?.path);
                        }}>Order now</Button>
                    </div>
                </div>
            </section>
            <section className='modelinfo2' >
                <div style={{ background: 'black', backgroundImage: `url(${data[0]?.mainPic[1]})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>

                </div>
                <div style={{ background: 'black', display: 'block', textAlign: 'center', padding: '20px 100px' }}>
                    <h1 style={{ fontSize: '50px' }}>About {data[0]?.name}</h1>
                    <h4 style={{ fontSize: '30px' }}>{data[0]?.desc}</h4>
                </div>
            </section>
        </div>
    );
};