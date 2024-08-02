import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
import WriteBlog from "./pages/WriteBlog";
import Notification from "./pages/Notification";
import Blog from "./pages/Blog";
import PrivateRoute from "./components/PrivateRoute";
import Applayout from "./components/Applayout";
import PageNotFound from "./pages/PageNotFound";
import Header from "./features/Header/Header";
import Toaster from "./components/Toaster";
import Profile from "./features/Dashboard/Profile";
import React from "react";
import Spinner from "./components/Spinner";
import DashBlogs from "./features/Dashboard/DashBlogs";
import DashNotifications from "./features/Dashboard/DashNotifications";
import UpdateProfile from "./features/Settings/UpdateProfile";
import UpdatePassword from "./features/Settings/UpdatePassword";

const LazySearch = React.lazy(() => import("./pages/SearchPage"));
const LazyBlogs = React.lazy(() => import("./pages/Blogs"));

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route
            element={
              <PrivateRoute>
                <Applayout />
              </PrivateRoute>
            }
          >
            <Route path="/write" element={<WriteBlog />} />
            <Route path="write/:blogId" element={<WriteBlog />} />
            <Route path="notification" element={<Notification />} />
            <Route path="dashboard" element={<Dashboard />}>
              <Route index element={<DashBlogs />} />
              <Route path="notifications" element={<DashNotifications />} />
            </Route>
            <Route path="settings" element={<Dashboard />}>
              <Route path="updateprofile" element={<UpdateProfile />} />
              <Route path="updatepassword" element={<UpdatePassword />} />
            </Route>
          </Route>

          <Route
            path="/"
            element={
              <React.Suspense fallback={<Spinner />}>
                <LazyBlogs />
              </React.Suspense>
            }
          />
          <Route path="blog/:blogId" element={<Blog />} />
          <Route path="profile/:username" element={<Profile />} />
          <Route path="signup" element={<Signup />} />
          <Route path="signin" element={<Signin />} />
          <Route
            path="/search/:query"
            element={
              <React.Suspense fallback={<Spinner />}>
                <LazySearch />
              </React.Suspense>
            }
          />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
      <Toaster />
    </>
  );
}

export default App;
