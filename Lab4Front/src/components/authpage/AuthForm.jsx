import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logOutUser, loginUser } from "../../redux/actions/authActions";
import { registerUser } from "../../redux/actions/userActions";
import {
  showLoginAlert,
  showPasswordAlert,
  showRegisterAlert,
  showAuthAlert,
} from "./alertMessage";

function AuthForm() {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [isRegister, setIsRegister] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Рефы для фокуса
  const inputLogin = useRef(null);
  const inputPassword = useRef(null);

  const validateLogin = (login) => {
    const loginRegex = /^[a-zA-Z][a-zA-Z0-9._]{2,15}$/;
    if (!loginRegex.test(login)) {
      showLoginAlert();
      setLogin("");
      return false;
    }
    return true;
  };

  const validatePassword = () => {
    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]{6,}$/;
    if (!passwordRegex.test(password)) {
      showPasswordAlert();
      setPassword("");
      return false;
    }
    return true;
  };

  // Общая функция для отправки данных
  const handleSubmit = async (event, action, isRegister) => {
    event.preventDefault();
    console.log("Submit action started:", { login, password });
  
    if (!login.trim() || !password.trim()) {
      console.error("Логин и пароль не должны быть пустыми");
      showAuthAlert("Логин и пароль не должны быть пустыми");
      return;
    }
  
    if (isRegister) {
      const isLoginValid = validateLogin(login);
      const isPasswordValid = validatePassword(password);
      if (!isLoginValid || !isPasswordValid) {
        return; // Если валидация не прошла, запрос не отправляется
      }
    }
  
    try {
      const result = await dispatch(action);
      console.log("Action result:", result);
  
      if (result.success) {
        navigate("/mainpage");
      } else {
        console.error("Ошибка:", result.message);
        showAuthAlert(result.message);
      }
    } catch (error) {
      console.error("Ошибка в handleSubmit:", error.message);
      showAuthAlert(error.message);
    }
  };
  

  const handleSubmitAuth = (event) => {
    event.preventDefault();
    handleSubmit(event, loginUser(login, password), false); // Передаём thunk напрямую
  };
  
  const handleSubmitRegister = (event) => {
    event.preventDefault();
    handleSubmit(event, registerUser(login, password), true); // Передаём thunk напрямую
  };

  const handleChangeLogin = (event) => {
    setLogin(event.target.value);
  };

  useEffect(() => {
    inputLogin.current.focus();
  }, []);

  return (
    <div className="row divAuth">
      <form
        className="col formAuth"
        onSubmit={isRegister ? handleSubmitRegister : handleSubmitAuth}
      >
        <div className="row">
          <div className="input-field col s12">
            <input
              id="login"
              type="text"
              className="validate"
              placeholder="Логин"
              value={login}
              onChange={handleChangeLogin}
              ref={inputLogin}
            />
          </div>
        </div>
        <div className="row">
          <div className="input-field col s12">
            <input
              id="password"
              type="password"
              placeholder="Пароль"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              ref={inputPassword}
            />
          </div>
        </div>
        <div className="button-container">
          <button
            className="btn waves-effect waves-light pink lighten-3"
            type="button"
            onClick={handleSubmitRegister}
          >
            Зарегистрироваться
          </button>
          <button
            className="btn waves-effect waves-light pink lighten-3"
            type="button"
            onClick={handleSubmitAuth}
          >
            Войти в аккаунт
          </button>
        </div>
      </form>
    </div>
  );
}

export { AuthForm };
