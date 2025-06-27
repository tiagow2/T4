import axios from "axios";
import { Cliente } from "../types/Cliente";

// Base URL da sua API Spring
const API_BASE = "http://localhost:32831/cliente";

// Instância personalizada do Axios
const axiosInstance = axios.create({
  baseURL: API_BASE,
  // Permitindo redirecionamento (caso necessário)
  maxRedirects: 5,
});

// Função para listar todos os clientes
export function listarClientes() {
  return axiosInstance.get<Cliente[]>("/clientes")
    .catch(error => {
      if (error.response && error.response.status === 302) {
        console.warn("Redirecionamento 302 tratado.");
        return { data: error.response.data };
      } else {
        console.error("Erro ao listar clientes:", error.response?.data || error.message);
        throw error;
      }
    });
}

// Buscar cliente por ID
export function buscarCliente(id: number) {
  return axiosInstance.get<Cliente>(`/${id}`);
}

// Cadastrar novo cliente
export function cadastrarCliente(cliente: Cliente) {
  return axiosInstance.post("/cadastrar", cliente)
    .catch(error => {
      console.error("Erro ao cadastrar cliente:", error.response?.data || error.message);
      throw error;
    });
}

// Atualizar cliente
export function atualizarCliente(cliente: Cliente) {
  return axiosInstance.put("/atualizar", cliente)
    .catch(error => {
      console.error("Erro ao atualizar cliente:", error.response?.data || error.message);
      throw error;
    });
}

// Excluir cliente por ID
export function excluirCliente(id: number) {
  return axiosInstance.delete("/excluir", {
    data: { id }
  })
  .catch(error => {
    console.error("Erro ao excluir cliente:", error.response?.data || error.message);
    throw error;
  });
}
