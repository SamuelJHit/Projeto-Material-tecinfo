import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import ClienteForm from '../components/ClienteForm'
import { clienteService } from '../services/clienteService'
import type { Cliente, ClienteInput } from '../types/Cliente'

export default function ClienteEditarPage() {
    const { id } = useParams<{ id: string }>()
    const navigate = useNavigate()

    const [cliente, setCliente] = useState<Cliente | null>(null)
    const [isLoading, setIsLoading] = useState(true)
    const [erro, setErro] = useState<string | null>(null)

    useEffect(() => {
        async function carregar() {
            try {
                const dados = await clienteService.buscarPorId(id!)
                setCliente(dados)
            } catch {
                setErro('Cliente não encontrado.')
            } finally {
                setIsLoading(false)
            }
        }
        carregar()
    }, [id])

    async function handleAtualizar(dados: ClienteInput) {
        await clienteService.atualizar(id!, dados)
        navigate('/clientes')
    }

    if (isLoading) return <p>Carregando cliente...</p>
    if (erro || !cliente) return <p className="erro">{erro ?? 'Erro inesperado.'}</p>

    const {id: _id, ...valoresIniciais } = cliente

    return (
        <section>
        <h2>Editar Cliente #{cliente.id}</h2>
        <ClienteForm
            valoresIniciais={valoresIniciais}
            onSubmit={handleAtualizar}
            textoBotao="Atualizar"
        />
        </section>
    )
}