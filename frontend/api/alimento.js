document.addEventListener("DOMContentLoaded", () => {
  carregarAlimentos();
});

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

      produtosList.appendChild(card);
    });
  } catch (error) {
    console.error(error);
    document.getElementById("produtosList").innerHTML =
      "<p class='text-danger'>Erro ao carregar alimentos.</p>";
  }
}
