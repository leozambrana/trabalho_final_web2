'use client';
import { useEffect, useState } from "react"
import HomeHeader from "../components/HeaderLogin/page";
import { FaHeart } from "react-icons/fa";

export default function Home() {
  const [data, setData] = useState([]);
  const [mostLikedData, setMostLikedData] = useState([]);
  const [dataSearch, setDataSearch] = useState('');
  const [mostLikedSearch, setMostLikedSearch] = useState('');

  useEffect(() => {
    setData([
      {
        nome: 'artigo 1',
        descricao: 'bla bla',
        curtidas: 12,
        id: 1,
      },
      {
        nome: 'artigo 2',
        descricao: 'bla bla',
        curtidas: 2,
        id: 2,
      },
      {
        nome: 'artigo 3',
        descricao: 'bla bla',
        curtidas: 3,
        id: 3,
      },
      {
        nome: 'artigo 4',
        descricao: 'bla bla',
        curtidas: 5,
        id: 4,
      },
      {
        nome: 'artigo 5',
        descricao: 'bla bla',
        curtidas: 1,
        id: 5,
      },
      {
        nome: 'artigo 6',
        descricao: 'bla bla',
        curtidas: 17,
        id: 6,
      },
      {
        nome: 'artigo 7',
        descricao: 'bla bla',
        curtidas: 9,
        id: 7,
      },
      {
        nome: 'artigo 8',
        descricao: 'bla bla',
        curtidas: 0,
        id: 8,
      },
    ])
  }, []);

  useEffect(() => {
    if (data) {
      const sorted = [...data].sort((a, b) => b.curtidas - a.curtidas);
      const top10 = sorted.slice(0, 10);
      setMostLikedData(top10.map(artigo => ({ ...artigo, curtido: false })));
    }
  }, [data]);

  const handleLike = (id) => {
    setMostLikedData((prevData) =>
      prevData.map((artigo) =>
        artigo.id === id ? { ...artigo, curtido: !artigo.curtido } : artigo
      )
    );
  };

  const handleSearchMostLikedData = (e) => {
    setMostLikedSearch(e.target.value);
  };

  const handleSearchData = (e) => {
    setDataSearch(e.target.value);
  };

  const filteredMostLikedData = mostLikedData.filter((artigo) =>
    artigo.nome.toLowerCase().includes(mostLikedSearch.toLowerCase())
  );

  const filteredData = data.filter((artigo) =>
    artigo.nome.toLowerCase().includes(dataSearch.toLowerCase())
  );

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
            <input
              className="search-input"
              type="text"
              placeholder="Pesquisar por nome..."
              value={mostLikedSearch}
              onChange={handleSearchMostLikedData}
            />
          </div>
          <div className="grid grid-cols-3 gap-4 m-20">
            {filteredMostLikedData.map((artigoCurtido) => (
              <div key={artigoCurtido.id} className="flex justify-center items-center flex-col gap-10 p-4 border border-gray-300">
                <h3>{artigoCurtido.nome}</h3>
                <p>{artigoCurtido.descricao}</p>
                <div className="flex items-center">
                  <button onClick={() => handleLike(artigoCurtido.id)}>
                    <FaHeart className={artigoCurtido.curtido ? 'text-red-500' : ''} />
                  </button>
                  <span>{artigoCurtido.curtidas}</span>
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-center flex-col items-center my-10">
            <h1>
              Todos Artigos
            </h1>
            <input
              className="search-input"
              type="text"
              placeholder="Pesquisar por nome..."
              value={dataSearch}
              onChange={handleSearchData}
            />
          </div>
          <div className="grid grid-cols-3 gap-4 m-20">
            {filteredData.map((artigo) => (
              <div key={artigo.id} className="flex justify-center items-center flex-col gap-10 p-4 border border-gray-300">
                <h3>{artigo.nome}</h3>
                <p>{artigo.descricao}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}
