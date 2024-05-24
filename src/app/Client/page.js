"use client";
import React, { useState } from 'react';
import api from '../services'

export default function Home() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');
  const [endereco, setEndereco] = useState('');
  const [errors, setErrors] = useState({});
  const [mensagem, setMensagem] = useState('');
  const handleNomeChange = (e) => {
    setNome(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleTelefoneChange = (e) => {
    setTelefone(e.target.value);
  };

  const handleEnderecoChange = (e) => {
    setEndereco(e.target.value);
  };

  const validateForm = () => {
    const newErrors = {};
    if (!nome) newErrors.nome = 'Nome é obrigatório';
    if (!email) newErrors.email = 'Email é obrigatório';
    if (!telefone) newErrors.telefone = 'Telefone é obrigatório';
    if (!endereco) newErrors.endereco = 'Endereço é obrigatório';
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const clienteData = { nome, email, telefone, endereco };

    try {
      const response = await api.post('/client', clienteData);
      setMensagem('Cliente cadastrado com sucesso!');
      console.log('Cliente cadastrado com sucesso!');
    
      setNome('');
      setEmail('');
      setTelefone('');
      setEndereco('');
      setErrors({});
    } catch (error) {
      console.error('Erro ao cadastrar cliente:', error.message);
      setMensagem('Erro ao cadastrar cliente: ' + error.message);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 lg:p-8 xl:p-12">
      
      <form onSubmit={handleSubmit} className="container mx-auto mt-10 max-w-md">
        <h1 className="text-3xl font-bold mb-8 text-center">Cadastro de Cliente</h1>
        {mensagem && <div className="mb-4 text-center text-red-500">{mensagem}</div>}
        <div className="mb-4">
          <label htmlFor="nome" className="block text-sm font-medium text-gray-700">Nome</label>
          <input 
            type="text" 
            id="nome" 
            name="nome" 
            value={nome} 
            onChange={handleNomeChange} 
            className="mt-1 p-2 border border-gray-300 rounded-md w-full text-black" 
          />
          {errors.nome && <p className="text-red-500 text-sm mt-1">{errors.nome}</p>}
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
          <input 
            type="email" 
            id="email" 
            name="email" 
            value={email} 
            onChange={handleEmailChange} 
            className="mt-1 p-2 border border-gray-300 rounded-md w-full text-black" 
          />
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
        </div>
        <div className="mb-4">
          <label htmlFor="telefone" className="block text-sm font-medium text-gray-700">Telefone</label>
          <input 
            type="tel" 
            id="telefone" 
            name="telefone" 
            value={telefone} 
            onChange={handleTelefoneChange} 
            className="mt-1 p-2 border border-gray-300 rounded-md w-full text-black" 
          />
          {errors.telefone && <p className="text-red-500 text-sm mt-1">{errors.telefone}</p>}
        </div>
        <div className="mb-4">
          <label htmlFor="endereco" className="block text-sm font-medium text-gray-700">Endereço</label>
          <input 
            type="text" 
            id="endereco" 
            name="endereco" 
            value={endereco} 
            onChange={handleEnderecoChange} 
            className="mt-1 p-2 border border-gray-300 rounded-md w-full text-black" 
          />
          {errors.endereco && <p className="text-red-500 text-sm mt-1">{errors.endereco}</p>}
        </div>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 w-full">Cadastrar</button>
      </form>
    </main>
  );
}
