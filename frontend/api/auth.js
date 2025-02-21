const API_URL = "http://localhost:1337/api";

//Cadastro
document
  .getElementById("registerForm")
  .addEventListener("submit", async (event) => {
    event.preventDefault();

    const name = document.getElementById("registerName").value;
    const email = document.getElementById("registerEmail").value;
    const password = document.getElementById("registerPassword").value;
    const confirmPassword = document.getElementById(
      "registerConfirmPassword"
    ).value;

    if (password !== confirmPassword) {
      alert("As senhas não coincidem.");
      return;
    }

    try {
      const response = await fetch(`${API_URL}/auth/local/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: name,
          email: email,
          password: password,
        }),
      });

      const data = await response.json();

      if (data.jwt) {
        alert("Login realizado com sucesso!");
        localStorage.setItem("jwt", data.jwt);
        localStorage.setItem("user", JSON.stringify(data.user));
        window.location.href = "homeScreen.html";
      } else {
        alert(data.error.message);
      }
    } catch (error) {
      console.error("Erro:", error);
      alert("Erro ao cadastrar. Tente novamente.");
    }
  });

//Login
document
  .getElementById("loginForm")
  .addEventListener("submit", async (event) => {
    event.preventDefault();

    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;

    try {
      const response = await fetch(`${API_URL}/auth/local`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          identifier: email,
          password: password,
        }),
      });

      const data = await response.json();

      if (data.jwt) {
        alert("Login realizado com sucesso!");
        localStorage.setItem("jwt", data.jwt);
        window.location.href = "homeScreen.html";
      } else {
        alert("Credenciais inválidas.");
      }
    } catch (error) {
      console.error("Erro:", error);
      alert("Erro ao fazer login. Tente novamente.");
    }
  });
