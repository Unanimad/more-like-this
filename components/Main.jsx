'use client';

import React, { useEffect, useState } from 'react'
import { Combobox } from './ui/combobox';
import { Card, CardDescription, CardTitle, CardHeader, CardFooter, CardContent } from './ui/card';
import { ScrollArea } from "@/components/ui/scroll-area"
import api from '@/services/instance';
import { hitsToSelectItems } from '@/lib/utils';


const Main = () => {

  const [aluno, setAluno] = useState([]);
  const [cursos, setCursos] = useState([]);
  const [recomendacoes, setRecomendacoes] = useState([]);


  const getAluno = async () => {
    const response = await api.post('/search', {
      url_path: 'avasusbr__usuario/_search',
      body: { query: { match_all: {} } },
    });
    return hitsToSelectItems(response.data.hits.hits, 'nome_completo');
  };

  const getMatriculas = async (idAluno) => {
    const response = await api.post('/search', {
      url_path: 'avasusbr__matricula/_search',
      body: { query: { match: { aluno_id: idAluno } }, sort: [{ 'data.matricula': 'desc' }] },
    });
    return response.data.hits.hits;
  };

  const getCursos = async (matriculas) => {
    try {
      // Mapeia os IDs dos cursos a partir das matrículas
      const idsCursos = matriculas.map(matricula => matricula._id.split(':')[0]);

      // Faz a busca dos cursos com base nos IDs extraídos
      const response = await api.post('/search', {
        url_path: 'avasusbr__curso/_search',
        body: { query: { terms: { _id: idsCursos } } },
      });

      const cursos = response.data.hits.hits;

      // Combina as informações de cursos e matrículas
      const cursosComMatriculas = idsCursos.map(idCurso => {
        const curso = cursos.find(c => c._id === idCurso);
        const matricula = matriculas.find(m => m._id.split(':')[0] === idCurso);

        // Retorna o objeto combinado com informações do curso e matrícula
        return {
          curso: curso ? curso : null,  // Garante que pegue o _source
          matricula: matricula ? matricula : null,
        };
      });

      setCursos(cursosComMatriculas); // Atualiza o estado dos cursos
      return cursosComMatriculas; // Retorna os cursos combinados para usar em outras funções
    } catch (error) {
      console.error('Erro ao buscar cursos:', error);
    }
  };

  const getRecomendacoes = async () => {
    try {
      // Mapeia os cursos para montar a estrutura "like"
      const likes = cursos.map(({ curso }) => ({ _index: 'avasusbr__curso', _id: curso._id }));

      // Verifica se existem cursos para gerar as recomendações
      if (!likes.length) {
        console.warn('Nenhum curso encontrado para recomendar');
        return;
      }

      // Faz a busca de cursos semelhantes
      const recomendacoesResponse = await api.post('/search', {
        url_path: 'avasusbr__curso/_search',
        body: {
          query: {
            more_like_this: {
              fields: ['nome', 'sumario', 'objetivos', 'conteudo'], // Campos para similaridade
              like: likes,
              min_term_freq: 3, // Frequência mínima dos termos
              min_doc_freq: 3,  // Mínimo de documentos com os termos
            }
          }
        }
      });

      const cursosRecomendados = recomendacoesResponse.data.hits.hits;

      // Atualiza o estado das recomendações
      setRecomendacoes(cursosRecomendados);
    } catch (error) {
      console.error('Erro ao buscar recomendações:', error);
    }
  };

  const limparTodosDados = () => {
    setCursos([]);
    setRecomendacoes([]);
  }

  const handleChangeAluno = async (idAluno) => {
    limparTodosDados();
    try {
      const matriculas = await getMatriculas(idAluno);
      if (matriculas.length > 0) {
        const idsCursos = await getCursos(matriculas);
        if (idsCursos.length > 0) {
          await getRecomendacoes(); // Pegar recomendações com base no primeiro curso
        }
      }
    } catch (error) {
      console.error('Erro ao carregar dados:', error);
    }
  };

  useEffect(() => {
    getAluno().then(data => setAluno(data));
  }, []);

  return (
    <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
      Aluno
      {aluno && (
        <Combobox onChange={handleChangeAluno} items={aluno} placeholder={'Selecione um aluno'} />
      )}
      <div className="grid grid-cols-2 gap-4">
        {cursos?.length > 0 && (
          <div className="flex flex-col">
            <h2 className="font-bold mb-2">Matrículas em Cursos</h2>
            <ScrollArea className="h-[calc(70vh-100px)] w-full rounded-md p-4">
              <div className="absolute left-0 top-0 w-1 h-full bg-blue-500" />
              {cursos.map(({ curso, matricula }, index) => (
                <div key={index}>
                  <Card>
                    <CardHeader>
                      <CardTitle>{curso?._source.nome || 'Nome do Curso não encontrado'}</CardTitle>
                    </CardHeader>
                    <CardFooter>
                      <small>Data da Matrícula: {matricula._source.data.matricula || 'Data não encontrada'}</small>
                    </CardFooter>
                  </Card>
                </div>
              ))}
            </ScrollArea>
          </div>
        )}

        {recomendacoes?.length > 0 && (
          <div className="flex flex-col">
            <h2 className="font-bold mb-2">Cursos Recomendados</h2>
            <ScrollArea className="h-[calc(70vh-100px)] w-full rounded-md p-4">
              {recomendacoes.map((recomendacao, index) => (
                <Card key={index} className='mb-2'>
                  <CardHeader>
                    <CardTitle>{recomendacao?._source?.nome || 'Nome do Curso não encontrado'}</CardTitle>
                    <CardDescription>{recomendacao?._source?.sumario || 'Sumário não disponível'}</CardDescription>
                  </CardHeader>
                  <CardFooter>
                    <div>
                      <span>Carga Horária: {recomendacao?._source?.carga_horaria || 'N/A'}</span>
                      <span>Categoria: {recomendacao?._source?.categoria?.nome || 'Categoria não disponível'}</span>
                    </div>
                  </CardFooter>
                </Card>
              ))}
            </ScrollArea>
          </div>
        )}
      </div>
    </main>
  )
}

export default Main;
