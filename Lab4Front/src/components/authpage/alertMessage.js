import Swal from "sweetalert2";

export function showLoginAlert() {
  Swal.fire({
    title: "Некорректный логин",
    html: `
      <p>Логин должен соответствовать следующим правилам:</p>
      <ul style="text-align: center;">
        <li>      Только латинские буквы, цифры, точки и символы подчеркивания (<code>_</code>).</li>
        <li>    Начинаться с буквы.</li>
        <li>     Длина от 3 до 16 символов.</li>
      </ul>
    `,
    icon: "warning",
    confirmButtonText: "Понятно",
  });
}
export function showPasswordAlert() {
  Swal.fire({
    title: "Неверный пароль",
    html: `
          <p>Пароль должен соответствовать следующим требованиям:</p>
          <ul style="text-align: left;">
            <li>Минимум 6 символов.</li>
            <li>Должен содержать хотя бы одну цифру.</li>
            <li>Должен содержать хотя бы одну букву.</li>
          </ul>
        `,
    icon: "error",
    confirmButtonText: "Понятно",
  });
}

export function showRegisterAlert() {
    Swal.fire({
      title: "Ошибка регистрации",
      html: `
            <p>Пользователь с таким именем уже существует</p>
          `,
      icon: "error",
      confirmButtonText: "Понятно",
    });
  }

  export function showAuthAlert() {
    Swal.fire({
      title: "Ошибка авторизации",
      html: `
            <p>Вы ввели неверный пароль</p>
          `,
      icon: "error",
      confirmButtonText: "Понятно",
    });
  }
