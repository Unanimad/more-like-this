'use client';

import React, { useEffect, useState } from 'react'
import { Combobox } from './ui/combobox';
import { useRouter, useSearchParams } from 'next/navigation';
import api from '@/services/instance';
import {hitsToSelectItems} from '@/lib/utils';


const getData = async () => {
  const response = await api.post('/search', {
    url_path: 'avasusbr__usuario/_search',
    body: { query: { match_all: {} } },
  });
  return hitsToSelectItems(await response.data.hits.hits);
}

const Main = () => {

  const [data, setData] = useState([]);
  const [aluno, setAluno] = useState([]);

  useEffect(() => {
    getData().then(data => setData(data));
  }, [])

  return (
    <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
      Aluno
      {aluno && (
        <Combobox items={data} />
      )}
    </main>
  )
}

export default Main