import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Dashboard from "./pages/Dashboard";
import Blogs from "./pages/Blogs";
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
import WriteBlog from "./pages/WriteBlog";
import ManageBlog from "./pages/ManageBlog";
import Notification from "./pages/Notification";
import PrivateRoute from "./components/PrivateRoute";
import Applayout from "./components/Applayout";
import PageNotFound from "./pages/PageNotFound";
import Header from "./features/Header/Header";

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
            <Route path="/" element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="/write" element={<WriteBlog />} />
            <Route path="manageblog" element={<ManageBlog />} />
            <Route path="notification" element={<Notification />} />
          </Route>
          <Route path="blogs" element={<Blogs />} />
          <Route path="signup" element={<Signup />} />
          <Route path="signin" element={<Signin />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
