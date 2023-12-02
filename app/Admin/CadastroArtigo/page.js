"use client";
import { MdDeleteForever, MdSearch } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import React, { useEffect, useState } from "react";
import axios from "axios";
import HeaderAdmin from "@/src/components/HeaderAdmin/page";
import { useRouter } from "next/navigation";

const CadastroArtigo = () => {
  const api = "//localhost:3001";
  const [kb_title, setNome] = useState("");
  const [kb_body, setDescricao] = useState("");
  const [kb_keywords, setKeywords] = useState("");
  const [kb_published, setPublished] = useState(false);
  const [kb_suggestion, setSuggestion] = useState(false);
  const [kb_featured, setFeatured] = useState(false);
  const [kb_author_email, setAuthorEmail] = useState("");
  const [kb_published_date, setPublishedDate] = useState("");
  const [kb_input_date, setInputDate] = useState("");
  const [editingArtigoId, setEditingArtigoId] = useState(null);
  const [artigos, setArtigos] = useState([]);
  const router = useRouter();

 const checkAuth = async () => {
    try {
      const response = await axios.post(`${api}/auth`);
      if (response.data.authenticated) {
        console.log("ok")
      } else {
        router.push("/404");
      }
    } catch (error) {
      console.error("Erro ao verificar autenticação:", error);
    }
  };

  useEffect(() => {
    fetchArtigos();
    checkAuth();
  }, []);

  const fetchArtigos = async () => {
    try {
      const response = await axios.get(`${api}/articles`);
      setArtigos(response.data);
    } catch (error) {
      console.error("Erro ao obter a lista de artigos:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingArtigoId) {
        await axios.put(`${api}/articles/${editingArtigoId}`, {
          kb_title,
          kb_body,
          kb_keywords,
          kb_published,
          kb_suggestion,
          kb_featured,
          kb_author_email,
          kb_published_date,
        });
      } else {
        await axios.post(`${api}/articles`, {
          kb_title,
          kb_body,
          kb_keywords,
          kb_published,
          kb_suggestion,
          kb_featured,
          kb_author_email,
          kb_published_date,
        });
      }

      fetchArtigos();

      setNome("");
      setDescricao("");
      setKeywords("");
      setPublished("");
      setSuggestion("");
      setFeatured("");
      setAuthorEmail("");
      setPublishedDate("");
      setEditingArtigoId(null);
    } catch (error) {
      console.error("Erro ao cadastrar artigo:", error);
    }
  };

  const handleEdit = (id) => {
    const articleToEdit = artigos.find((artigo) => artigo._id === id);

    setNome(articleToEdit.kb_title);
    setDescricao(articleToEdit.kb_body);
    setKeywords(articleToEdit.kb_keywords);
    setPublished(articleToEdit.kb_published);
    setSuggestion(articleToEdit.kb_suggestion);
    setFeatured(articleToEdit.kb_featured);
    setAuthorEmail(articleToEdit.kb_author_email);
    setPublishedDate(articleToEdit.kb_published_date);
    setInputDate(articleToEdit.kb_input_date);
    setEditingArtigoId(id);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${api}/articles/${id}`);

      fetchArtigos();
    } catch (error) {
      console.error("Erro ao deletar artigo:", error);
    }
  };

  return (
    <>
      <HeaderAdmin cadastro />
      <main className="container mx-auto mt-8 grid grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-lg shadow-md max-h-[500px] overflow-auto flex flex-col items-center justify-center">
          <h2 className="text-2xl mb-4">
            {editingArtigoId ? "Editar Artigo" : "Cadastro de Artigo"}
          </h2>
          <form onSubmit={handleSubmit} className="flex flex-col w-full">
            <label htmlFor="nome" className="form-label">
              Nome:
            </label>
            <input
              type="text"
              id="nome"
              name="nome"
              value={kb_title}
              onChange={(e) => setNome(e.target.value)}
              className="form-input"
            />

            <label htmlFor="descricao" className="form-label">
              Descrição:
            </label>
            <textarea
              id="descricao"
              name="descricao"
              value={kb_body}
              onChange={(e) => setDescricao(e.target.value)}
              className="form-input"
            />

            <label htmlFor="keywords" className="form-label">
              Palavras Chave:
            </label>
            <input
              type="text"
              id="keywords"
              name="keywords"
              value={kb_keywords}
              onChange={(e) => setKeywords(e.target.value)}
              className="form-input"
            />
            <div className="row">
              <div className="col-md-4">
                <label htmlFor="publicado" className="form-label">
                  Publicado
                </label>
                <input
                  type="checkbox"
                  id="publicado"
                  name="publicado"
                  value="true"
                  checked={kb_published}
                  onChange={(e) => setPublished(e.target.checked)}
                  className="form-input"
                />
              </div>

              <div className="col-md-4">
                <label htmlFor="suggestion" className="form-label">
                  Sugestão
                </label>
                <input
                  type="checkbox"
                  id="suggestion"
                  name="suggestion"
                  value="true"
                  checked={kb_suggestion}
                  onChange={(e) => setSuggestion(e.target.checked)}
                  className="form-input"
                />
              </div>

              <div className="col-md-4">
                <label htmlFor="featured" className="form-label">
                  Destaque
                </label>
                <input
                  type="checkbox"
                  id="featured"
                  name="featured"
                  value="true"
                  checked={kb_featured}
                  onChange={(e) => setFeatured(e.target.checked)}
                  className="form-input"
                />
              </div>
            </div>

            <label htmlFor="author_email" className="form-label">
              Email do Autor:
            </label>
            <input
              type="email"
              id="author_email"
              name="author_email"
              value={kb_author_email}
              onChange={(e) => setAuthorEmail(e.target.value)}
              className="form-input"
            />

            <label htmlFor="published_date" className="form-label">
              Data de Publicação:
            </label>
            <input
              type="date"
              id="published_date"
              name="published_date"
              value={kb_input_date}
              onChange={(e) => setPublishedDate(e.target.value)}
              className="form-input"
            />
            <button type="submit" className="form-button">
              {editingArtigoId ? "Atualizar Artigo" : "Cadastrar Artigo"}
            </button>
          </form>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md max-h-[500px] overflow-auto">
          <h2 className="text-2xl mb-4">Lista de Artigos</h2>
          {artigos.map((artigo) => (
            <div
              key={artigo._id}
              className="bg-white p-6 rounded-lg shadow-md my-10 flex flex-col gap-5"
            >
              <p>Nome: {artigo.kb_title}</p>
              <p>Descrição: {artigo.kb_body}</p>
              <p>Palavras Chave: {artigo.kb_keywords}</p>
              <p>Publicado: {artigo.kb_published ? "Sim" : "Não"}</p>
              <p>Sugestão: {artigo.kb_suggestion ? "Sim" : "Não"}</p>
              <p>Destaque: {artigo.kb_featured ? "Sim" : "Não"}</p>
              <p>Email do Autor: {artigo.kb_author_email}</p>
              <p>Data de Publicação: {artigo.kb_published_date}</p>
              <div className="flex justify-center gap-10 items-center my-3">
                <button onClick={() => handleEdit(artigo._id)}>
                  <FaRegEdit className="text-green-500 text-4xl" />
                </button>
                <button onClick={() => handleDelete(artigo._id)}>
                  <MdDeleteForever className="text-red-500 text-4xl" />
                </button>
                <a href={`/Artigo/${artigo._id}`}>
                  <MdSearch className="text-black-500 text-4xl" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </main>
    </>
  );
};

export default CadastroArtigo;
