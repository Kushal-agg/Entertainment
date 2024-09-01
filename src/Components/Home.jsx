import React, { useState } from "react";
import "./Home.scss";
import { BsPersonFillAdd } from "react-icons/bs";
import { CiLogin } from "react-icons/ci";
import Footer from "./Footer";
import LoginModal from "./LoginModal.jsx";
import SignupModal from "./SignUpModal.jsx";

const Home = () => {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isSignupModalOpen, setIsSignupModalOpen] = useState(false);

  const openLoginModal = () => setIsLoginModalOpen(true);
  const closeLoginModal = () => setIsLoginModalOpen(false);

  const openSignupModal = () => setIsSignupModalOpen(true);
  const closeSignupModal = () => setIsSignupModalOpen(false);

  return (
    <section className="home">
      <div
        className="banner"
        style={{
          backgroundImage: `url(/back.png)`,
        }}
      >
        <div>
          <button onClick={openLoginModal}>
            Login <CiLogin />
          </button>
          <button onClick={openSignupModal}>
            Sign Up <BsPersonFillAdd />
          </button>
        </div>
      </div>
      {isLoginModalOpen && <LoginModal onClose={closeLoginModal} />}
      {isSignupModalOpen && <SignupModal onClose={closeSignupModal} />}
      <Footer />
    </section>
  );
};

export default Home;
