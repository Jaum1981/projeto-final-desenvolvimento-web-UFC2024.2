document.addEventListener("DOMContentLoaded", async () => {
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

    const userDocumentId = user.documentId; // Pega o documentId do usuário logado

    if (!userDocumentId) {
      console.error("Erro: documentId do usuário não encontrado.");
      return;
    }

    // Busca as doações do usuário logado que ainda estão disponíveis
    async function fetchDoacoesUsuario() {
      try {
        const responseDoacoes = await fetch(
          "http://localhost:1337/api/doacaos",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("jwt")}`,
            },
          }
        );

        if (!responseDoacoes.ok) {
          throw new Error("Erro ao buscar doações");
        }

        const dataDoacoes = await responseDoacoes.json();

        // Filtra as doações do usuário logado que estão disponíveis
        const doacoesUsuario = dataDoacoes.data.filter(
          (doacao) =>
            doacao.attributes.documentId === userDocumentId &&
            doacao.attributes.donateStatus === "disponivel"
        );

        if (doacoesUsuario.length === 0) {
          document.querySelector(".produtos-container .row").innerHTML =
            "<p class='text-center'>Você não tem nenhuma doação disponível no momento.</p>";
          return;
        }

        // Busca os alimentos
        const responseAlimentos = await fetch(
          "http://localhost:1337/api/alimentos",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("jwt")}`,
            },
          }
        );

        if (!responseAlimentos.ok) {
          throw new Error("Erro ao buscar alimentos");
        }

        const dataAlimentos = await responseAlimentos.json();

        // Filtra os alimentos que pertencem às doações do usuário logado
        const alimentosUsuario = dataAlimentos.data.filter((alimento) =>
          doacoesUsuario.some(
            (doacao) =>
              doacao.attributes.documentId === alimento.attributes.documentId
          )
        );

        // Exibir os alimentos na tela
        const container = document.querySelector(".produtos-container .row");
        container.innerHTML = "";

        alimentosUsuario.forEach((alimento) => {
          const card = document.createElement("div");
          card.className = "col";

          card.innerHTML = `
            <div class="card">
              <img src="${alimento.attributes.imgURL}" alt="${
            alimento.attributes.name
          }" class="card-img-top" />
              <div class="card-body text-center">
                <h3 class="card-title">${alimento.attributes.name}</h3>
                <p class="card-text">${
                  alimento.attributes.description || "Sem descrição disponível."
                }</p>
                <button class="btn btn-primary">Detalhes</button>
              </div>
            </div>
          `;

          container.appendChild(card);
        });
      } catch (error) {
        console.error(error);
      }
    }

    fetchDoacoesUsuario();
  }

  // Logout
  const logoutBtn = document.getElementById("logoutBtn");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      const confirmLogout = confirm("Deseja realmente sair?");
      if (confirmLogout) {
        localStorage.removeItem("jwt");
        localStorage.removeItem("user");
        window.location.href = "login-registerScreen.html";
      }
    });
  }
});
