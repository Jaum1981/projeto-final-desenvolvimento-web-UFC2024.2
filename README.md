# :recycle: Sistema de Troca de Alimentos e Redução de Desperdício  

Uma plataforma digital para incentivar a troca e doação de alimentos excedentes na comunidade, promovendo a sustentabilidade e a solidariedade.  

---

## :technologist: Membros da Equipe  
- **João Victor Amarante Diniz** - 510466  

---

## :bulb: Objetivo Geral  
Reduzir o desperdício de alimentos e fomentar a colaboração entre os membros da comunidade por meio de uma plataforma acessível e intuitiva.  

---

## :eyes: Público-Alvo  
- Comunidades locais, pequenos comerciantes, ONGs e famílias interessadas em trocar ou doar alimentos.  

---

## :star2: Impacto Esperado  
- Diminuir o desperdício de alimentos na comunidade.  
- Incentivar a economia circular e a solidariedade.  
- Facilitar a logística de doação e troca de alimentos entre os usuários.  

---

## :people_holding_hands: Papéis ou Tipos de Usuário da Aplicação  

1. **Administrador**  
   - Gerenciamento do sistema, incluindo usuários, itens cadastrados e relatórios.  

2. **Usuário Logado**  
   - Pode cadastrar alimentos para troca/doação, buscar alimentos disponíveis e interagir com outros usuários.  

3. **Usuário Não Logado**  
   - Pode apenas visualizar os alimentos disponíveis no sistema.  

> A aplicação deve ser inclusiva, mas certas funcionalidades são restritas a usuários logados.  

---

## :triangular_flag_on_post: Principais Funcionalidades da Aplicação  

### Funcionalidades Acessíveis a Todos os Usuários (Inclusivas)  
- **Consulta de Alimentos Disponíveis**  
  - Busca por alimentos cadastrados com base na localização, tipo e prazo de validade.  
- **Visualização de Detalhes**  
  - Exibição das informações de cada alimento, como descrição, local de coleta e disponibilidade.  

### Funcionalidades Restritas a Usuários Logados  
- **Cadastro de Alimentos**  
  - Inserir alimentos excedentes com descrição, fotos, prazo de validade e local de coleta.  
- **Trocas e Doações**  
  - Solicitar alimentos cadastrados por outros usuários e negociar trocas.  
- **Histórico de Atividades**  
  - Acompanhar o histórico de alimentos doados, recebidos ou trocados.  

### Funcionalidades Exclusivas do Administrador  
- **Gerenciamento de Usuários**  
  - Monitorar e editar contas de usuários, incluindo permissões e atividades suspeitas.  
- **Gerenciamento de Alimentos**  
  - Editar ou remover alimentos cadastrados que violem as políticas da plataforma.  
- **Relatórios de Impacto**  
  - Acompanhar estatísticas de alimentos trocados e doados.  

---

## :spiral_calendar: Entidades ou Tabelas do Sistema  

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

### 3. Troca ou Doação  
- **Atributos Principais**:  
  - ID da Troca/Doação  
  - ID do Usuário (solicitante)  
  - ID do Alimento  
  - Data da Solicitação  
  - Status (Pendente, Concluída, Cancelada)  

---

## :desktop_computer: Tecnologias e Frameworks Utilizados  

### **Frontend**  
- React.js  
- TailwindCSS  

### **Backend**  
- Node.js com Express.js  
- Banco de Dados MongoDB  

---

## :shipit: Operações Implementadas para Cada Entidade da Aplicação  

| Entidade     | Criação | Leitura | Atualização | Remoção |  
|--------------|---------|---------|-------------|---------|  
| Usuário      | ✅       | ✅       | ✅           | ✅       |  
| Alimento     | ✅       | ✅       | ✅           | ✅       |  
| Troca/Doação | ✅       | ✅       | ✅           | ✅       |  

> O CRUD completo será implementado para as entidades principais: Usuário, Alimento e Troca/Doação.  

---

## :neckbeard: Rotas da API REST Utilizadas  

| Método HTTP | URL                  | Descrição                                   |  
|-------------|----------------------|-------------------------------------------|  
| GET         | /api/alimentos/      | Retorna todos os alimentos disponíveis.    |  
| POST        | /api/alimentos/      | Cadastra um novo alimento.                 |  
| GET         | /api/trocas/         | Retorna todas as solicitações do usuário.  |  
| POST        | /api/trocas/         | Solicita a troca ou doação de um alimento. |  
| DELETE      | /api/trocas/{id}     | Cancela uma solicitação específica.        |  

---
