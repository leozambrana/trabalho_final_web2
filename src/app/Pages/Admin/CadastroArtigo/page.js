'use client';
import { MdDeleteForever } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import HeaderAdmin from '@/src/components/HeaderAdmin/page';

const CadastroArtigo = () => {
  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');
  const [editingArtigoId, setEditingArtigoId] = useState(null);
  const [artigos, setArtigos] = useState([]);

  useEffect(() => {
    setArtigos([
      {
        nome: 'leo',
        descricao: 'leo@gmail.com',
        id: 1,
      },
      {
        nome: 'leo',
        descricao: 'leo@gmail.com',
        id: 2,
      },
      {
        nome: 'leo',
        descricao: 'leo@gmail.com',
        id: 3,
      },
      {
        nome: 'leo',
        descricao: 'leo@gmail.com',
        id: 4,
      },
    ])
  }, []);

  const fetchArtigos = async () => {
    try {
      const response = await axios.get('');
      setArtigos(response.data);
    } catch (error) {
      console.error('Erro ao obter a lista de artigos:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingArtigoId) {
        await axios.put(`articles/${editingUserId}`, {
          nome,
          descricao,
        });
      } else {
        await axios.post('artciles/post', {
          nome,
          descricao,
        });
      }

      fetchArtigos();

      setNome('');
      setDescricao(''); 
      setEditingArtigoId(null);
    } catch (error) {
      console.error('Erro ao cadastrar artigo:', error);
    }
  };

  const handleEdit = (id) => {
    const articleToEdit = artigos.find((artigo) => artigo.id === id);
    console.log(articleToEdit);
    setNome(articleToEdit.nome);
    setDescricao(articleToEdit.descricao);
    setEditingArtigoId(id);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`articles/delete/${id}`);

      fetchArtigos();
    } catch (error) {
      console.error('Erro ao deletar artigo:', error);
    }
  };

  return (
    <>
      <HeaderAdmin cadastro/>
      <main className="container mx-auto mt-8 grid grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-lg shadow-md max-h-[500px] overflow-auto flex flex-col items-center justify-center">
          <h2 className="text-2xl mb-4">{editingArtigoId ? 'Editar Artigo' : 'Cadastro de Artigo'}</h2>
          <form onSubmit={handleSubmit} className='flex flex-col w-full'>
            <label htmlFor="nome" className="form-label">
              Nome:
            </label>
            <input
              type="text"
              id="nome"
              name="nome"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              className="form-input"
            />

            <label htmlFor="descricao" className="form-label">
              Descrição:
            </label>
            <input
              type="text"
              id="descricao"
              name="descricao"
              value={descricao}
              onChange={(e) => setEmail(e.target.value)}
              className="form-input"
            />

            <button type="submit" className="form-button">
              {editingArtigoId ? 'Atualizar Artigo' : 'Cadastrar Artigo'}
            </button>
          </form>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md max-h-[500px] overflow-auto">
          <h2 className="text-2xl mb-4">Lista de Artigos</h2>
          {artigos.map((artigo) => (
            <div key={artigo.id} className='bg-white p-6 rounded-lg shadow-md my-10 flex flex-col gap-5'>
              <p>Nome: {artigo.nome}</p>
              <p>Descrição: {artigo.descricao}</p>
              <div className='flex justify-center gap-10 items-center my-3'>
                <button onClick={() => handleEdit(artigo.id)}>
                  <FaRegEdit className='text-green-500 text-4xl' />
                </button>
                <button onClick={() => handleDelete(artigo.id)}>
                  <MdDeleteForever className='text-red-500 text-4xl' />
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </>
  );
}

export default CadastroArtigo;