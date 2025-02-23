document.addEventListener("DOMContentLoaded", () => {
  carregarAlimentos();
  verificarUsuario();
  configurarBotaoLogin();
});

function configurarBotaoLogin() {
  const btnLogin = document.getElementById("loginBtn");
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
    produtosList.innerHTML = "";
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
      card.setAttribute("data-id", item.documentId);
      card.innerHTML = `
        <div class="card">
          <img src="${imagem}" class="card-img-top" alt="${nome}">
          <div class="card-body">
            <h5 class="card-title">${nome}</h5>
            <p class="card-text"><strong>Categoria:</strong> ${categoria}</p>
            <p class="card-text"><strong>Descrição:</strong> ${descricao}</p>
            <p class="card-text"><strong>Validade:</strong> ${dataExpiracao}</p>
          </div>
        </div>
      `;
      card.addEventListener("click", () => {
        const produtoId = card.getAttribute("data-id");
        window.location.href = `productScreen.html?id=${produtoId}`;
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
    exibirBotaoCriarDoacao();
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

function exibirBotaoCriarDoacao() {
  const container = document.getElementById("criarDoacaoContainer");
  container.innerHTML = "";
  const btnCriar = document.createElement("button");
  btnCriar.textContent = "Criar Doação";
  btnCriar.classList.add("btn", "btn-success");
  btnCriar.addEventListener("click", () => {
    // Abre o modal do Bootstrap
    const modal = new bootstrap.Modal(
      document.getElementById("modalCriarDoacao")
    );
    modal.show();
  });
  container.appendChild(btnCriar);
}

// Lida com o envio do formulário do modal para criar o alimento (e doação)
document
  .getElementById("formCriarDoacao")
  .addEventListener("submit", async (e) => {
    e.preventDefault();

    // Coleta dos dados do formulário
    const nome = document.getElementById("alimentoNome").value;
    const categoria = document.getElementById("alimentoCategoria").value;
    const descricao = document.getElementById("alimentoDescricao").value;
    const dataExpiracao = document.getElementById("dataExpiracao").value;
    const imgURL = document.getElementById("imgURL").value;

    // Dados do alimento conforme o schema
    const alimentoData = {
      name: nome,
      category: categoria,
      description: descricao,
      expirationDate: dataExpiracao,
      imgURL: imgURL,
      foodStatus: "disponivel",
      // O campo "doacao" poderá ser definido caso você tenha uma lógica para criar a doação e associá-la
    };

    try {
      const token = localStorage.getItem("jwt");
      // Exemplo de criação de alimento via POST na API (ajuste a URL se necessário)
      const response = await fetch("http://localhost:1337/api/alimentos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ data: alimentoData }),
      });
      const result = await response.json();
      if (!response.ok) {
        throw new Error("Erro ao criar o alimento/doação.");
      }
      alert("Doação criada com sucesso!");
      // Fecha o modal
      const modal = bootstrap.Modal.getInstance(
        document.getElementById("modalCriarDoacao")
      );
      modal.hide();
      // Atualiza a lista de alimentos
      carregarAlimentos();
    } catch (error) {
      console.error(error);
      alert("Ocorreu um erro ao criar a doação.");
    }
  });
