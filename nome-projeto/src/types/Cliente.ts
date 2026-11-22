export interface Cliente {
    id: number
    nome: string
    telefone: string
    rua: string
    numero: string
    bairro: string
    cidade: string
    cep: string
    pontoReferencia: string
}

export type ClienteInput = Omit<Cliente, 'id'>