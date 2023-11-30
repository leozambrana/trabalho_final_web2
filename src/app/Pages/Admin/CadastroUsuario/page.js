'use client';
import {MdDeleteForever, MdSearch} from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import HeaderAdmin from '@/src/components/HeaderAdmin/page';

const CadastroUsuario = () => {
  const api = "//localhost:3001";
  const [author_name, setNome] = useState('');
  const [author_user, setUser] = useState('');
  const [author_email, setEmail] = useState('');
  const [author_pwd, setSenha] = useState('');
  const [author_level, setLevel] = useState('');
  const [author_status, setStatus] = useState('on');
  const [editingUserId, setEditingUserId] = useState(null);
  const [editingUserSenha, setEditingUserSenha] = useState('');
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get(`${api}/users`);
      setUsers(response.data);
    } catch (error) {
      console.error('Erro ao obter a lista de usuários:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingUserId) {
        await axios.put(`${api}/users/${editingUserId}`, {
          author_name,
          author_user,
          author_email,
          author_level,
          author_status,
          author_pwd,
        });
      } else {
        const author_create_data = new Date();
        await axios.post(`${api}/users`, {
          author_name,
          author_user,
          author_email,
          author_level,
          author_status,
          author_pwd,
          author_create_data
        });
      }

      fetchUsers();

      setNome('');
      setUser('');
      setEmail('');
      setSenha('');
      setStatus('on');
      setLevel('');
      setEditingUserId(null);
      setEditingUserSenha('');
    } catch (error) {
      console.error('Erro ao cadastrar usuário:', error);
    }
  };

  const handleEdit = (id) => {
    const userToEdit = users.find((user) => user._id === id);

    setNome(userToEdit.author_name);
    setUser(userToEdit.author_user);
    setEmail(userToEdit.author_email);
    setLevel(userToEdit.author_level);
    setStatus(userToEdit.author_status);
    setSenha('');
    setEditingUserSenha(userToEdit.author_pwd);
    setEditingUserId(id);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${api}/users/${id}`);

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
              value={author_name}
              onChange={(e) => setNome(e.target.value)}
              className="form-input"
            />

            <label htmlFor="user" className="form-label">
              Usuário:
            </label>
            <input
                type="text"
                id="user"
                name="user"
                value={author_user}
                onChange={(e) => setUser(e.target.value)}
                className="form-input"
            />

            <label htmlFor="email" className="form-label">
              Email:
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={author_email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-input"
            />

            <label htmlFor="ativo" className="form-label">
              Ativo
            </label>
            <input
                type="checkbox"
                id="ativo"
                name="ativo"
                value="on"
                checked={(author_status === "on")}
                onChange={(e) => setStatus((e.target.checked) ? "on" : "off")}
                className="form-input"
            />

            <label htmlFor="level" className="form-label">
              Nível
            </label>
            <select
                id="level"
                name="level"
                onChange={(e) => {
                  setLevel(e.target.value)
                }}
                className="form-input">
            <option value="user">Usuário</option>
            <option value="admin">Administrador</option>
            </select>

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
              value={author_pwd}
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
            <div key={user._id} className='bg-white p-6 rounded-lg shadow-md my-10 flex flex-col gap-5'>
              <p>Nome: {user.author_name}</p>
              <p>Usuário: {user.author_user}</p>
              <p>Email: {user.author_email}</p>
              <p>Admin: {(user.author_level === "admin") ? 'Sim' : 'Não'}</p>
              <p>Ativo: {(user.author_status === "on") ? 'Sim' : 'Não'}</p>
              <p>{(user.author_create_data) ? `Data de Criação: ${user.author_create_data}` : ""}</p>
              <div className='flex justify-center gap-10 items-center my-3'>
                <button onClick={() => handleEdit(user._id)}>
                  <FaRegEdit className='text-green-500 text-4xl' />
                </button>
                <button onClick={() => handleDelete(user._id)}>
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