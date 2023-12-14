import React from "react";
import WelcomePage from "../components/WelcomePage";
import Blogs from "../components/Blogs";
import Footer from "../components/Footer";
import Navbar from "../components/NavBar/NavBar";
function Home() {
  return (
    <div>
      <Navbar />
      <WelcomePage />
      <Blogs />
      <Footer />
    </div>
  );
}

export default Home;
