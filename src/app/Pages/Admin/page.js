import HeaderAdmin from '@/src/components/HeaderAdmin/page';
import React from 'react';
import Link from 'next/link';

const AdminPage = () => {
  return (
    <>
    <HeaderAdmin/>
    <main className="container mx-auto mt-8">
        <div className="flex">
          <div className="flex-1 bg-white p-6 rounded-lg shadow-md mr-4">
            <h2 className="text-2xl mb-4">Cadastro de Usuários</h2>
            <p>Gerencie usuários cadastrados no sistema.</p>
            <Link href="/Pages/Admin/CadastroUsuario" className="mt-4 text-blue-500 hover:underline">
              Ir para Cadastro de Usuários
            </Link>
          </div>

          <div className="flex-1 bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl mb-4">Cadastro de Artigos</h2>
            <p>Gerencie os artigos do seu sistema.</p>
            <Link href="/Pages/Admin/CadastroArtigo" className="mt-4 text-blue-500 hover:underline">
              Ir para Cadastro de Artigos
            </Link>
          </div>
        </div>
      </main>
    </>
  )
}

export default AdminPage;