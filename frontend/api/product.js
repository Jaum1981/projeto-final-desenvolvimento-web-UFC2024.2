document.addEventListener("DOMContentLoaded", async () => {
  const urlParams = new URLSearchParams(window.location.search);
  const documentId = urlParams.get("id");

  if (documentId) {
    await carregarProduto(documentId);
  } else {
    console.error("ID do produto não encontrado na URL.");
  }
});

async function carregarProduto(documentId) {
  try {
    const response = await fetch(
      `http://localhost:1337/api/alimentos?filters[documentId][$eq]=${documentId}`
    );
    if (!response.ok) {
      throw new Error("Erro ao carregar o produto.");
    }

    const data = await response.json();

    if (!data.data || data.data.length === 0) {
      throw new Error("Produto não encontrado.");
    }

    const produto = data.data[0];

    // Preencher os dados na página
    document.getElementById("product-image").src =
      produto.imgURL || "https://via.placeholder.com/150";
    document.getElementById("product-title").innerText =
      produto.name || "Nome do Produto";
    document.getElementById("product-description").innerText =
      produto.description || "Descrição não disponível";
    document.getElementById(
      "product-location"
    ).innerHTML = `Local de Coleta: <strong>${produto.category}</strong>`;
    document.getElementById(
      "product-expiry"
    ).innerHTML = `Validade: <strong>${new Date(
      produto.expirationDate
    ).toLocaleDateString("pt-BR")}</strong>`;

    const btnSolicitar = document.getElementById("solicitar-btn");
    btnSolicitar.addEventListener("click", () => {
      solicitarDoacao(produto);
    });
  } catch (error) {
    console.error(error);
    alert("Erro ao carregar o produto.");
  }
}

async function solicitarDoacao(produto) {
  const token = localStorage.getItem("jwt");

  if (!token) {
    alert("Você precisa estar logado para solicitar uma doação!");
    window.location.href = "login-registerScreen.html";
    return;
  }

  try {
    const user = JSON.parse(localStorage.getItem("user"));
    const userId = user?.id;

    if (!userId) {
      throw new Error("Erro ao obter informações do usuário.");
    }

    const requestBody = {
      data: {
        donateStatus: "indisponivel", // O status da doação
        alimentos: [produto.id], // Relacionamento com o alimento
        doacao: { id: userId }, // Relacionamento com o usuário (doação) agora com o formato correto
        solicitacoes: { id: userId }, // Relacionamento com o solicitante
      },
    };

    const response = await fetch("http://localhost:1337/api/doacaos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(requestBody),
    });

    const data = await response.json();

    if (response.ok) {
      console.log("Solicitação de doação realizada com sucesso:", data);
      alert("Solicitação de doação realizada com sucesso!");
    } else {
      console.error(
        "Erro ao realizar a solicitação de doação:",
        data.error.message
      );
      alert("Erro ao realizar a solicitação de doação.");
    }
  } catch (error) {
    console.error("Erro ao processar a solicitação de doação:", error);
    alert("Erro ao processar a solicitação de doação.");
  }
}
