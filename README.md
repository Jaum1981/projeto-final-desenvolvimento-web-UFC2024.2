# :checkered_flag: Biblioteca Digital Comunitária

Uma biblioteca digital para catalogar livros e materiais de estudo acessíveis à comunidade.

---

## :technologist: Membros da Equipe
- **João Victor Amarante Diniz** - 510466

---

## :bulb: Objetivo Geral
Ampliar o acesso à leitura e promover a educação na comunidade.

---

## :eyes: Público-Alvo
- Comunidades locais, estudantes e professores.

---

## :star2: Impacto Esperado
- Facilitar o acesso à leitura e ao aprendizado por meio de materiais digitais.
- Beneficiar a comunidade local, estudantes e professores.

---

## :people_holding_hands: Papéis ou Tipos de Usuário da Aplicação

1. **Administrador**  
   - Acesso a todas as funcionalidades administrativas e gerenciamento do sistema.
   
2. **Moderador**  
   - Responsável por revisar avaliações e comentários, além de gerenciar reservas.

3. **Leitor (Usuário Logado)**  
   - Acesso restrito para realizar reservas, downloads, avaliações e histórico.

4. **Usuário Não Logado**  
   - Acesso limitado a consulta ao catálogo e visualização de detalhes dos livros.

> A aplicação deve possuir funcionalidades acessíveis a todos os usuários e outras restritas a certos tipos de usuários.

---

## :triangular_flag_on_post: Principais Funcionalidades da Aplicação

### Funcionalidades Acessíveis a Todos os Usuários (Inclusivas)
- **Consulta ao Catálogo**  
  - Navegação e busca por livros e materiais disponíveis por título, autor ou categoria.
- **Visualização de Detalhes**  
  - Informações básicas de cada livro, como título, autor, descrição e disponibilidade.

### Funcionalidades Restritas a Usuários Logados
- **Sistema de Reservas**  
  - Permitir reservas de livros físicos disponíveis no acervo.
- **Downloads de Materiais**  
  - Acesso para baixar PDFs de materiais em domínio público ou autorizados.
- **Avaliações e Comentários**  
  - Opção para avaliar livros e comentar, ajudando outros usuários.
- **Histórico de Interações**  
  - Visualizar histórico de reservas, downloads e avaliações realizadas.

### Funcionalidades Exclusivas do Administrador
- **Gerenciamento do Catálogo**  
  - Adicionar, editar ou remover livros e materiais no acervo.
- **Gerenciamento de Usuários**  
  - Monitorar e editar contas de usuários, incluindo permissões.
- **Acompanhamento de Relatórios**  
  - Acessar estatísticas de uso, como reservas realizadas e materiais baixados.

---

## :spiral_calendar: Entidades ou Tabelas do Sistema

### 1. Usuário
- **Atributos Principais**:  
  - ID do Usuário  
  - Nome  
  - Email  
  - Senha  
  - Tipo (Administrador ou Leitor)  
  - Data de Registro  

### 2. Livro
- **Atributos Principais**:  
  - ID do Livro  
  - Título  
  - Autor(es)  
  - Gênero  
  - Descrição  
  - Disponibilidade (Sim/Não)  
  - Quantidade de Exemplares Físicos  
  - Link para Download  

### 3. Reserva
- **Atributos Principais**:  
  - ID da Reserva  
  - ID do Usuário (quem reservou)  
  - ID do Livro  
  - Data da Reserva  
  - Status (Pendente, Aprovada, Cancelada)  

### 4. Avaliação
- **Atributos Principais**:  
  - ID da Avaliação  
  - ID do Usuário  
  - ID do Livro  
  - Nota (1 a 5)  
  - Comentário  
  - Data da Avaliação  

### 5. Gênero
- **Atributos Principais**:  
  - ID do Gênero  
  - Nome do Gênero (ex.: Romance, Ciência, Tecnologia)  
  - Descrição  

---

## :desktop_computer: Tecnologias e Frameworks Utilizados

### **Frontend**  
- Especifique as tecnologias, frameworks e bibliotecas utilizadas.  

### **Backend**  
- Especifique as tecnologias, frameworks e bibliotecas utilizadas.

---

## :shipit: Operações Implementadas para Cada Entidade da Aplicação

| Entidade     | Criação | Leitura | Atualização | Remoção |
|--------------|---------|---------|-------------|---------|
| Usuário      | ❌       | ❌       | ❌           | ❌       |
| Livro        | ❌       | ❌       | ❌           | ❌       |
| Reserva      | ❌       | ❌       | ❌           | ❌       |
| Avaliação    | ❌       | ❌       | ❌           | ❌       |

> Lembre-se que é necessário implementar o CRUD de pelo menos duas entidades.

---

## :neckbeard: Rotas da API REST Utilizadas

| Método HTTP | URL                | Descrição                                   |
|-------------|--------------------|-------------------------------------------|
| GET         | /api/livros/       | Retorna todos os livros do catálogo.       |
| POST        | /api/reservas/     | Cria uma nova reserva.                     |
| GET         | /api/reservas/     | Retorna todas as reservas do usuário.      |
| DELETE      | /api/reservas/{id} | Remove uma reserva específica.             |

---
