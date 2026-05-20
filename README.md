# IncluseON

Plataforma de acompanhamento educacional inclusivo e colaborativo para registro, análise e organização de informações de alunos acompanhados por equipes escolares, profissionais de apoio, AEE, psicólogos e supervisores.

---

## 1. Problema

Em muitas escolas, o acompanhamento de alunos neurodivergentes ou com necessidades educacionais específicas ainda é feito de forma fragmentada.

As informações costumam ficar espalhadas em:

- cadernos;
- planilhas;
- mensagens de WhatsApp;
- relatórios isolados;
- registros feitos por profissionais diferentes sem integração.

Essa fragmentação dificulta:

- o acompanhamento da evolução do aluno;
- a comunicação entre profissionais;
- a tomada de decisão baseada em dados;
- a construção de estratégias pedagógicas individualizadas;
- a continuidade do trabalho entre escola, família e equipe multiprofissional.

---

## 2. Solução

O **IncluseON** é uma solução tecnológica que centraliza o acompanhamento educacional inclusivo do aluno em uma plataforma única.

A aplicação permite que diferentes profissionais registrem, acompanhem e analisem informações importantes do aluno, respeitando permissões específicas por função.

A proposta é oferecer uma ferramenta para apoiar:

- registros comportamentais;
- entrevistas e avaliações;
- acompanhamento da linha do tempo do aluno;
- análise de padrões;
- geração de relatórios com apoio de inteligência artificial;
- gestão de equipe e permissões;
- fortalecimento de práticas pedagógicas inclusivas.

---

## 3. Funcionalidades do MVP

O Produto Mínimo Viável desenvolvido apresenta as seguintes funcionalidades:

### Autenticação

- Login de usuários;
- Proteção de rotas;
- Identificação do usuário autenticado.

### Alunos

- Cadastro de alunos;
- Listagem de alunos;
- Perfil individual do aluno;
- Visualização de dados escolares, familiares, sensoriais e comunicacionais.

### Registros ABA

- Cadastro de registros comportamentais no modelo ABA;
- Registro de antecedente, comportamento e consequência;
- Registro de intensidade, ambiente, estratégia utilizada e eficácia da estratégia;
- Listagem dos registros do aluno.

### Entrevistas e Avaliações

- Cadastro de entrevistas e avaliações;
- Organização de dados qualitativos do aluno;
- Listagem das avaliações vinculadas ao aluno.

### Timeline

- Linha do tempo integrada com registros ABA e avaliações;
- Organização cronológica dos eventos importantes do aluno.

### Analytics

- Cálculo de indicadores comportamentais;
- Total de registros ABA;
- Intensidade média;
- Ambiente mais recorrente;
- Estratégia mais eficaz;
- Gráficos de evolução e padrões comportamentais.

### Relatórios com IA

- Geração de estudo de caso com apoio de inteligência artificial;
- Uso dos dados do aluno, registros, avaliações e analytics;
- Histórico de relatórios gerados;
- Controle mensal de uso da IA.

### Equipe e Permissões

- Vinculação de profissionais ao aluno;
- Definição de permissões por profissional;
- Diferenciação entre profissional de apoio, AEE, psicólogo, supervisor e visualizador;
- Controle de ações como registrar ABA, criar avaliações, gerar relatórios e visualizar relatórios.

---

## 4. Público-alvo

A solução é voltada para:

- escolas;
- profissionais de Atendimento Educacional Especializado;
- profissionais de apoio escolar;
- psicólogos;
- supervisores pedagógicos;
- equipes multiprofissionais;
- projetos educacionais voltados à inclusão.

---

## 5. Tecnologias Utilizadas

### Frontend

- React
- TypeScript
- Vite
- Tailwind CSS
- React Router DOM
- TanStack React Query
- React Hook Form
- Zod
- Axios
- Lucide React
- Recharts

### Backend

- Python
- FastAPI
- SQLAlchemy
- PostgreSQL
- Alembic
- Pydantic
- JWT para autenticação
- Celery
- Redis
- OpenAI API

### Versionamento

- Git
- GitHub

---

## 6. Arquitetura da Solução

A aplicação está organizada em duas partes principais:

```txt
frontend/
  Aplicação React responsável pela interface do usuário.

backend/
  API FastAPI responsável pelas regras de negócio, autenticação,
  banco de dados, permissões, relatórios e integração com IA.