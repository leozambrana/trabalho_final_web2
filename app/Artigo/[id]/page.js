'use client';
import HeaderLogin from '@/src/components/HeaderLogin/page';
import React, {useEffect, useState} from 'react';
import { useParams } from 'next/navigation'
import axios from 'axios';
const url = require('url');

const ArtigoPage = () => {
  const api = "//localhost:3001";
  const params = useParams();
  const article = params.id;
  const [artigo, setArtigo] = useState({});

  const fetchArtigos = async () => {
    try {
      const response = await axios.get(`${api}/articles/${article}`);
      setArtigo(response.data);
    } catch (error) {
      console.error('Erro ao obter o artigo:', error);
    }
  };

  useEffect(() => {
    fetchArtigos();
  }, []);

  return (
    <>
    <HeaderLogin/>
    <main className="container mx-auto mt-8">
      <div className="bg-white p-6 rounded-lg shadow-md overflow-auto">
        {
        <div key={artigo._id} className='bg-white p-6 rounded-lg shadow-md my-10 flex flex-col gap-5'>
        <h2 className="text-2xl mb-4">{artigo.kb_title}</h2>
              <p>Descrição: {artigo.kb_body}</p>
              <p>Palavras Chave: {artigo.kb_keywords}</p>
              <p>Publicado: {(artigo.kb_published) ? "Sim" : "Não"}</p>
              <p>Sugestão: {(artigo.kb_suggestion) ? "Sim" : "Não"}</p>
              <p>Destaque: {(artigo.kb_featured) ? "Sim" : "Não"}</p>
              <p>Email do Autor: {artigo.kb_author_email}</p>
              <p>Data de Publicação: {artigo.kb_published_date}</p>
            </div>
        }
      </div>
    </main>
    </>
  )
}

export default ArtigoPage;