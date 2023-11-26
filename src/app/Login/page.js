'use client';
import HomeHeader from '@/src/components/HeaderLogin/page';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import React, { useState, useRef } from 'react';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const usernameRef = useRef(null);
  const passwordRef = useRef(null);
  const router = useRouter();
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // const response = await axios.post('sua_api/login', {
      //   username,
      //   password,
      // });

      // console.log('Resposta da API:', response.data);
      router.push('/Pages/Admin');
    } catch (error) {
      console.error('Erro ao fazer login:', error);
    }
  };

  return (
    <>
      <HomeHeader/>
      <main className='mx-auto mt-36 max-w-[400px]'>
        <h2 className='flex justify-center mb-5'>Login</h2>
        <div className='bg-white p-5 border border-[#ccc] rounded-lg shadow-md '>
          <form onSubmit={handleSubmit}>
            <label htmlFor="username" className='form-label'>Usuário:</label>
            <input
              type="text"
              id="username"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              ref={usernameRef}
              className='form-input'
            />

            <label htmlFor="password" className='form-label'>Senha:</label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              ref={passwordRef}
              className='form-input'
            />

            <button type="submit" className='form-button'>Login</button>
          </form>
        </div>
      </main>
    </>
  );
};

export default LoginPage;