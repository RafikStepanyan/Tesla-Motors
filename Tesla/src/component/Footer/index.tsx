import "./style.css";

export const Footer: React.FC = (): JSX.Element => {
    return (
        <div className='footer'>
            <a href='https://www.tesla.com/about'>Tesla © 2023</a>
            <a href='https://www.tesla.com/legal'>Privacy & Legal</a>
            <a href='https://service.tesla.com/vin-recall-search'>Vehicle Recalls</a>
            <a href='https://www.tesla.com/contact'>Contact</a>
            <a href='https://www.tesla.com/careers'>Career</a>
            <a href='https://www.tesla.com/blog'>News</a>
            <a href='https://engage.tesla.com/'>Engage</a>
            <a href='https://www.tesla.com/findus/list'>Locations</a>
        </div>
    );
};