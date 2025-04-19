import { BrowserRouter, Routes, Route } from 'react-router-dom';
import CustomToast from '../shared/ui/CustomToast';
import ScrollToTop from '../shared/utils/ScrollToTop';
import Header from '../widgets/layout/Header';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Join from '../pages/Join';
import Sponsor from '../pages/Sponsor';

import UserMyCard from '../pages/UserMyCard';
import UserMyPage from '../pages/UserMyPage';
import MyPageView from '../features/user/myPage/ui/MyPageView';
import MyPageEdit from '../features/user/myPage/ui/MyPageEdit';
import UserPayment from '../pages/UserPayment';
import UserBenefit from '../pages/UserBenefit';

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

          {/** 협찬사 페이지 */}
          <Route path="sponsor" element={<Sponsor />} />

          {/** 일반유저 페이지 */}
          <Route path="/mycard" element={<UserMyCard />} />
          <Route path="/mypage" element={<UserMyPage />}>
            <Route index element={<MyPageView />} />
            <Route path="edit" element={<MyPageEdit />} />
          </Route>
          <Route path="/payment" element={<UserPayment />} />
          <Route path="/benefit" element={<UserBenefit />} />
        </Routes>
        <CustomToast />
      </BrowserRouter>
    </>
  );
}

export default App;
