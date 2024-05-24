
import React, { useState } from 'react';

const Modal = ({ cliente, isOpen, onClose, onSave, onDelete }) => {
    const [formData, setFormData] = useState({});
    const [status, setStatus] = useState('');
    const [valor, setValor] = useState(null);

    
    React.useEffect(() => {
        setFormData(cliente || {});
        setStatus(cliente ? cliente.status : '');
        setValor(cliente && cliente.valor ? cliente.valor : null);
    }, [cliente]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'status') {
            setStatus(value);
        } else if (name === 'valor') {
            setValor(value ? parseFloat(value) : null);
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleSave = () => {
        onSave({ ...formData, status, valor });
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-md shadow-md w-full max-w-lg">
                <h2 className="text-xl font-bold mb-4">{cliente ? 'Editar Cliente' : 'Adicionar Cliente'}</h2>
                <form>
                    <div className="mb-4">
                        <label htmlFor="nome" className="block text-sm font-medium text-gray-700">Nome</label>
                        <input type="text" id="nome" name="nome" value={formData.nome || ''} onChange={handleChange} className="mt-1 p-2 border border-gray-300 rounded-md w-full text-black" />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                        <input type="email" id="email" name="email" value={formData.email || ''} onChange={handleChange} className="mt-1 p-2 border border-gray-300 rounded-md w-full text-black" />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="telefone" className="block text-sm font-medium text-gray-700">Telefone</label>
                        <input type="tel" id="telefone" name="telefone" value={formData.telefone || ''} onChange={handleChange} className="mt-1 p-2 border border-gray-300 rounded-md w-full text-black" />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="endereco" className="block text-sm font-medium text-gray-700">Endereço</label>
                        <input type="text" id="endereco" name="endereco" value={formData.endereco || ''} onChange={handleChange} className="mt-1 p-2 border border-gray-300 rounded-md w-full text-black" />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="status" className="block text-sm font-medium text-gray-700">Status</label>
                        <select id="status" name="status" value={status} onChange={handleChange} className="mt-1 p-2 border border-gray-300 rounded-md w-full text-black">
                            <option value="">Selecione...</option>
                            <option value="Aguardando Atendimento">Aguardando Atendimento</option>
                            <option value="Em Atendimento">Em Atendimento</option>
                            <option value="Proposta Feita">Proposta Feita</option>
                            <option value="Não Concluído">Não Concluído</option>
                            <option value="Vendido">Vendido</option>
                        </select>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="valor" className="block text-sm font-medium text-gray-700">Valor</label>
                        <input type="number" id="valor" name="valor" value={valor || ''} onChange={handleChange} className="mt-1 p-2 border border-gray-300 rounded-md w-full text-black" />
                    </div>
                </form>
                <div className="flex justify-end space-x-4">
                    <button onClick={onClose} className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600">Cancelar</button>
                    {cliente && <button onClick={() => onDelete(cliente._id)} className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600">Excluir</button>}
                    <button onClick={handleSave} className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">Salvar</button>
                </div>
            </div>
        </div>
    );
};

export default Modal;
