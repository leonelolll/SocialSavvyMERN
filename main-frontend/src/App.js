import './App.css';
//import FAQ from "./faq/faq.js"
//import Helpdesk from "./Helpdesk/Helpdesk.js"
import Feedback from "./feedback/feedback.js"
import {RouterProvider, createBrowserRouter} from "react-router-dom"


function App() {
  const route = createBrowserRouter([
    {
      path:"/",
      element:<Feedback />
    },
  ]);
  
  return (
    <div className="App">
      <RouterProvider router={route}></RouterProvider>
    </div>
  );
}

export default App;
