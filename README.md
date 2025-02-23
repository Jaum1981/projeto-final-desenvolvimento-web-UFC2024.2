# ♻️ Sistema de Doação de Alimentos e Redução de Desperdício  

Uma plataforma digital para incentivar a doação de alimentos excedentes na comunidade, promovendo a sustentabilidade e a solidariedade.  

---

## 👨‍💻 Membros da Equipe  
- **João Victor Amarante Diniz** - 510466  

---

## 💡 Objetivo Geral  
Reduzir o desperdício de alimentos e fomentar a colaboração entre os membros da comunidade por meio de uma plataforma acessível e intuitiva.  

---

## 👁️ Público-Alvo  
- Comunidades locais, pequenos comerciantes, ONGs e famílias interessadas em doar alimentos.  

---

## ⭐ Impacto Esperado  
- Diminuir o desperdício de alimentos na comunidade.  
- Incentivar a economia circular e a solidariedade.  
- Facilitar a logística de doação de alimentos entre os usuários.  

---

## 🤝 Papéis ou Tipos de Usuário da Aplicação  

1. **Administrador**  
   - Gerenciamento do sistema, incluindo usuários, itens cadastrados e relatórios.  

2. **Usuário Logado**  
   - Pode cadastrar alimentos para doação, buscar alimentos disponíveis e interagir com outros usuários.  

3. **Usuário Não Logado**  
   - Pode apenas visualizar os alimentos disponíveis no sistema.  

> A aplicação deve ser inclusiva, mas certas funcionalidades são restritas a usuários logados.  

---

## 🚩 Principais Funcionalidades da Aplicação  

### Funcionalidades Acessíveis a Todos os Usuários (Inclusivas)  
- **Consulta de Alimentos Disponíveis**  
  - Busca por alimentos cadastrados com base na localização, tipo e prazo de validade.  
- **Visualização de Detalhes**  
  - Exibição das informações de cada alimento, como descrição, local de coleta e disponibilidade.  

### Funcionalidades Restritas a Usuários Logados  
- **Cadastro de Alimentos**  
  - Inserir alimentos excedentes com descrição, fotos, prazo de validade e local de coleta.  
- **Doações**  
  - Solicitar alimentos cadastrados por outros usuários.  
- **Histórico de Atividades**  
  - Acompanhar o histórico de alimentos doados ou recebidos.  

### Funcionalidades Exclusivas do Administrador  
- **Gerenciamento de Usuários**  
  - Monitorar e editar contas de usuários, incluindo permissões e atividades suspeitas.  
- **Gerenciamento de Alimentos**  
  - Editar ou remover alimentos cadastrados que violem as políticas da plataforma.  
- **Relatórios de Impacto**  
  - Acompanhar estatísticas de alimentos doados.  

---

## 🗓️ Entidades ou Tabelas do Sistema  

### 1. Usuário  
- **Atributos Principais**:  
  - ID do Usuário  
  - Nome  
  - Email  
  - Senha  
  - Tipo (Administrador ou Usuário Comum)  
  - Data de Registro  

### 2. Alimento  
- **Atributos Principais**:  
  - ID do Alimento  
  - Nome  
  - Descrição  
  - Tipo (ex.: Frutas, Vegetais, Cereais)  
  - Foto  
  - Localização  
  - Prazo de Validade  
  - Status (Disponível, Reservado, Indisponível)  

### 3. Doação  
- **Atributos Principais**:  
  - ID da Doação  
  - ID do Usuário (solicitante)  
  - ID do Alimento  
  - Data da Solicitação  
  - Status (Pendente, Concluída, Cancelada)  

---

## 💻 Tecnologias e Frameworks Utilizados  

### **Frontend**  
- Especifique as tecnologias, frameworks e bibliotecas utilizadas.  

### **Backend**  
- Especifique as tecnologias, frameworks e bibliotecas utilizadas.

---

## 🛣️ Operações Implementadas para Cada Entidade da Aplicação  

| Entidade     | Criação | Leitura | Atualização | Remoção |  
|--------------|---------|---------|-------------|---------|  
| Usuário      | ✅       | ✅       |            |         |  
| Alimento     | ✅       | ✅       |            |         |  
| Doação       | ✅       | ✅       |            |         |  

> O CRUD completo será implementado para as entidades principais: Usuário, Alimento e Doação.  

---

## 🤖 Rotas da API REST Utilizadas  

| Método HTTP | URL                   | Descrição                                  |  
|-------------|-----------------------|--------------------------------------------|  
| GET         | /api/alimentos/       | Retorna todos os alimentos disponíveis.    |  
| POST        | /api/alimentos/       | Cadastra um novo alimento.                 |  
| GET         | /api/doacoes/         | Retorna todas as solicitações do usuário. |  
| POST        | /api/doacoes/         | Solicita a doação de um alimento.         |  
| GET         | /api/user/{id}        | retorna o user especifico                 |  

---

