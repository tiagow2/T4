import { useEffect, useState } from "react";
import { listarClientes, excluirCliente } from "../services/ClienteService";
import { Cliente } from "../types/Cliente";

export default function ClienteLista() {
  const [clientes, setClientes] = useState<Cliente[]>([]);

 const carregarClientes = () => {
  listarClientes()
    .then((res) => {
      setClientes(res.data);
    })
    .catch((error) => {
      if (error.response && error.response.status === 302) {
        console.warn("Redirecionamento 302 tratado.");
        setClientes(error.response.data); // ou [] se não vier nada
      } else {
        console.error("Erro ao carregar clientes:", error);
      }
    });
};


  const handleExcluir = (id: number | undefined) => {
    if (id && window.confirm("Deseja excluir o cliente?")) {
      excluirCliente(id).then(() => carregarClientes());
    }
  };

  useEffect(() => {
    carregarClientes();
  }, []);

  return (
    <div className="container mt-4">
      <h2>Lista de Clientes</h2>
      <ul className="list-group">
        {clientes.map((cliente) => (
          <li key={cliente.id} className="list-group-item d-flex justify-content-between">
            <div>
              <strong>{cliente.nome}</strong> ({cliente.nomeSocial})<br />
              {cliente.email ?? "sem email"} - {cliente.endereco?.cidade}
            </div>
            <button className="btn btn-danger" onClick={() => handleExcluir(cliente.id)}>
              Excluir
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
