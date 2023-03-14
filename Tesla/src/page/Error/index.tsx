import './style.css';

export const Error: React.FC = (): JSX.Element => {
    return (
        <div className='error'>
            <div>
                <h1 style={{ fontSize: '100px', fontWeight: '100' }}>404</h1>
                <h4 style={{ fontSize: '50px', fontWeight: '100' }}>Page not found</h4>
                <div className='errorfooter'>
                    <a href="https://www.tesla.com/inventory/new/ms?arrangeby=relevance&zip=95113&range=200">Existing Investory</a>
                    <a href="https://www.tesla.com/tradein">Trade-in</a>
                    <a href="https://www.tesla.com/powerwall">Powerwall</a>
                    <a href="https://www.tesla.com/energy">Energy</a>
                    <a href="https://www.tesla.com/findus?v=2&bounds=57.77332393440605%2C29.581053499999975%2C16.08589156299476%2C131.885741&zoom=3&filters=store%2Cservice%2Csupercharger%2Cdestination%20charger%2Cbodyshop%2Cparty">Find Us</a>
                    <a href="https://www.tesla.com/customer-stories">Customer Stories</a>
                    <a href="https://www.tesla.com/videos">Videos</a>
                    <a href="https://www.tesla.com/support">Support</a>
                    <a href="https://www.tesla.com/updates">Get Newsletter</a>
                </div>
            </div>
        </div>
    );
};