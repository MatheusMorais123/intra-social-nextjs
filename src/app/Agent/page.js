"use client";
import React, { useState } from 'react';
import api from '../services';

export default function Home() {
    const [agente, setAgente] = useState({
        nome: '',
        email: ''
    });
    const [mensagem, setMensagem] = useState('');
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setAgente({ ...agente, [name]: value });
    };

    const validateForm = () => {
        const newErrors = {};
        if (!agente.nome) newErrors.nome = 'Nome é obrigatório';
        if (!agente.email) newErrors.email = 'Email é obrigatório';
        return newErrors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newErrors = validateForm();
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        try {
            const response = await api.post('/agent', agente);
            setMensagem('Agente cadastrado com sucesso!');
            setAgente({ nome: '', email: '' });
            setErrors({});
        } catch (error) {
            console.error('Erro ao cadastrar agente:', error.message);
            setMensagem('Erro ao cadastrar agente: ' + error.message);
        }
    };

    return (
        <main className="flex min-h-screen flex-col items-center justify-center p-4 lg:p-8 xl:p-12">
            <div className="container mx-auto mt-10 max-w-md">
                <h1 className="text-3xl font-bold mb-8 text-center">Cadastro de Agente</h1>
                {mensagem && <div className="mb-4 text-center text-red-500">{mensagem}</div>}
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="nome" className="block text-sm font-medium text-gray-700">Nome</label>
                        <input 
                            type="text" 
                            id="nome" 
                            name="nome" 
                            value={agente.nome} 
                            onChange={handleChange} 
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
                            value={agente.email} 
                            onChange={handleChange} 
                            className="mt-1 p-2 border border-gray-300 rounded-md w-full text-black" 
                        />
                        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                    </div>
                    <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">Cadastrar</button>
                </form>
            </div>
        </main>
    );
}
