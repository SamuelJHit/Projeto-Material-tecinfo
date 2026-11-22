import type { Produto, ProdutoInput } from '../types/produto'

const BASE_URL = '/api/produtos'

async function request<T>(url: string, options?: RequestInit): Promise<T> {
  const response = await fetch(url, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  })

  // fetch NÃO lança erro em 404/500, então verificamos manualmente
  if (!response.ok) {
    throw new Error(`Erro ${response.status}: ${response.statusText}`)
  }

  return response.json() as Promise<T>
}

export const produtoService = {
  listar: () => request<Produto[]>(BASE_URL),

  buscarPorId: (id: number | string) =>
    request<Produto>(`${BASE_URL}/${id}`),

  criar: (dados: ProdutoInput) =>
    request<Produto>(BASE_URL, {
      method: 'POST',
      body: JSON.stringify(dados),
    }),

  atualizar: (id: number | string, dados: ProdutoInput) =>
    request<Produto>(`${BASE_URL}/${id}`, {
      method: 'PUT',
      body: JSON.stringify(dados),
    }),

  excluir: (id: number) =>
    request<void>(`${BASE_URL}/${id}`, { method: 'DELETE' }),
}