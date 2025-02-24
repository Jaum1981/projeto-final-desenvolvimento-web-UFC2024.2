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

document
  .getElementById("formCriarDoacao")
  .addEventListener("submit", async (e) => {
    e.preventDefault();

    // Obtém os valores do formulário
    const nome = document.getElementById("alimentoNome").value;
    const categoria = document.getElementById("alimentoCategoria").value;
    const descricao = document.getElementById("alimentoDescricao").value;
    const dataExpiracao = document.getElementById("dataExpiracao").value;
    const imgURL = document.getElementById("imgURL").value;

    const token = localStorage.getItem("jwt");
    const user = JSON.parse(localStorage.getItem("user")); // Dados do usuário logado

    try {
      // Cria a doação vinculando o usuário como criador
      const doacaoResponse = await fetch("http://localhost:1337/api/doacaos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          data: {
            criador: user.id, // Usa o id do usuário logado
            donateStatus: "disponivel",
          },
        }),
      });

      if (!doacaoResponse.ok) {
        throw new Error("Erro ao criar a doação.");
      }

      const doacaoResult = await doacaoResponse.json();
      const doacaoId = doacaoResult.data.id; // ID da doação recém-criada

      // Cria o alimento relacionando-o à doação
      const alimentoData = {
        name: nome,
        category: categoria,
        description: descricao,
        expirationDate: dataExpiracao,
        imgURL: imgURL,
        foodStatus: "disponivel",
        doacao: doacaoId, // Relação com a doação que contém o criador
      };

      const alimentoResponse = await fetch(
        "http://localhost:1337/api/alimentos",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ data: alimentoData }),
        }
      );

      if (!alimentoResponse.ok) {
        throw new Error("Erro ao criar o alimento.");
      }

      alert("Doação criada com sucesso!");
      const modal = bootstrap.Modal.getInstance(
        document.getElementById("modalCriarDoacao")
      );
      modal.hide();
      carregarAlimentos();
    } catch (error) {
      console.error(error);
      alert("Ocorreu um erro ao criar a doação.");
    }
  });
