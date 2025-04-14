import { BrowserRouter, Routes, Route } from 'react-router-dom';
import CustomToast from '../shared/ui/CustomToast';
import ScrollToTop from '../shared/utils/ScrollToTop';
import Header from '../widgets/layout/Header';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Join from '../pages/Join';
import Sponsor from '../pages/Sponsor';

function App() {
  return (
    <>
      <BrowserRouter>
        <ScrollToTop />
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="join" element={<Join />} />
          <Route path="sponsor" element={<Sponsor />} />
        </Routes>
        <CustomToast />
      </BrowserRouter>
    </>
  );
}

export default App;
