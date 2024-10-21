# Recomendador de Cursos AVASUS

Este é um projeto que utiliza Next.js para o frontend e FastAPI para o backend.

## Pré-requisitos

- Node.js (versão 14 ou superior)
- Python (versão 3.7 ou superior)
- pip (gerenciador de pacotes do Python)
- npm (gerenciador de pacotes do Node.js) ou yarn

## Configuração do Ambiente

1. Clone o repositório:

```sh
git clone https://git.lais.huol.ufrn.br/AVAS/avasus/recomendador
cd recomendador
```

2. Crie um arquivo .env na raiz do projeto e adicione as seguintes variáveis de ambiente:

```
NEXT_PUBLIC_API_URL=http://localhost:8000
RDS_HOST=https://api.opensearch-cluster01.lais.ufrn.br
RDS_USERNAME=seu-usuario
RDS_PASSWORD=sua-senha
```

3. Instale as dependências do frontend:

> npm install

4. Instale as dependências do backend:

> pip install -r requirements.txt

## Subir o projeto

1. Inicie o servidor de desenvolvimento do Next.js:

> npm run dev

2. Inicie o servidor do FastAPI:

> uvicorn main:app --reload
