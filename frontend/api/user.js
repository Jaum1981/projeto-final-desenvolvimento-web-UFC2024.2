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

    const isAdmin = user.role?.type === "admin";
    if (isAdmin) {
      document.getElementById("deleteUsersBtn").style.display = "inline-block";
      document.getElementById("deleteDoacoesBtn").style.display =
        "inline-block";
    }

    console.log("Role do usuário:", user.role);
    console.log("Tipo de role do usuário:", user.role?.type);

    // Função para abrir modal de exclusão de usuários
    document
      .getElementById("deleteUsersBtn")
      ?.addEventListener("click", async () => {
        try {
          const response = await fetch("http://localhost:1337/api/users", {
            headers: { Authorization: `Bearer ${localStorage.getItem("jwt")}` },
          });
          const users = await response.json();

          document.getElementById("confirmDeleteModal").innerHTML = users
            .map(
              (user) => `<option value="${user.id}">${user.username}</option>`
            )
            .join("");
          new bootstrap.Modal(
            document.getElementById("deleteUserModal")
          ).show();
        } catch (error) {
          console.error("Erro ao buscar usuários:", error);
        }
      });

    // Confirmação e exclusão de usuários
    document
      .getElementById("confirmDeleteUserBtn")
      ?.addEventListener("click", async () => {
        const userId = document.getElementById("userSelect").value;
        if (confirm("Tem certeza que deseja excluir este usuário?")) {
          try {
            await fetch(`http://localhost:1337/api/users/${userId}`, {
              method: "DELETE",
              headers: {
                Authorization: `Bearer ${localStorage.getItem("jwt")}`,
              },
            });
            alert("Usuário excluído com sucesso.");
            window.location.reload();
          } catch (error) {
            console.error("Erro ao excluir usuário:", error);
          }
        }
      });

    let alimentoIdSelecionado = null;

    // Função para abrir modal de exclusão de alimentos
    document
      .getElementById("deleteDoacoesBtn")
      ?.addEventListener("click", async () => {
        try {
          const response = await fetch("http://localhost:1337/api/alimentos", {
            headers: { Authorization: `Bearer ${localStorage.getItem("jwt")}` },
          });

          const responseData = await response.json();
          console.log("Resposta da API /api/alimentos:", responseData);

          const alimentos = responseData?.data || [];

          const alimentosLista = alimentos
            .map(
              (alimento) => `
              <li class="list-group-item d-flex justify-content-between align-items-center">
                <span>${alimento.name}</span>
                <button class="btn btn-danger btn-sm delete-btn" data-document-id="${alimento.documentId}">
                  Excluir
                </button>
              </li>`
            )
            .join("");

          document.getElementById("listaAlimentos").innerHTML = alimentosLista;

          document.querySelectorAll(".delete-btn").forEach((button) => {
            button.addEventListener("click", (event) => {
              alimentoIdSelecionado = event.target.dataset.documentId;

              //atualiza o texto do modal
              const alimentoSelecionado =
                event.target.previousElementSibling.textContent;
              document.getElementById(
                "deleteDoacaoModalLabel"
              ).innerText = `Excluir "${alimentoSelecionado}"?`;
            });
          });
        } catch (error) {
          console.error("Erro ao buscar alimentos:", error);
        }
      });

    // Confirmação
    document
      .getElementById("confirmDeleteBtn")
      ?.addEventListener("click", async () => {
        if (alimentoIdSelecionado) {
          console.log(
            "Tentando excluir o alimento com documentId:",
            alimentoIdSelecionado
          );
          try {
            await fetch(
              `http://localhost:1337/api/alimentos/${alimentoIdSelecionado}`,
              {
                method: "DELETE",
                headers: {
                  Authorization: `Bearer ${localStorage.getItem("jwt")}`,
                },
              }
            );

            alert("Alimento excluído com sucesso.");
            window.location.reload();
          } catch (error) {
            console.error("Erro ao excluir alimento:", error);
          }
        } else {
          console.error("Nenhum alimento foi selecionado para exclusão!");
        }
      });

    async function fetchDoacoesCriadas() {
      try {
        const userData = localStorage.getItem("user");

        if (userData) {
          const user = JSON.parse(userData);
          const userDocumentId = user.documentId;

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
              "<tr><td colspan='7' class='text-center'>Você não criou nenhuma doação ainda.</td></tr>";
            return;
          }

          // Filtra as doações que estão relacionadas ao usuário
          const doacoesRelacionadas = doacoesCriadas.filter((doacao) => {
            const criadorId = doacao.criador?.documentId;
            const solicitacoesIds = doacao.solicitacoes.map(
              (solicitacao) => solicitacao.documentId
            );

            return (
              criadorId === userDocumentId ||
              solicitacoesIds.includes(userDocumentId)
            );
          });

          doacoesCriadasElement.innerHTML = "";

          doacoesRelacionadas.forEach((doacao) => {
            const alimentos = doacao.alimentos || [];
            const criador = doacao.criador || {};
            const solicitacoes = doacao.solicitacoes || [];

            const row = document.createElement("tr");

            let alimentoInfo = alimentos
              .map(
                (alimento) => `
                <strong>Alimento:</strong> ${alimento.name} (${alimento.category}) <br>
                <strong>Data de Validade:</strong> ${alimento.expirationDate} <br>
                <img src="${alimento.imgURL}" alt="${alimento.name}" width="50" />
                <br>`
              )
              .join("");

            let criadorInfo = criador.username
              ? criador.username
              : "Não disponível";

            let solicitacaoInfo = solicitacoes
              .map((solicitacao) => solicitacao.username)
              .join(", ");

            row.innerHTML = `
              <td>${doacao.donateStatus}</td>
              <td>${alimentoInfo}</td>
              <td>${
                alimentos[0]?.description || "Descrição não disponível"
              }</td>
              <td>${criadorInfo}</td>
              <td>${solicitacaoInfo || "Não disponível"}</td>
              <td>${new Date(doacao.createdAt).toLocaleDateString()}</td>
              <td>${alimentos[0]?.foodStatus || "Não disponível"}</td>
            `;

            doacoesCriadasElement.appendChild(row);
          });
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
