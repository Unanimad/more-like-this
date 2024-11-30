# More-Like-This

More-Like-This é uma ferramenta de visualização de similaridade de documentos usando ElasticSearch e o recurso More Like This (MLT). Inspirado no Transformer-Explainer, este projeto facilita a compreensão das recomendações de documentos semelhantes, incluindo um mapa de calor para destacar as partes mais relevantes dos documentos e a possibilidade de integração com MLFlow no futuro.

## Funcionalidades

- Visualização interativa de similaridade de documentos
- Mapa de calor para destacar partes relevantes dos documentos
- Exploração de campos de documentos
- Expansão planejada com integração MLFlow

## Pré-requisitos

- Node.js (versão 14 ou superior)
- Python (versão 3.7 ou superior)
- pip (gerenciador de pacotes do Python)
- npm (gerenciador de pacotes do Node.js) ou yarn
  
### Permissões cluster ElasticSearch/OpenSearch

1. Cluster permissions:

  - cluster:monitor/state
  - cluster:monitor/stats

2. Indeces permissions:
   
  - indices:monitor/settings/get
  - indices:monitor/stats
  - indices:admin/mappings/get


## Configuração do Ambiente

1. Clone o repositório:

```sh
git clone https://github.com/Unanimad/more-like-this.git
cd more-like-this
```

2. Instale as dependências do frontend:

> npm install

3. Instale as dependências do backend:

> pip install -r requirements.txt

## Estrutura de Pastas da API

```
api
├── main.py
├── models
│   └── __init__.py
├── routers
│   └── __init__.py
└── services
    └── __init__.py
```

## Subir o projeto

1. Inicie o servidor de desenvolvimento do Next.js:

> npm run dev

2. Inicie o servidor do FastAPI:

> uvicorn api/main:app --reload

## Roadmap

1. Integração com MLFlow para rastreamento de experimentos
1. Suporte a mais tipos de documentos
1. Melhorias na interface de usuário

## Licença

Este projeto está sob a licença Apache 2.0. Veja o arquivo [LICENSE](LICENSE.md) para mais detalhes.
