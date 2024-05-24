"use client";
import React, { useState, useEffect } from 'react';
import api from '../services';
import EditClient from '../components/EditClient'

export default function AnalyticsClient() {
    const [clientes, setClientes] = useState([]);
    const [clientesPorStatus, setClientesPorStatus] = useState({});
    const [filtros, setFiltros] = useState({
        periodo: '',
        agente: '',
        status: ''
    });

    const [selectedCliente, setSelectedCliente] = useState(null); 
    const [isModalOpen, setIsModalOpen] = useState(false);

    const fetchClientes = async (filtros = {}) => {
        try {
            const params = new URLSearchParams();

            if (filtros.status) {
                params.append('status', filtros.status);
            }
            if (filtros.agente) {
                params.append('agenteId', filtros.agente);
            }
            if (filtros.dataInicio) {
                params.append('dataInicio', filtros.dataInicio);
            }
            if (filtros.dataFim) {
                params.append('dataFim', filtros.dataFim);
            }

            const response = await api.get(`/filtro?${params.toString()}`);
            setClientes(response.data);
        } catch (error) {
            console.error('Erro ao buscar clientes:', error.message);
        }
    };

    const agruparClientesPorStatus = () => {
        const clientesAgrupados = {};
        clientes.forEach((cliente) => {
            if (!clientesAgrupados[cliente.status]) {
                clientesAgrupados[cliente.status] = [];
            }
            clientesAgrupados[cliente.status].push(cliente);
        });
        setClientesPorStatus(clientesAgrupados);
    };

    useEffect(() => {
        fetchClientes();
    }, []);

    useEffect(() => {
        agruparClientesPorStatus();
    }, [clientes]);

    const handleFiltroChange = (e) => {
        const { name, value } = e.target;
        setFiltros({ ...filtros, [name]: value });
    };

    const aplicarFiltros = () => {
        let [dataInicio, dataFim] = [null, null];
        if (filtros.periodo) {
            const datas = filtros.periodo.split(' - ');
            dataInicio = datas[0];
            dataFim = datas[1];
        }
        fetchClientes({ ...filtros, dataInicio, dataFim });
    };

    const handleDelete = async (id) => {
        try {
            await api.delete(`/client/${id}`);
            setClientes(clientes.filter(cliente => cliente._id !== id));
            alert('Cliente removido com sucesso!');
        } catch (error) {
            console.error('Erro ao excluir cliente:', error.message);
            alert('Erro ao excluir cliente: ' + error.message);
        }
    };

    const handleEditClick = (cliente) => {
        setSelectedCliente(cliente);
        setIsModalOpen(true);
    };

    const handleModalClose = () => {
        setSelectedCliente(null);
        setIsModalOpen(false);
    };

    const handleModalSave = async (cliente) => {
        try {
            const response = await api.put(`/client/${cliente._id}`, cliente);
            setClientes(clientes.map(c => (c._id === cliente._id ? response.data : c)));
            handleModalClose();
        } catch (error) {
            console.error('Erro ao atualizar cliente:', error.message);
        }
    };

    const handleModalDelete = async (id) => {
        try {
            await api.delete(`/client/${id}`);
            setClientes(clientes.filter(cliente => cliente._id !== id));
            handleModalClose();
        } catch (error) {
            console.error('Erro ao excluir cliente:', error.message);
        }
    };

    return (
        <main className="flex flex-col items-center justify-center p-4 md:p-8 lg:p-12 xl:p-16">
            <h1 className="text-3xl font-bold mb-8">Analytics de Clientes</h1>
            <div className="mb-4 flex flex-col lg:flex-row lg:space-x-4">
                <div className="w-full lg:w-1/4">
                    <label htmlFor="periodo" className="block text-sm font-medium text-gray-700">Período</label>
                    <input type="text" id="periodo" name="periodo" value={filtros.periodo} onChange={handleFiltroChange} className="mt-1 p-2 border border-gray-300 rounded-md bg-black text-white w-full" placeholder="YYYY-MM-DD - YYYY-MM-DD" />
                </div>
                <div className="w-full lg:w-1/4">
                    <label htmlFor="agente" className="block text-sm font-medium text-gray-700">Agente</label>
                    <input type="text" id="agente" name="agente" value={filtros.agente} onChange={handleFiltroChange} className="mt-1 p-2 border border-gray-300 rounded-md bg-black text-white w-full" />
                </div>
                <div className="w-full lg:w-1/4">
                    <label htmlFor="status" className="block text-sm font-medium text-gray-700">Status</label>
                    <input type="text" id="status" name="status" value={filtros.status} onChange={handleFiltroChange} className="mt-1 p-2 border border-gray-300 rounded-md bg-black text-white w-full" />
                </div>
                <button onClick={aplicarFiltros} className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 mt-4 lg:mt-0">Aplicar Filtros</button>
            </div>
            <div className="grid grid-cols-1 gap-4">
                {Object.keys(clientesPorStatus).map((status) => (
                    <div key={status}>
                        <h2 className="text-xl font-semibold mb-4" style={{ color: '#fff' }}>{status}</h2>
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nome do Cliente</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nome do Agente</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Data/Hora de Cadastro</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Última Alteração de Status</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Valor</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ações</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {clientesPorStatus[status].map((cliente) => (
                                        <tr key={cliente._id}>
                                            <td className="px-6 py-4 whitespace-nowrap" style={{ color: '#000' }}>{cliente.nome}</td>
                                            <td className="px-6 py-4 whitespace-nowrap" style={{ color: '#000' }}>{cliente.agente.nome}</td>
                                            <td className="px-6 py-4 whitespace-nowrap" style={{ color: '#000' }}>{new Date(cliente.dataCadastro).toLocaleString()}</td>
                                            <td className="px-6 py-4 whitespace-nowrap" style={{ color: '#000' }}>{new Date(cliente.updatedAt).toLocaleString()}</td>
                                            <td className="px-6 py-4 whitespace-nowrap" style={{ color: '#000' }}>{cliente.status}</td>
                                            <td className="px-6 py-4 whitespace-nowrap" style={{ color: '#000' }}>{cliente.status === 'Vendido' ? cliente.valor : '-'}</td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <button onClick={() => handleEditClick(cliente)} className="mr-2 text-blue-600">Editar</button>
                                                <button onClick={() => handleDelete(cliente._id)} className="text-red-600">Excluir</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                ))}
            </div>

            <EditClient
                cliente={selectedCliente}
                isOpen={isModalOpen}
                onClose={handleModalClose}
                onSave={handleModalSave}
                onDelete={handleModalDelete}
            />
        </main>
    );
}
