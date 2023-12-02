'use client';
import React from 'react';
import Link from 'next/link';
import { FaArrowLeft } from "react-icons/fa";
import { useRouter } from 'next/navigation';
import axios from 'axios';

const HeaderAdmin = (cadastro) => {
    const router = useRouter();
    const api = "//localhost:3001";
    const handleLogout = async () => {
        console.log('aqui');
        const response = await axios.post(`${api}/logout`);
        console.log(response);
    };

    return (
        <header className='bg-black'>
            <div className='flex justify-between px-20 py-10 text-white'>
                <div className='flex gap-10'>
                    {cadastro.cadastro && (
                        <button onClick={() => router.back()}>
                            <FaArrowLeft />
                        </button>
                    )}
                    <span>
                        <Link href='/'>Artigos</Link>
                    </span>
                </div>
                <nav>
                    <ul className='flex gap-10'>
                        <li>
                            <Link href="/Admin/CadastroArtigo">Cadastro artigo</Link>
                        </li>
                        <li>
                            <Link href="/Admin/CadastroUsuario">Cadastro usuários</Link>
                        </li>
                        <li>
                            <Link onClick={() => handleLogout()} href="/">Logout</Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    );
};

export default HeaderAdmin