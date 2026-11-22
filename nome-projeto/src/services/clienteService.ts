import type { Cliente, ClienteInput } from '../types/Cliente'

const BASE_URL = '/api/clientes'

async function request <T>(url: string, options?: RequestInit): Promise<T> {
    const response = await fetch(url, {
        headers: {'Content-Type': 'application/json'},
        ...options,
    })

    if (!response.ok) {
        throw new Error(`Erro ${response.status}: ${response.statusText}`)
    }
    return response.json() as Promise<T>
}

export const clienteService = {
    listar: () => request<Cliente[]>(BASE_URL),

    buscarPorId: (id: number | string) =>
        request<Cliente>(`${BASE_URL}/${id}`),

    criar: (dados: ClienteInput) =>
        request<Cliente>(BASE_URL, {
            method: 'POST',
            body: JSON.stringify(dados),
        }),

    atualizar: (id: number | string, dados: ClienteInput) =>
        request<Cliente>(`${BASE_URL}/${id}`, {
            method: 'PUT',
            body: JSON.stringify(dados),
        }),

    excluir: (id: number) =>
        request<void>(`${BASE_URL}/${id}`, { method: 'DELETE' }),
}