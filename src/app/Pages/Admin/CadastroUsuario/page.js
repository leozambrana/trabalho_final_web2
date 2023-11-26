'use client';
import { MdDeleteForever } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import HeaderAdmin from '@/src/components/HeaderAdmin/page';

const CadastroUsuario = () => {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [editingUserId, setEditingUserId] = useState(null);
  const [editingUserSenha, setEditingUserSenha] = useState('');
  const [users, setUsers] = useState([]);

  useEffect(() => {
    setUsers([
      {
        nome: 'leo',
        email: 'leo@gmail.com',
        admin: false,
        senha: '12345',
        id: 1,
      },
      {
        nome: 'leo',
        email: 'leo@gmail.com',
        admin: false,
        id: 2,
      },
      {
        nome: 'leo',
        email: 'leo@gmail.com',
        admin: false,
        id: 3,
      },
      {
        nome: 'leo',
        email: 'leo@gmail.com',
        admin: false,
        id: 4,
      },
    ])
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('sua_api/lista-de-usuarios');
      setUsers(response.data);
    } catch (error) {
      console.error('Erro ao obter a lista de usuários:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingUserId) {
        await axios.put(`sua_api/atualizar-usuario/${editingUserId}`, {
          nome,
          email,
          senha,
        });
      } else {
        await axios.post('sua_api/cadastro-usuarios', {
          nome,
          email,
          senha,
        });
      }

      fetchUsers();

      setNome('');
      setEmail('');
      setSenha('');
      setEditingUserId(null);
      setEditingUserSenha('');
    } catch (error) {
      console.error('Erro ao cadastrar usuário:', error);
    }
  };

  const handleEdit = (id) => {
    const userToEdit = users.find((user) => user.id === id);
    console.log(userToEdit);
    setNome(userToEdit.nome);
    setEmail(userToEdit.email);
    setSenha('');
    setEditingUserSenha(userToEdit.senha);
    setEditingUserId(id);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`sua_api/delete-usuario/${id}`);

      fetchUsers();
    } catch (error) {
      console.error('Erro ao deletar usuário:', error);
    }
  };

  return (
    <>
      <HeaderAdmin cadastro/>
      <main className="container mx-auto mt-8 grid grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-lg shadow-md max-h-[500px] overflow-auto flex flex-col items-center justify-center">
          <h2 className="text-2xl mb-4">{editingUserId ? 'Editar Usuário' : 'Cadastro de Usuário'}</h2>
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

            <label htmlFor="email" className="form-label">
              Email:
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-input"
            />

            {editingUserId && (
              <>
                <label htmlFor="editingUserSenha" className="form-label">
                  Senha Atual:
                </label>
                <input
                  type="password"
                  id="editingUserSenha"
                  name="editingUserSenha"
                  value={editingUserSenha}
                  readOnly
                  className="form-input"
                />
              </>
            )}

            <label htmlFor="senha" className="form-label">
              Nova Senha:
            </label>
            <input
              type="password"
              id="senha"
              name="senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              className="form-input"
            />

            <button type="submit" className="form-button">
              {editingUserId ? 'Atualizar Usuário' : 'Cadastrar Usuário'}
            </button>
          </form>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md max-h-[500px] overflow-auto">
          <h2 className="text-2xl mb-4">Lista de Usuários</h2>
          {users.map((user) => (
            <div key={user.id} className='bg-white p-6 rounded-lg shadow-md my-10 flex flex-col gap-5'>
              <p>Nome: {user.nome}</p>
              <p>Email: {user.email}</p>
              <p>Admin: {user.admin ? 'Sim' : 'Não'}</p>
              <div className='flex justify-center gap-10 items-center my-3'>
                <button onClick={() => handleEdit(user.id)}>
                  <FaRegEdit className='text-green-500 text-4xl' />
                </button>
                <button onClick={() => handleDelete(user.id)}>
                  <MdDeleteForever className='text-red-500 text-4xl' />
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </>
  );
};

export default CadastroUsuario;