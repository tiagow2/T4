import axios from "axios";
import { Cliente } from "../types/Cliente";

const API_BASE = "http://localhost:32831/cliente";

export function listarClientes() {
  return axios.get<Cliente[]>(`${API_BASE}/clientes`);
}

export function buscarCliente(id: number) {
  return axios.get<Cliente>(`${API_BASE}/${id}`);
}

export function cadastrarCliente(cliente: Cliente) {
  return axios.post(`${API_BASE}/cadastrar`, cliente);
}

export function atualizarCliente(cliente: Cliente) {
  return axios.put(`${API_BASE}/atualizar`, cliente);
}

export function excluirCliente(id: number) {
  return axios.delete(`${API_BASE}/excluir`, { data: { id } });
}