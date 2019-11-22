import Vue from 'vue';
import VueRouter from 'vue-router';

import Login from '@/components/pages/Login';
import Ad from '@/components/pages/Ad';
import Customer from '@/components/pages/Customer';
import CustomerProduct from '@/components/pages/CustomerProduct';
import CustomerProductSearch from '@/components/pages/CustomerProductSearch';
import CustomerCoupon from '@/components/pages/CustomerCoupon';
import CustomerCart from '@/components/pages/CustomerCart';
import CustomerFavorite from '@/components/pages/CustomerFavorite';
import CustomerOrder from '@/components/pages/CustomerOrder';
import Admin from '@/components/pages/Admin';
import AdminProduct from '@/components/pages/AdminProduct';
import AdminCoupon from '@/components/pages/AdminCoupon';
import AdminOrder from '@/components/pages/AdminOrder';
import Dashboard from '@/components/Dashboard';



Vue.use(VueRouter);

export default new VueRouter({
    routes:[
        {
            path: '*',
            redirect: '/product/all',
        },
        {
            path:'/',
            component: Dashboard,
            children: [
                {
                    path:'',
                    component: Customer,
                    children: [
                        {
                            path:'',
                            name: 'Ad',
                            component: Ad,
                        },
                        {
                            path: 'coupon',
                            name: 'CustomerCoupon',
                            component: CustomerCoupon,
                        },
                        {
                            path: 'favorites',
                            name: 'CustomerFavorite',
                            component: CustomerFavorite,
                        },
                        {
                            path: 'cart',
                            name: 'CustomerCart',
                            component: CustomerCart,
                        },
                        {
                            path: 'order',
                            name: 'CustomerOrder',
                            component: CustomerOrder,
                            children: [
                                {
                                    path: ':orderId',
                                    name: 'CustomerOrder',
                                    component: CustomerOrder,
                                }
                            ]
                        },
                        {
                            path: 'products/:keyword',
                            name: 'CustomerProduct-Search',
                            component: CustomerProductSearch,
                        },
                        {
                            path:'product',
                            name: 'CustomerProduct',
                            component: CustomerProduct,
                            children: [
                                {
                                    path: 'christmas',
                                    name: 'Christmas',
                                    component: CustomerProduct,
                                    meta: { scroll: true },
                                },
                                {
                                    path: 'halloween',
                                    name: 'Halloween',
                                    component: CustomerProduct,
                                    meta: { scroll: true },
                                },
                                {
                                    path: 'all',
                                    name: 'All',
                                    component: CustomerProduct,
                                    meta: { scroll: true },
                                },
                                {
                                    path: 'groceries',
                                    name: 'Groceries',
                                    component: CustomerProduct,
                                    meta: { scroll: true },
                                },
                                {
                                    path: 'foods',
                                    name: 'Foods',
                                    component: CustomerProduct,
                                    meta: { scroll: true },
                                },
                                {
                                    path: 'toys',
                                    name: 'Toys',
                                    component: CustomerProduct,
                                    meta: { scroll: true },
                                },
                                {
                                    path: 'decorations',
                                    name: 'Decorations',
                                    component: CustomerProduct,
                                    meta: { scroll: true },
                                },
                            ]
                        },
                    ]
                },
                {
                    path: '/login',
                    name: 'Login',
                    component: Login,
                },
                {
                    path:'admin',
                    component: Admin,
                    children: [
                        {
                            path:'',
                            name: 'AdminProduct',
                            component: AdminProduct,
                            meta: { requiresAuth: true },
                        },
                        {
                            path:'coupon',
                            name: 'AdminCoupon',
                            component: AdminCoupon,
                            meta: { requiresAuth: true },
                        },
                        {
                            path:'order',
                            name: 'AdminOrder',
                            component: AdminOrder,
                            meta: { requiresAuth: true },
                        },
                    ],
                },
            ]
        }
    ]
});