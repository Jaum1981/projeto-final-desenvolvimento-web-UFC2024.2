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

    // Função para buscar as doações do usuário
    // async function fetchDoacoesCriadas() {
    //   try {
    //     const userData = localStorage.getItem("user");

    //     if (userData) {
    //       const user = JSON.parse(userData);
    //       const userDocumentId = user.documentId;

    //       const responseDoacoes = await fetch(
    //         `http://localhost:1337/api/doacaos?populate[criador]=true&populate[alimentos]=true&populate[solicitacoes]=true`,
    //         {
    //           headers: {
    //             Authorization: `Bearer ${localStorage.getItem("jwt")}`,
    //           },
    //         }
    //       );

    //       const dataDoacoes = await responseDoacoes.json();
    //       const doacoesCriadas = dataDoacoes?.data || [];
    //       const doacoesCriadasElement =
    //         document.getElementById("doacoesCriadas");

    //       if (doacoesCriadas.length === 0) {
    //         doacoesCriadasElement.innerHTML =
    //           "<p class='text-center'>Você não criou nenhuma doação ainda.</p>";
    //         return;
    //       }

    //       // Filtra as doações que estão relacionadas ao usuário
    //       const doacoesRelacionadas = doacoesCriadas.filter((doacao) => {
    //         const criadorId = doacao.criador?.documentId;
    //         const solicitacoesIds = doacao.solicitacoes.map(
    //           (solicitacao) => solicitacao.documentId
    //         );

    //         // Verifica se o usuário é o criador ou solicitante
    //         return (
    //           criadorId === userDocumentId ||
    //           solicitacoesIds.includes(userDocumentId)
    //         );
    //       });

    //       // Cria a lista de doações filtradas
    //       doacoesCriadasElement.innerHTML = ""; // Limpa a lista atual
    //       doacoesRelacionadas.forEach((doacao) => {
    //         const alimentos = doacao.alimentos || [];
    //         const criador = doacao.criador || {};
    //         const solicitacoes = doacao.solicitacoes || [];

    //         // Cria o item de lista para a doação
    //         const listItem = document.createElement("li");
    //         listItem.className = "bg-info text-white p-3 mb-2 rounded";

    //         let alimentoInfo = alimentos
    //           .map(
    //             (alimento) => `
    //             <p><strong>Alimento:</strong> ${alimento.name} (${alimento.category})</p>
    //             <p><strong>Descrição:</strong> ${alimento.description}</p>
    //             <p><strong>Data de Validade:</strong> ${alimento.expirationDate}</p>
    //             <p><img src="${alimento.imgURL}" alt="${alimento.name}" width="100" /></p>
    //             <p><strong>Status do Alimento:</strong> ${alimento.foodStatus}</p>`
    //           )
    //           .join("");

    //         let criadorInfo = criador.username
    //           ? `<p><strong>Criador:</strong> ${criador.username}</p>`
    //           : "<p><strong>Criador:</strong> Não disponível</p>";

    //         let solicitacaoInfo = solicitacoes
    //           .map(
    //             (solicitacao) => `
    //             <p><strong>Solicitante:</strong> ${solicitacao.username} </p>`
    //           )
    //           .join("");

    //         listItem.innerHTML = `
    //           <p><strong>Status da Doação:</strong> ${doacao.donateStatus}</p>
    //           ${alimentoInfo}
    //           ${criadorInfo}
    //           ${solicitacaoInfo}
    //           <p><strong>Data da Doação:</strong> ${new Date(
    //             doacao.createdAt
    //           ).toLocaleDateString()}</p>
    //         `;

    //         doacoesCriadasElement.appendChild(listItem);
    //       });
    //     }
    //   } catch (error) {
    //     console.error("Erro ao buscar doações:", error);
    //   }
    // }

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

            // Verifica se o usuário é o criador ou solicitante
            return (
              criadorId === userDocumentId ||
              solicitacoesIds.includes(userDocumentId)
            );
          });

          // Limpa a tabela atual
          doacoesCriadasElement.innerHTML = "";

          // Cria as linhas da tabela com as doações filtradas
          doacoesRelacionadas.forEach((doacao) => {
            const alimentos = doacao.alimentos || [];
            const criador = doacao.criador || {};
            const solicitacoes = doacao.solicitacoes || [];

            // Cria a linha da tabela
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
