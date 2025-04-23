export const registerUser = (login, password) => {
  return async (dispatch) => {
    try {
      const params = new URLSearchParams({ login, password }).toString();
      console.log("Sending data to server:", params); 

      const response = await fetch(`/api/auth/register?${params}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded", 
        },
        credentials: "include", 
      });

      if (!response.ok) {
        const error = await response.text(); 
        throw new Error(error || "Ошибка регистрации");
      }


      dispatch({ type: "REGISTER_SUCCESS" });
      return { success: true }; 
    } catch (error) {

      dispatch({ type: "REGISTER_FAILURE", payload: error.message });
      console.error("Ошибка регистрации:", error.message);
      return { success: false, message: error.message };
    }
  };
};