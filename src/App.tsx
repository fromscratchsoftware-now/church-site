import { BrowserRouter, Routes, Route } from "react-router-dom";  
import Index from "./pages/Index";  
import Testimonials from "./pages/Testimonials";  
import Sermons from "./pages/Sermons";  
import Events from "./pages/Events";

const App = () => (  
    <BrowserRouter basename={import.meta.env.BASE_URL}>  
      <Routes>  
        <Route path="/" element={<Index />} />  
        <Route path="/testimonials" element={<Testimonials />} />  
        <Route path="/sermons" element={<Sermons />} />  
        <Route path="/events" element={<Events />} />  
      </Routes>  
    </BrowserRouter>  
);

export default App;
