import { BrowserRouter, Routes, Route } from 'react-router-dom';
import CustomToast from '../shared/ui/CustomToast';
import ScrollToTop from '../shared/utils/ScrollToTop';
import Header from '../widgets/layout/Header';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Join from '../pages/Join';
import SponsorPrompt from '../pages/SponsorPrompt';
import UserMyCard from '../pages/UserMyCard';
import UserMyPage from '../pages/UserMyPage';
import MyPageView from '../features/user/myPage/ui/MyPageView';
import MyPageEdit from '../features/user/myPage/ui/MyPageEdit';
import UserPayment from '../pages/UserPayment';
import UserBenefit from '../pages/UserBenefit';
import { PrivateRoute, PublicRoute, RoleRoute } from './routes';
import ShopHome from '../pages/ShopHome';
import ShopProductDetail from '../pages/ShopProductDetail';

function App() {
  return (
    <>
      <BrowserRouter>
        <ScrollToTop />
        <Header />
        <Routes>
          {/** 로그인 전 페이지 */}
          <Route path="/" element={<Home />} />
          <Route element={<PublicRoute />}>
            <Route path="/login" element={<Login />} />
            <Route path="/join" element={<Join />} />
          </Route>
          {/** 쇼핑몰 페이지 */}
          <Route path="/shop">
            <Route index element={<ShopHome />} />
            <Route path=":productId" element={<ShopProductDetail />} />
          </Route>
          <Route element={<PrivateRoute />}>
            {/** 협찬사 페이지 */}
            <Route
              element={
                <RoleRoute allowedRole="SPONSOR" message="협찬사만 접근 가능한 페이지입니다." />
              }
            >
              <Route path="/sponsor" element={<Home />} />
              <Route path="/sponsor/prompt" element={<SponsorPrompt />} />
            </Route>

            {/** 일반유저 페이지 */}
            <Route
              element={<RoleRoute allowedRole="USER" message="유저만 접근 가능한 페이지입니다." />}
            >
              <Route path="/mycard" element={<UserMyCard />} />
              <Route path="/mypage" element={<UserMyPage />}>
                <Route index element={<MyPageView />} />
                <Route path="edit" element={<MyPageEdit />} />
              </Route>
              <Route path="/payment" element={<UserPayment />} />
              <Route path="/benefit" element={<UserBenefit />} />
            </Route>
          </Route>
        </Routes>
        <CustomToast />
      </BrowserRouter>
    </>
  );
}

export default App;
