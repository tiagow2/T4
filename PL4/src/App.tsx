import React from "react";
import ClienteForm from "./components/ClienteForm";

function App() {
  return (
    <div className="container">
      <h1 className="mt-4">Sistema PetLovers - Cadastro de Cliente</h1>
      <ClienteForm
        onSubmit={(cliente) => {
          console.log("Cliente enviado:", cliente);
        }}
      />
    </div>
  );
}

export default App;
