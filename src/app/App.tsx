import { BrowserRouter, Routes, Route } from 'react-router-dom';
import CustomToast from '../shared/ui/CustomToast';
import ScrollToTop from '../shared/utils/ScrollToTop';
import Header from '../widgets/layout/Header';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Join from '../pages/Join';
import UserMyCard from '../pages/UserMyCard';

function App() {
  return (
    <>
      <BrowserRouter>
        <ScrollToTop />
        <Header />
        <Routes>
          {/** 로그인 전 페이지 */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/join" element={<Join />} />

          {/** 일반유저 페이지 */}
          <Route path="/mycard" element={<UserMyCard />} />
        </Routes>
        <CustomToast />
      </BrowserRouter>
    </>
  );
}

export default App;
