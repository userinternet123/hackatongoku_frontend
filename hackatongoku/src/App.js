import logo from './logo.svg';
import './styles/App.css';
import {Login} from '../src/components/Login';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {Dashboard} from '../src/components/dashboard';
import { LuchadorDetalle } from './components/luchadorDetalle';

function App() {
  return (
    <BrowserRouter>
    <div>
      <ToastContainer />
     <div className="App">
      
       <Routes>
        
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        {<Route path="/luchador/:luchador" element={<LuchadorDetalle />} />
        }
      </Routes>
    </div>
     </div>
      
      </BrowserRouter>
   
   
  );
}

export default App;
