import Content from "../analysisComponents/engagement";
import SideBar from "../analysisComponents/sidebar";
import TopBar from "../analysisComponents/topbar";
import React, { useEffect } from 'react';
import '../App.css';

export default function Analysis(){
      
      useEffect(() => {
        // Function to dynamically load scripts
        const loadScript = (src) => {
          const script = document.createElement('script');
          script.src = src;
          script.async = true;
          document.body.appendChild(script);
        };
    
        // Load external scripts
        loadScript('https://cdn.jsdelivr.net/npm/chart.js');
        loadScript('https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.4.0/jspdf.umd.min.js');
        loadScript('https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js');
        loadScript(process.env.PUBLIC_URL + '/analysis.js'); // Assuming analysis.js is in the public folder
      }, []);

    return(
        <div>
            <SideBar />
            <div className="background">
                <TopBar />
                <Content />
            </div>
        </div>
    )
}