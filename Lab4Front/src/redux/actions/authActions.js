export const logOutUser = () => {
  return async (dispatch) => {
    try {
      const response = await fetch("/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });
      if (!response.ok) {
        throw new Error("Не удалось выйти из аккаунта!");
      }
      dispatch({ type: "LOGOUT_SUCCESS" });
      return { success: true }; // Успех
    } catch (error) {
      dispatch({ type: "LOGOUT_FAILURE", payload: error.message });
      console.error(error.message);
      return { success: false, message: error.message };
    }
  };
};

export const loginUser = (login, password) => {
  return async (dispatch) => {
    try {
      const params = new URLSearchParams({ login, password }).toString();
      const response = await fetch(`/api/auth/login?${params}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded", // Указываем формат
        },
        credentials: "include",
      });

      if (!response.ok) {
        const error = await response.text(); // Читаем текст ошибки
        throw new Error(error || "Ошибка авторизации");
      }

      // Авторизация успешна
      dispatch({ type: "LOGIN_SUCCESS" });
      return { success: true }; // Успех
    } catch (error) {
      // Обработка ошибки
      dispatch({ type: "LOGIN_FAILURE", payload: error.message });
      console.error("Ошибка авторизации:", error.message);
      return { success: false, message: error.message }; // Возврат ошибки
    }
  };
};
