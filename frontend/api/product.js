document.addEventListener("DOMContentLoaded", () => {
  atualizarHeaderUsuario();
  carregarDetalhesProduto();
  configurarBotaoSolicitar();
});

// Atualiza o header: se o usuário estiver logado, remove o botão de login
// e adiciona a foto do usuário.
function atualizarHeaderUsuario() {
  const token = localStorage.getItem("jwt");
  const userData = localStorage.getItem("user");
  const header = document.querySelector("header");

  // Remove elementos de login já existentes (exceto a logo e o título)
  // Neste exemplo, assumimos que a logo e o título são os 2 primeiros elementos.
  while (header.children.length > 2) {
    header.removeChild(header.lastElementChild);
  }

  if (token && userData) {
    const user = JSON.parse(userData);
    const img = document.createElement("img");
    img.src = user.userimgURL || "../src/media/avatar-de-perfil.png";
    img.alt = "Foto do usuário";
    img.width = 50;
    img.height = 50;
    img.style.borderRadius = "50%";
    img.style.cursor = "pointer";
    img.addEventListener("click", () => {
      window.location.href = "userScreen.html";
    });
    header.appendChild(img);
  }
}

// Carrega os detalhes do produto com base no parâmetro "id" da URL.
async function carregarDetalhesProduto() {
  const params = new URLSearchParams(window.location.search);
  let produtoId = params.get("id");

  try {
    if (!produtoId || produtoId.length !== 24) {
      produtoId = "d5cf960v7tqiffbkxp1vxvcj"; // ID padrão (substitua se necessário)
      window.history.replaceState({}, "", `?id=${produtoId}`);
    }

    const response = await fetch(
      `http://localhost:1337/api/alimentos/${produtoId}`
    );
    if (!response.ok) {
      throw new Error("Erro ao carregar detalhes do produto.");
    }

    const data = await response.json();
    if (!data.data) {
      throw new Error("Dados inválidos recebidos da API.");
    }

    const produto = data.data;
    const nome = produto.name || "Nome indisponível";
    const descricao = produto.description || "Sem descrição";
    const dataExpiracao = produto.expirationDate
      ? new Date(produto.expirationDate).toLocaleDateString("pt-BR")
      : "Sem data";
    const imagem = produto.imgURL || "https://via.placeholder.com/150";
    const local = produto.location || "Local não disponível";
    const validade = produto.expirationDate
      ? new Date(produto.expirationDate).toLocaleDateString("pt-BR")
      : "Data de validade não informada";

    document.getElementById("product-title").textContent = nome;
    document.getElementById("product-description").textContent = descricao;
    document
      .getElementById("product-location")
      .querySelector("strong").textContent = local;
    document
      .getElementById("product-expiry")
      .querySelector("strong").textContent = validade;
    document.getElementById("product-image").src = imagem;
  } catch (error) {
    console.error(error);
    document.body.innerHTML =
      "<p class='text-danger'>Erro ao carregar os detalhes do produto.</p>";
  }
}

function configurarBotaoSolicitar() {
  const btnSolicitar = document.getElementById("solicitar-btn");
  btnSolicitar.addEventListener("click", solicitarDoacao);
}

async function solicitarDoacao() {
  const token = localStorage.getItem("jwt");
  const userData = JSON.parse(localStorage.getItem("user"));
  const userId = userData?.id;

  if (!token || !userId) {
    alert("Você precisa estar logado para solicitar uma doação.");
    return;
  }

  const params = new URLSearchParams(window.location.search);
  const produtoId = params.get("id");

  if (!produtoId) {
    alert("Produto inválido.");
    return;
  }

  try {
    const response = await fetch("http://localhost:1337/api/doacaos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        data: {
          local: "Definir local de retirada", // Adapte conforme necessário
          solicitantes: [userId], // Corrigido para usar a relação correta
          doacaos: [produtoId], // Corrigido para associar o alimento
        },
      }),
    });

    const responseData = await response.json();
    console.log("Resposta do Strapi:", responseData);

    if (!response.ok) {
      throw new Error(
        responseData.error.message || "Erro ao solicitar doação."
      );
    }

    alert("Doação solicitada com sucesso!");
    window.location.reload();
  } catch (error) {
    console.error("Erro:", error);
    alert(error.message);
  }
}
