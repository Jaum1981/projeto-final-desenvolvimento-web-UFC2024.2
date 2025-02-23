document.addEventListener("DOMContentLoaded", async () => {
  const userData = localStorage.getItem("user");

  if (userData) {
    const user = JSON.parse(userData);
    const userNameElement = document.getElementById("userName");
    const userPhotoElement = document.getElementById("userPhoto");

    if (userNameElement) userNameElement.textContent = user.username;
    if (userPhotoElement) {
      userPhotoElement.src =
        user.userimgURL || "../src/media/avatar-de-perfil.png";
    }

    const userDocumentId = user.documentId;
    if (!userDocumentId) {
      console.error("Erro: documentId do usuário não encontrado.");
      return;
    }

    async function fetchDoacoesCriadas() {
      try {
        const userData = localStorage.getItem("user");

        if (userData) {
          const user = JSON.parse(userData);
          const userId = user.id;

          const responseDoacoes = await fetch(
            `http://localhost:1337/api/doacaos?populate[criador]=true&populate[alimentos]=true&populate[solicitacoes]=true`,
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("jwt")}`,
              },
            }
          );

          const dataDoacoes = await responseDoacoes.json();
          const doacoesCriadas = dataDoacoes?.data || [];
          const doacoesCriadasElement =
            document.getElementById("doacoesCriadas");

          if (doacoesCriadas.length === 0) {
            doacoesCriadasElement.innerHTML =
              "<p class='text-center'>Você não criou nenhuma doação ainda.</p>";
            return;
          }

          // Cria a lista de doações
          const doacoesCriadasList = document.createElement("ul");
          doacoesCriadasList.classList.add("list-group");

          // Processa cada doação
          for (const doacao of doacoesCriadas) {
            const alimentos = doacao.alimentos || [];
            const criador = doacao.criador || {};
            const solicitacoes = doacao.solicitacoes || [];

            console.log("Doação:", doacao);

            // Cria o item de lista para a doação
            const listItem = document.createElement("li");
            listItem.className = "bg-info text-white p-3 mb-2 rounded";

            let alimentoInfo = alimentos
              .map(
                (alimento) => `
                <p><strong>Alimento:</strong> ${alimento.name} (${alimento.category})</p>
                <p><strong>Descrição:</strong> ${alimento.description}</p>
                <p><strong>Data de Validade:</strong> ${alimento.expirationDate}</p>
                <p><img src="${alimento.imgURL}" alt="${alimento.name}" width="100" /></p>
                <p><strong>Status do Alimento:</strong> ${alimento.foodStatus}</p>`
              )
              .join("");

            let criadorInfo = criador.username
              ? `
              <p><strong>Criador:</strong> ${criador.username}</p>
            `
              : "<p><strong>Criador:</strong> Não disponível</p>";

            let solicitacaoInfo = solicitacoes
              .map(
                (solicitacao) => `
                <p><strong>Solicitante:</strong> ${solicitacao.username} </p>`
              )
              .join("");

            listItem.innerHTML = `
              <p><strong>Status da Doação:</strong> ${doacao.donateStatus}</p>
              ${alimentoInfo}
              ${criadorInfo}
              ${solicitacaoInfo}
              <p><strong>Data da Doação:</strong> ${new Date(
                doacao.createdAt
              ).toLocaleDateString()}</p>
            `;

            doacoesCriadasElement.appendChild(listItem);
          }
        }
      } catch (error) {
        console.error("Erro ao buscar doações:", error);
      }
    }

    fetchDoacoesCriadas();
  }

  // Logout
  const logoutBtn = document.getElementById("logoutBtn");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      if (confirm("Deseja realmente sair?")) {
        localStorage.removeItem("jwt");
        localStorage.removeItem("user");
        window.location.href = "login-registerScreen.html";
      }
    });
  }
});
