import SideNav from "../components/SideNav";
import Subscription from '../components/Subscription';
import TopBar from "../components/TopBar";
import React, { useEffect } from 'react';
// import '../App.css';

export default function SubscriptionPage(){
    return(
        <div>
            <SideNav />
            <div className="background">
                <TopBar />
                <Subscription />
            </div>
        </div>
    )
}