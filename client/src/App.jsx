import { BrowserRouter, Route, Routes } from "react-router-dom";
import About from "./pages/About";
import Dashboard from "./pages/Dashboard";
// import Blogs from "";
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
import WriteBlog from "./pages/WriteBlog";
import Notification from "./pages/Notification";
import Settings from "./pages/Settings";
import Blog from "./pages/Blog";
import PrivateRoute from "./components/PrivateRoute";
import Applayout from "./components/Applayout";
import PageNotFound from "./pages/PageNotFound";
import Header from "./features/Header/Header";
import Toaster from "./components/Toaster";
import Profile from "./features/Dashboard/Profile";
import React from "react";
import Spinner from "./components/Spinner";
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
            <Route path="about" element={<About />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="/write" element={<WriteBlog />} />
            <Route path="write/:blogId" element={<WriteBlog />} />
            <Route path="notification" element={<Notification />} />
            <Route path="settings" element={<Settings />} />
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
