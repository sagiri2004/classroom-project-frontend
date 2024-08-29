import styles from "./Authentication.module.scss";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { motion } from "framer-motion";

import LoginForm from "./LoginForm";
import SignUpForm from "./SignUpForm";

function AuthenticationPage() {
  const location = useLocation();
  const [isLogin, setIsLogin] = useState(location.pathname === "/login");

  // Animation variants for Framer Motion
  const variants = {
    login: { x: 0 },
    signup: { x: "100%" },
  };

  const formVariants = {
    login: { opacity: 1, x: 0 },
    signup: { opacity: 1, x: "-100%" },
  };

  const handleToggle = () => {
    setIsLogin((isLogin) => !isLogin);
    window.history.pushState({}, "", isLogin ? "/signup" : "/login"); // Cập nhật URL mà không điều hướng
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        {/* Animated image container */}
        <motion.div
          className={`${styles["form-image"]} ${
            !isLogin ? styles["form-image-animation-complete"] : ""
          }`}
          initial={isLogin ? "login" : "signup"}
          animate={isLogin ? "login" : "signup"}
          variants={variants}
          transition={{ duration: 0.5 }}
        />

        {/* Animated form container */}
        <motion.div
          className={styles["form"]}
          initial={isLogin ? "login" : "signup"}
          animate={isLogin ? "login" : "signup"}
          variants={formVariants}
          transition={{ duration: 0.5 }}
        >
          {isLogin ? (
            <LoginForm handleToggle={handleToggle} />
          ) : (
            <SignUpForm handleToggle={handleToggle} />
          )}
        </motion.div>
      </div>
    </div>
  );
}

export default AuthenticationPage;
