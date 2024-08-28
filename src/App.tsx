import { useEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';

import Loader from './common/Loader';
import PageTitle from './components/PageTitle';
import SignIn from './pages/Authentication/SignIn';
import SignUp from './pages/Authentication/SignUp';
import Dashboard from './pages/Dashboard/Dashboard';
import Tournaments from './pages/Tournaments/Tournaments';
import DepositRequests from './pages/DepositRequests/DepositRequests';
import DepositHistory from './pages/DepositRequests/DepositHistory';
import WithdrawRequests from './pages/WithdrawRequests/WithdrawRequests';
import WithdrawHistory from './pages/WithdrawRequests/WithdrawHistory';
import Announcements from './pages/Announcements/Announcements';
import AllUsers from './pages/AllUsers/AllUsers';
import PrivateRoute from './hoc/PrivateRoute';

function App() {
  const [loading, setLoading] = useState<boolean>(true);
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <>
      <Routes>
        <Route
          index
          element={
            <PrivateRoute>
              <PageTitle title="TrySports Dashboard" />
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/tournaments"
          element={
            <PrivateRoute>
              <PageTitle title="Manage Tournaments" />
              <Tournaments />
            </PrivateRoute>
          }
        />
        <Route
          path="/deposit-requests"
          element={
            <PrivateRoute>
              <PageTitle title="Tables" />
              <DepositRequests />
            </PrivateRoute>
          }
        />
        <Route
          path="/deposit-history"
          element={
            <PrivateRoute>
              <PageTitle title="Deposit History" />
              <DepositHistory />
            </PrivateRoute>
          }
        />
        <Route
          path="/withdraw-requests"
          element={
            <PrivateRoute>
              <PageTitle title="Withdraw Requests" />
              <WithdrawRequests />
            </PrivateRoute>
          }
        />
        <Route
          path="/withdraw-history"
          element={
            <PrivateRoute>
              <PageTitle title="Withdraw History" />
              <WithdrawHistory />
            </PrivateRoute>
          }
        />
        <Route
          path="/announcement"
          element={
            <PrivateRoute>
              <PageTitle title="Announcements" />
              <Announcements />
            </PrivateRoute>
          }
        />

        <Route
          path="/all-app-users"
          element={
            <PrivateRoute>
              <PageTitle title="All App Users" />
              <AllUsers />
            </PrivateRoute>
          }
        />

        <Route
          path="/manage-admins"
          element={
            <PrivateRoute>
              <PageTitle title="Signup" />
              <SignUp />
            </PrivateRoute>
          }
        />

        <Route
          path="/auth/signin"
          element={
            <>
              <PageTitle title="Signin" />
              <SignIn />
            </>
          }
        />
      </Routes>
    </>
  );
}

export default App;
