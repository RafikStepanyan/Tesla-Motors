import { useRoutes } from 'react-router-dom';
import { AddManager } from '../../page/Add Manager';
import { AddProduct } from '../../page/Add Product';
import { AllProduct } from '../../page/All Product';
import { AllUser } from '../../page/All User';
import { Basket } from '../../page/Basket';
import { Buy } from '../../page/Buy';
import { Dashboard } from '../../page/Dashboard';
import { EditProduct } from '../../page/Edit Product';
import { Error } from '../../page/Error';
import { Home } from '../../page/Home';
import { Layout } from '../../page/Layout';
import { Login } from '../../page/Login';
import { Model } from '../../page/Model';
import { MyProduct } from '../../page/My Product';
import { OrderHistory } from '../../page/Order history';
import { PaymentMethod } from '../../page/Payment Method';
import { Profile } from '../../page/Profile';
import { Settings } from '../../page/Profile Settings';
import { Register } from '../../page/Register';
import { Search } from '../../page/Search';
import { SeeProduct } from '../../page/See Product';
import { Shop } from '../../page/Shop';
import { ShopByCategory } from '../../page/ShopByCategory';

export const UseRoutes = () => {
    let element = useRoutes([
        {
            path: '/',
            element: <Layout />,
            children: [
                {
                    path: '',
                    element: <Home />
                },
                {
                    path: '/shop/search/:value',
                    element: <Search />
                },
                {
                    path: '/shop/seeproduct/:id',
                    element: <SeeProduct />
                },
                { path: 'model/:modelName', element: <Model /> },
                {
                    path: '/shop/shopbycategory/:name',
                    element: <ShopByCategory />
                },
                {
                    path: '/buy/:name',
                    element: <Buy />
                },

                {
                    path: '/profile',
                    element: <Profile />,
                    children: [
                        {
                            path: "",
                            element: <Dashboard />
                        },
                        {
                            path: "profile-settings",
                            element: <Settings />
                        },
                        {
                            path: 'edit-product/:id',
                            element: <EditProduct />
                        },
                        {
                            path: "payment-method",
                            element: <PaymentMethod />
                        },
                        {
                            path: "order-history",
                            element: <OrderHistory />
                        },
                        {
                            path: "add-product",
                            element: <AddProduct />
                        },
                        {
                            path: "my-product",
                            element: <MyProduct />,
                        },
                        {
                            path: "add-manager",
                            element: <AddManager />
                        },
                        {
                            path: "all-user",
                            element: <AllUser />
                        },
                        {
                            path: "all-product",
                            element: <AllProduct />
                        }

                    ]
                },
                {
                    path: '/login',
                    element: <Login />
                },
                {
                    path: '/register',
                    element: <Register />
                },
                {
                    path: '/shop',
                    element: <Shop />,
                    children: [
                        {
                            path: ":name",
                            // element:Category
                        },
                    ]
                },
                {
                    path: '/shop/basket',
                    element: <Basket />
                },
                {
                    path: '*',
                    element: <Error />
                },
            ]
        }
    ]);
    return element;
};