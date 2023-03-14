import { Outlet } from 'react-router-dom';
import { Footer } from '../../component/Footer';
import { Menu } from '../../component/Menu';

export const Layout: React.FC = (): JSX.Element => {

    return (
        <div>
            <Menu />
            <Outlet />
            <Footer />
        </div>
    );
};