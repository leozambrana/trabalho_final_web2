'use client';
import { useEffect, useState } from "react"
import HomeHeader from "../components/HeaderLogin/page";


export default function Home() {
  const [data, setData] = useState([]);
  useEffect(() => {
    setData([
      {
        nome: 'artigo 1',
        descricao: 'bla bla'
      },
      {
        nome: 'artigo 1',
        descricao: 'bla bla'
      },
      {
        nome: 'artigo 1',
        descricao: 'bla bla'
      },
      {
        nome: 'artigo 1',
        descricao: 'bla bla'
      },
      {
        nome: 'artigo 1',
        descricao: 'bla bla'
      },
      {
        nome: 'artigo 1',
        descricao: 'bla bla'
      },
      {
        nome: 'artigo 1',
        descricao: 'bla bla'
      },
      {
        nome: 'artigo 1',
        descricao: 'bla bla'
      },
    ])
  }, []);

  return (
    <>
      <HomeHeader />
      <main>
        <section>
          <div className="flex justify-center flex-col items-center my-10">
            <h1>
              Artigos mais curtidos
            </h1>
            <h2>
              top 10
            </h2>
          </div>
          <div className="grid grid-cols-3 gap-4 m-20">
            {data.map((artigo) => (
              <div key={artigo.id} className="flex justify-center items-center flex-col gap-10 p-4 border border-gray-300">
                <h3>{artigo.nome}</h3>
                <p>{artigo.descricao}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
    </>
  )
}
