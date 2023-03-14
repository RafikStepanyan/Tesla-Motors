import './style.css';
import { Link } from 'react-router-dom';

export const Dashboard: React.FC = (): JSX.Element => {

    return <div className='dashboard'>
        <h1>Dashboard</h1>
        <div>
            <img src="https://tesla-cdn.thron.com/delivery/public/image/tesla/19cd4858-858c-4e41-adcb-a7399da113a8/aaovse/std/636x300/dscf6059-4" alt="" />
            <Link to={'/'}>Order Tesla</Link>
        </div>
        <div>
            <img src="https://digitalassets-shop.tesla.com/image/upload/f_auto,q_auto/v1/content/dam/tesla/teslaweb/homepage/Wall_Connector_banner_web.jpg" alt="" />
            <Link to={'/shop'}>To the shop</Link>
        </div>
    </div>;
};