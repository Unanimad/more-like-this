import Footer from '@/components/Footer';
import Main from '@/components/Main';
import axios from 'axios';
import { hitsToSelectItems } from '@/lib/utils';

async function getData(url, searchParams) {
  const username = process.env.RDS_USERNAME;
  const password = process.env.RDS_PASSWORD;

  if (!username || !password) {
    console.error("Credenciais não definidas");
    return;
  }

  try {
    const response = await axios.post(`${process.env.RDS_HOST}${url}`, searchParams, {
      headers: {
        "Content-Type": "application/json",
      },
      auth: {
        username: username,
        password: password
      }
    });
    return response;
  } catch (error) {
    console.error("Erro ao buscar dados:", error.response ? error.response.data : error.message);
    return {};
  }
}

export default async function Home({searchParams}) {
  const url = '/avasusbr__usuario/_search'
  const body = {
    _source: ['nome_completo'],
    query: {
      match: {
        nome_completo: "Raphael Silva Fontes"
      }
    }
  };

  const response = await getData(url, body);
  const data = hitsToSelectItems(response.data.hits.hits)
  
  return (
    <div>
      <Main url={url} data={data} />
      <Footer />
    </div>
  );
}
