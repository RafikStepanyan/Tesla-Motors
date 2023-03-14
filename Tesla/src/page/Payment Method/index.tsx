import './style.css';
import { Button } from 'react-bootstrap';

export const PaymentMethod: React.FC = (): JSX.Element => {
    return <div style={{ height: '60vh' }} className='dashboard'>
        <h1>Payment Method</h1>
        <div style={{ height: 'auto', padding: '10px' }}>
            <img style={{ height: '190px' }} src="https://tesla-cdn.thron.com/delivery/public/image/tesla/bb0d2e9a-ada7-401f-bd47-daeff3fd033d/o0vzns/std/0x0/charging-supercharger" alt="" />
            <h3>Get Started</h3>
            <p>Set up simple and convenient charging</p>
            <Button style={{ width: '100%' }} variant='primary'>Add Card</Button>
        </div>
    </div>;
};