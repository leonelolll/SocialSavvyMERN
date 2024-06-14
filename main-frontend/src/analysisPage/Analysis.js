import Content from "../analysisComponents/engagement";
import React, { useEffect } from 'react';
import '../App.css';
import './analysis.css'
import Layout from "../shared/Layout.jsx";

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
          <Layout/>
            <div className="background">
                <Content />
            </div>
        </div>
    )
}
