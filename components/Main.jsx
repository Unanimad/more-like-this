'use client';

import React, { useEffect, useState } from 'react'
import { Combobox } from './ui/combobox';
import { useRouter, useSearchParams } from 'next/navigation';


const Main = ({ url, data }) => {

  const router = useRouter();
  const searchParams = useSearchParams();
  const [aluno, setAluno] = useState([]);

  const handleChangeAluno = (value) => {
    console.log('selecionou', value)
    const newQuery = { ...Object.fromEntries(searchParams), aluno: aluno };
    router.push(url + "?" + new URLSearchParams(newQuery).toString());
  }


  return (
    <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
      Aluno
      {aluno && (
        <Combobox onChange={handleChangeAluno} items={data} />
      )}
    </main>
  )
}

export default Main