import React from "react";
import ClienteForm from "./components/ClienteForm";
import ClienteLista from "./components/ClienteLista";
import { cadastrarCliente } from "./services/ClienteService";
import { Cliente } from "./types/Cliente";

function App() {
  const handleCadastro = (cliente: Cliente) => {
    cadastrarCliente(cliente)
      .then(() => {
        alert("Cliente cadastrado com sucesso!");
        window.location.reload(); // força recarregar lista (ou use estado lifting)
      })
      .catch((err) => {
        console.error("Erro ao cadastrar cliente:", err);
        alert("Erro ao cadastrar cliente.");
      });
  };

  return (
    <div className="container">
      <h1 className="mt-4">Sistema PetLovers - Cadastro de Cliente</h1>
      <ClienteForm onSubmit={handleCadastro} />
      <hr />
      <ClienteLista />
    </div>
  );
}

export default App;
