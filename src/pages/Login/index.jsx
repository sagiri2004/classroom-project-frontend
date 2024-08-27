import styles from "./Login.module.scss";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import Button from "~/components/Button";
import { loginUser } from "~/api/userApi";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  console.log(styles);

  const handleLogin = (event) => {
    event.preventDefault();
    const user = {
      username: username,
      password: password, 
    };
    loginUser(user, dispatch, navigate);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles["form-image"]}></div>

        <div className={styles.form}>
          <div className={styles.title}>Login</div>
          <form onSubmit={handleLogin} className={styles["form-submit"]}>
            <div className={styles["form-input"]}>
              <input
                type="text"
                id="username"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className={styles["form-input"]}>
              <input
                type="password"
                id="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className={styles["form-inline"]}>
              <div className={styles["form-checkbox"]}>
                <input type="checkbox" id="remember" />
                <label>Remember me</label>
              </div>
              <div className={styles["form-link"]}>
                <a href="/forgot-password">Forgot password?</a>
              </div>
            </div>
            <div className={styles["form-button"]}>
              <Button large login type="submit">
                Login
              </Button>
            </div>
          </form>
          <div className={styles["form-button-register"]}>
            <label>Don't have an account?</label>
            <Button noWrapper>Sign up</Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;