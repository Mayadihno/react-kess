import { Route, Routes } from "react-router-dom";
import "./App.css";
import Footer from "./Components/Footer/Footer";
import Navbar from "./Components/Navbar/Navbar";
import Home from "./Home/Home";
import OurSport from "./Pages/OurSport/OurSport";
import Trending from "./Pages/Trending/Trending";
import Create from "./Create/Create";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProtectedRoute from "./Hooks/ProtectedRoute";
import Admin from "./Admin/Admin";
import Gallery from "./Gallery/Gallery";
import Video from "./Video/Video";
import Fixtures from "./Fixtures/Fixtures";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/our-sport" element={<OurSport />} />
        <Route path="/trending-news" element={<Trending />} />
        <Route path="/create-account" element={<Create />} />
        <Route path="/*" element={<ProtectedRoute />}>
          <Route path="/*/fixturesRoute" element={<Fixtures />} />
          <Route path="/*/admin" element={<Admin />} />
          <Route path="/*/photo-gallery" element={<Gallery />} />
          <Route path="/*/videos-gallery" element={<Video />} />
        </Route>
      </Routes>
      <Footer />
      <ToastContainer position="top-left" theme="dark" />
    </>
  );
}

export default App;
