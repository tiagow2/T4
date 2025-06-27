import React, { useState, useEffect } from "react";

export interface Endereco {
  estado: string;
  cidade: string;
  bairro: string;
  rua: string;
  numero: string;
  codigoPostal: string;
  informacoesAdicionais?: string;
}

export interface Telefone {
  id?: number; // Corrigido: id agora é opcional
  ddd: string;
  numero: string;
}

export interface Cliente {
  id?: number;
  nome: string;
  nomeSocial: string;
  email?: string;
  endereco: Endereco;
  telefones: Telefone[];
}

interface Props {
  clienteExistente?: Cliente;
  onSubmit: (cliente: Cliente) => void;
}

const ClienteForm: React.FC<Props> = ({ clienteExistente, onSubmit }) => {
  const [cliente, setCliente] = useState<Cliente>({
    nome: "",
    nomeSocial: "",
    email: "",
    endereco: {
      estado: "",
      cidade: "",
      bairro: "",
      rua: "",
      numero: "",
      codigoPostal: "",
      informacoesAdicionais: "",
    },
    telefones: [{ ddd: "", numero: "" }],
  });

  useEffect(() => {
    if (clienteExistente) {
      setCliente(clienteExistente);
    }
  }, [clienteExistente]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCliente((prev) => ({ ...prev, [name]: value }));
  };

  const handleEnderecoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCliente((prev) => ({
      ...prev,
      endereco: { ...prev.endereco, [name]: value },
    }));
  };

  const handleTelefoneChange = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    const novosTelefones = [...cliente.telefones];
    novosTelefones[index] = {
      ...novosTelefones[index],
      [name]: value,
    };
    setCliente((prev) => ({ ...prev, telefones: novosTelefones }));
  };

  const adicionarTelefone = () => {
    setCliente((prev) => ({
      ...prev,
      telefones: [...prev.telefones, { ddd: "", numero: "" }],
    }));
  };

  const removerTelefone = (index: number) => {
    const novosTelefones = [...cliente.telefones];
    novosTelefones.splice(index, 1);
    setCliente((prev) => ({ ...prev, telefones: novosTelefones }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Limpa os dados antes de enviar
    const clienteLimpo: Cliente = {
      nome: cliente.nome,
      nomeSocial: cliente.nomeSocial,
      email: cliente.email,
      endereco: { ...cliente.endereco },
      telefones: cliente.telefones.map(({ ddd, numero }) => ({ ddd, numero }))
    };

    onSubmit(clienteLimpo);
  };

  return (
    <form onSubmit={handleSubmit} className="container mt-4">
      <h2>{clienteExistente ? "Editar Cliente" : "Cadastrar Cliente"}</h2>

      <div className="mb-3">
        <label className="form-label">Nome</label>
        <input
          name="nome"
          value={cliente.nome}
          onChange={handleInputChange}
          className="form-control"
          required
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Nome Social</label>
        <input
          name="nomeSocial"
          value={cliente.nomeSocial}
          onChange={handleInputChange}
          className="form-control"
        />
      </div>

      <div className="mb-3">
        <label className="form-label">E-mail</label>
        <input
          name="email"
          type="email"
          value={cliente.email || ""}
          onChange={handleInputChange}
          className="form-control"
        />
      </div>

      <h4 className="mt-4">Endereço</h4>
      {Object.entries(cliente.endereco).map(([key, value]) => (
        <div className="mb-2" key={key}>
          <label className="form-label">{key}</label>
          <input
            name={key}
            value={value}
            onChange={handleEnderecoChange}
            className="form-control"
          />
        </div>
      ))}

      <h4 className="mt-4">Telefones</h4>
      {cliente.telefones.map((telefone, index) => (
        <div className="mb-3" key={index}>
          <label className="form-label">Telefone {index + 1}</label>
          <div className="d-flex gap-2">
            <input
              name="ddd"
              placeholder="DDD"
              value={telefone.ddd}
              onChange={(e) => handleTelefoneChange(index, e)}
              className="form-control"
            />
            <input
              name="numero"
              placeholder="Número"
              value={telefone.numero}
              onChange={(e) => handleTelefoneChange(index, e)}
              className="form-control"
            />
            <button
              type="button"
              onClick={() => removerTelefone(index)}
              className="btn btn-danger"
            >
              Remover
            </button>
          </div>
        </div>
      ))}
      <button
        type="button"
        onClick={adicionarTelefone}
        className="btn btn-secondary mb-3"
      >
        Adicionar Telefone
      </button>

      <div>
        <button type="submit" className="btn btn-primary">
          {clienteExistente ? "Salvar Alterações" : "Cadastrar Cliente"}
        </button>
      </div>
    </form>
  );
};

export default ClienteForm;
