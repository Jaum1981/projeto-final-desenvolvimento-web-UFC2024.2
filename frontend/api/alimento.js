document.addEventListener("DOMContentLoaded", () => {
  carregarAlimentos();
  verificarUsuario();
  configurarBotaoLogin();
});

function configurarBotaoLogin() {
  const btnLogin = document.querySelector("header button");
  if (btnLogin) {
    btnLogin.addEventListener("click", () => {
      window.location.href = "login-registerScreen.html";
    });
  }
}

async function carregarAlimentos() {
  try {
    const response = await fetch("http://localhost:1337/api/alimentos");
    if (!response.ok) {
      throw new Error("Erro ao carregar alimentos.");
    }

    const data = await response.json();

    if (!data.data || !Array.isArray(data.data)) {
      throw new Error("Dados inválidos recebidos da API.");
    }

    const alimentos = data.data;
    const produtosList = document.getElementById("produtosList");
    produtosList.innerHTML = ""; // Limpa a lista antes de renderizar

    alimentos.forEach((item) => {
      const nome = item.name || "Nome indisponível";
      const categoria = item.category || "Sem categoria";
      const descricao = item.description || "Sem descrição";
      const dataExpiracao = item.expirationDate
        ? new Date(item.expirationDate).toLocaleDateString("pt-BR")
        : "Sem data";
      const imagem = item.imgURL || "https://via.placeholder.com/150";

      const card = document.createElement("div");
      card.classList.add("col-md-4", "mb-4");

      card.innerHTML = `
            <div class="card">
                <img src="${imagem}" class="card-img-top" alt="${nome}">
                <div class="card-body">
                <h5 class="card-title" style="font-size: 1.5rem; font-weight: bold; color:rgb(0, 0, 0); text-shadow: 1px 1px 5px rgba(0, 0, 0, 0.3);">
                ${nome}</h5>
                <p class="card-text"><strong>Categoria:</strong> ${categoria}</p>
                <p class="card-text"><strong>Descrição:</strong> ${descricao}</p>
                <p class="card-text"><strong>Validade:</strong> ${dataExpiracao}</p>
                </div>
            </div>
            `;

      card.addEventListener("click", () => {
        const produtoId = card.getAttribute("data-id");

        window.location.href = `productScreen.html?id=${produtoId}`; // Redireciona para a página de detalhes
      });

      produtosList.appendChild(card);
    });
  } catch (error) {
    console.error(error);
    document.getElementById("produtosList").innerHTML =
      "<p class='text-danger'>Erro ao carregar alimentos.</p>";
  }
}

function verificarUsuario() {
  const token = localStorage.getItem("jwt");
  if (token) {
    const user = JSON.parse(localStorage.getItem("user"));
    atualizarHeaderUsuario(user);
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

  // Substituir o botão "Entrar/Cadastrar" peloa imagem
  const header = document.querySelector("header");
  const btn = header.querySelector("button");

  if (btn) {
    btn.remove();
  }

  const userContainer = document.createElement("div");
  userContainer.appendChild(img);

  header.appendChild(userContainer);
}
