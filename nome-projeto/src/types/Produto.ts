export interface Produto {
    id: number
    nome: string
    codigoBarras: string
    marca: string
    familia: string
    precoVenda: number
    estoqueatual: number
    unidade: string
}

export type ProdutoInput = Omit<Produto, 'id'>