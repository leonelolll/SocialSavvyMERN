import './App.css';
import FAQ from "./faq/faq.js"
import Helpdesk from "./Helpdesk/Helpdesk.js"

import {RouterProvider, createBrowserRouter} from "react-router-dom"


function App() {
  const route = createBrowserRouter([
    {
      path:"/",
      element:<Helpdesk/>
    },
  ]);
  
  return (
    <div className="App">
      <RouterProvider router={route}></RouterProvider>
    </div>
  );
}

export default App;
