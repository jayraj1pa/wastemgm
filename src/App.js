import './App.css';
import Body from './Home/Body';
import Auth from './Components/Auth/Auth';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './Components/Auth/Home';
import Authe from './Components/Auth/Authe';
import WasteReporting from './Components/fecilities/WasteReporting';
import Scheduling from './Components/fecilities/Scheduling';
import Shopping from './Components/fecilities/Shopping';
import Community from './Components/fecilities/Community';
import Seg from './Components/fecilities/Seg';
import Eco from './Components/Ecoprofile/Eco';
import EcoReporting from './Components/Ecoprofile/EcoReporting';
import EcoScheduling from './Components/Ecoprofile/EcoScheduling'
import AdminReport from './Components/Admin/AdminReport';
import AdminScheduling from './Components/Admin/AdminScheduling';
import AdminUser from './Components/Admin/AdminUser';
import AdminCommunity from './Components/Admin/AdminCommunity';
import AdminShopping from './Components/Admin/AdminShopping';
import Logout from './Components/Admin/Logout';
import PaymentForm from './Components/Ecoprofile/Payment';
import FeedBack from './Components/FeedBack';
import AdminFeedback from './Components/Admin/AdminFeedback';
import AdminCheckout from './Components/Admin/AdminCheckout';

function App() {
  return (
    <div className="App">
 <BrowserRouter>

<Routes> 
<Route path={'/'} element={<Body/>} />   
<Route path={'/auth'} element={<Auth/>}/>
<Route path="/login" element={<Authe />} />
<Route path="/register" element={<Auth  />} />
<Route path='/loginhome' element={<Home/>}/>
<Route path='/wasteReporting' element={<WasteReporting/>}/>
<Route path='/wasteScheduling' element={<Scheduling/>}/>
<Route path='/shopping' element={<Shopping/>}/>
<Route path='/community' element={<Community/>}/>
<Route path='/segregation' element={<Seg/>}/>
<Route path='/ecoprofile' element={<Eco />} />
<Route path='/ecoreport' element={<EcoReporting/>}/>
<Route path='/ecoschedule' element={<EcoScheduling/>}/>
<Route path='/adminReport' element={<AdminReport/>}/>
<Route path='/adminScheduling' element={<AdminScheduling/>}/>
<Route path='/adminUsers' element={<AdminUser/>}/>
<Route path='/adminCommunity' element={<AdminCommunity/>}/>
<Route path='/adminShopping' element={<AdminShopping/>}/>
<Route path='/dashboard' element={<Logout/>}/>
<Route path='/payment' element={<PaymentForm/>}/>
<Route path='/feedback' element={<FeedBack/>}/>
<Route path='/adminFeedback' element={<AdminFeedback/>}/>
<Route path='/adminCheckout' element={<AdminCheckout/>}/>


</Routes>

</BrowserRouter> 
    </div>
  );
}

export default App;
