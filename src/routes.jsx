import React from 'react';
import { Route, Routes } from "react-router-dom"

import Login from './component/Auth/Login';
import ShortCutkeys from './component/util/ShortCutkeys';
import HelloWorld from './HelloWorld';
const Settings = React.lazy(()=> import('./container/Settings'));
const Home = React.lazy(()=> import('./container/Home'));
const Report = React.lazy(()=> import('./container/Report'))
const Vendor  =  React.lazy(()=> import('./component/vendor/Vendor'));
const TicketPage = React.lazy(()=> import('./component/Tickets/TicketPage'));
const NotFound =  React.lazy(()=> import('./component/util/NotFound'));
const UserProfile =  React.lazy(()=> import('./component/User/UserProfile'));
const AdminPage = React.lazy(()=> import('./component/Auth/AdminPage'));
const WatchList = React.lazy(()=> import('./container/WatchList'));
const UserList = React.lazy(()=> import('./component/Auth/UserList'));

const MainRoutes = () =>{
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="incident/:ticket" element={<TicketPage />} />
            <Route path="request/:cabNo" element={<TicketPage />} />
            <Route path='/watchlist' element={<WatchList/>} />
            <Route path="/report" element={<Report />} />
            <Route path='team/incident/:vendor' element={<Vendor />} />
            <Route path='team/request/:vendor' element={<Vendor />} />
            <Route path='/settings' element={<Settings/>} />
            <Route path='settings/:userId' element={<UserProfile/>} />
            <Route path='settings/admin-page' element={<AdminPage/>} />
            <Route path='/settings/admin-page/all-user' element={<UserList/>} />
            <Route path='/settings/shortcut-keys' element={<ShortCutkeys/>} />

            <Route path='auth/login' element={<Login/>} />
            <Route path='/helloworld' element={<HelloWorld/>} />
            <Route path="*" element={<NotFound/>} />
        </Routes>
    )
}

export default MainRoutes