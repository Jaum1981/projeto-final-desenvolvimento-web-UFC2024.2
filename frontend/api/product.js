document.addEventListener("DOMContentLoaded", async () => {
  const urlParams = new URLSearchParams(window.location.search);
  const documentId = urlParams.get("id");

  if (documentId) {
    await carregarProduto(documentId);
  } else {
    console.error("ID do produto não encontrado na URL.");
  }

  await atualizarHeaderUsuario();
  await verificarUsuario();
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

function atualizarHeaderUsuario(user) {
  const fotoURL = user?.userimgURL || "../src/media/avatar-de-perfil.png";
  const img = document.createElement("img");
  img.src = fotoURL;
  img.alt = "Foto do usuário";
  img.width = 50;
  img.height = 50;
  img.style.borderRadius = "50%";
  img.style.cursor = "pointer";
  img.addEventListener("click", () => {
    window.location.href = "userScreen.html";
  });
  // Remove o botão de login e insere o avatar
  const header = document.querySelector("header");
  const btn = document.getElementById("loginBtn");
  if (btn) {
    btn.remove();
  }
  header.appendChild(img);
}
