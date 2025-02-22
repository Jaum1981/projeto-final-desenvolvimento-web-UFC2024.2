document.addEventListener("DOMContentLoaded", () => {
  const userData = localStorage.getItem("user");

  if (userData) {
    const user = JSON.parse(userData);

    const userNameElement = document.getElementById("userName");
    if (userNameElement && user.username) {
      userNameElement.textContent = user.username;
    }

    const userPhotoElement = document.getElementById("userPhoto");
    if (userPhotoElement) {
      userPhotoElement.src =
        user.userimgURL || "../src/media/avatar-de-perfil.png";
    }
  }

  // logout
  const logoutBtn = document.getElementById("logoutBtn");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      //confirmação
      const confirmLogout = confirm("Deseja realmente sair?");
      if (confirmLogout) {
        //eemove os dados do usuário do localStorage
        localStorage.removeItem("jwt");
        localStorage.removeItem("user");

        window.location.href = "login-registerScreen.html";
      }
    });
  }
});
