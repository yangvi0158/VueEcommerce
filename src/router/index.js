import Vue from 'vue';
import VueRouter from 'vue-router';

import Dashboard from '@/components/pages/Dashboard';
import Login from '@/components/pages/Login';

import Customer from '@/components/pages/Customer/Customer';
import CustomerProduct from '@/components/pages/Customer/CustomerProduct';
import CustomerProductSearch from '@/components/pages/Customer/CustomerProductSearch';
import CustomerCoupon from '@/components/pages/Customer/CustomerCoupon';
import CustomerCart from '@/components/pages/Customer/CustomerCart';
import CustomerFavorite from '@/components/pages/Customer/CustomerFavorite';
import CustomerOrder from '@/components/pages/Customer/CustomerOrder';
import Ad from '@/components/pages/Customer/Ad';

import Admin from '@/components/pages/Admin/Admin';
import AdminProduct from '@/components/pages/Admin/AdminProduct';
import AdminCoupon from '@/components/pages/Admin/AdminCoupon';
import AdminOrder from '@/components/pages/Admin/AdminOrder';




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
                                    path: 'items',
                                    name: 'Items',
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