import SideNav from "../components/SideNav";
import Subscription from '../components/Subscription';
import TopBar from "../components/TopBar";
import React, { useEffect } from 'react';
import Sidebar from "../shared/Sidebar";
// import '../App.css';

export default function SubscriptionPage(){
    return(
        <div>
            <Sidebar />
            <div className="background">
                <TopBar />
                <Subscription />
            </div>
        </div>
    )
}
