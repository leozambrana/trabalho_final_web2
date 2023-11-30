'use client';
import { useEffect, useState } from "react";
import axios from 'axios';
import dynamic from 'next/dynamic';

const HomeHeader = dynamic(() => import("../components/HeaderLogin/page"), { ssr: false });
const FaHeart = dynamic(() => import("react-icons/fa").then((module) => module.FaHeart), { ssr: false });

export default function Home() {
  const api = "//localhost:3001";
  const [data, setData] = useState([]);
  const [featuredData, setFeaturedData] = useState([]);
  const [mostLikedData, setMostLikedData] = useState([]);
  const [currentLikes, setCurrentLikes] = useState([]);
  const [dataSearch, setDataSearch] = useState('');
  const [featuredSearch, setFeaturedSearch] = useState('');
  const [mostLikedSearch, setMostLikedSearch] = useState('');

  const fetchArtigos = async () => {
    try {
      const response = await axios.get(`${api}/articles`);
      setData(response.data);
    } catch (error) {
      console.error('Erro ao obter a lista de artigos:', error);
    }
  };

  useEffect(() => {
    fetchArtigos();
  }, []);

  useEffect(() => {
    if (data) {
      const sorted = [...data].sort((a, b) => b.kb_liked_count - a.kb_liked_count);
      const top10 = sorted.slice(0, 10);
      const featured = sorted.filter((element) => {
        return (element.kb_featured);
      })

      setFeaturedData(featured.map(featuredArtigo => ({ ...featuredArtigo, curtido: false})));
      setMostLikedData(top10.map(artigo => ({ ...artigo, curtido: false })));
    }
  }, [data]);

  const handleLike = async (id) => {
    try {
      let like = 1;
      if (currentLikes.includes(id)){
        currentLikes.splice(currentLikes.indexOf(id), 1);
        like = -1;
      } else{
        currentLikes.push(id);
      }

      await axios.post(`${api}/articles/${id}/like`, {like});



      fetchArtigos();
    } catch (error) {
      console.error('Erro ao dar like:', error);
    }
  };

  const handleFeaturedData = (e) => {
    setFeaturedSearch(e.target.value);
  };

  const handleSearchMostLikedData = (e) => {
    setMostLikedSearch(e.target.value);
  };

  const handleSearchData = (e) => {
    setDataSearch(e.target.value);
  };

  const filteredFeaturedData = featuredData.filter((artigo) =>
      artigo.kb_title.toLowerCase().includes(featuredSearch.toLowerCase())
  );

  const filteredMostLikedData = mostLikedData.filter((artigo) =>
    artigo.kb_title.toLowerCase().includes(mostLikedSearch.toLowerCase())
  );

  const filteredData = data.filter((artigo) =>
    artigo.kb_title.toLowerCase().includes(dataSearch.toLowerCase())
  );

  return (
    <>
      <HomeHeader />
      <main>
        <section>
          <div className="flex justify-center flex-col items-center my-10">
            <h1>
              Artigos em destaque
            </h1>

            <input
                className="search-input"
                type="text"
                placeholder="Pesquisar por nome..."
                value={featuredSearch}
                onChange={handleFeaturedData}
            />
          </div>
          <div className="grid grid-cols-3 gap-4 m-20">
            {filteredFeaturedData.map((featuredArticle) => (
                <a href={`/Pages/Artigo?id=${featuredArticle._id}`} key={featuredArticle._id} className="flex justify-center items-center flex-col gap-10 p-4 border border-gray-300">
                  <h3>{featuredArticle.kb_title}</h3>
                  <p>{featuredArticle.kb_body}</p>
                  <div className="flex items-center">
                    <button onClick={() => handleLike(featuredArticle._id)}>
                      <FaHeart className={(currentLikes.includes(featuredArticle._id)) ? 'text-red-500' : ''} />
                    </button>
                    <span>{(featuredArticle.kb_liked_count) ? featuredArticle.kb_liked_count : 0}</span>
                  </div>
                </a>
            ))}
          </div>
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
              <a href={`/Pages/Artigo?id=${artigoCurtido._id}`} key={artigoCurtido._id} className="flex justify-center items-center flex-col gap-10 p-4 border border-gray-300">
                <h3>{artigoCurtido.kb_title}</h3>
                <p>{artigoCurtido.kb_body}</p>
                <div className="flex items-center">
                  <button onClick={() => handleLike(artigoCurtido._id)}>
                    <FaHeart className={(currentLikes.includes(artigoCurtido._id)) ? 'text-red-500' : ''} />
                  </button>
                  <span>{(artigoCurtido.kb_liked_count) ? artigoCurtido.kb_liked_count : 0}</span>
                </div>
              </a>
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
              <a href={`/Pages/Artigo?id=${artigo._id}`} key={artigo._id} className="flex justify-center items-center flex-col gap-10 p-4 border border-gray-300">
                <h3>{artigo.kb_title}</h3>
                <p>{artigo.kb_body}</p>
                <div className="flex items-center">
                  <button onClick={() => handleLike(artigo._id)}>
                    <FaHeart className={(currentLikes.includes(artigo._id)) ? 'text-red-500' : ''} />
                  </button>
                  <span>{(artigo.kb_liked_count) ? artigo.kb_liked_count : 0}</span>
                </div>
              </a>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}
