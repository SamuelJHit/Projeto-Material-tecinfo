import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import type { Cliente } from '../types/Cliente'
import { clienteService } from '../services/clienteService'

export default function ClienteListPage() {
    const [clientes, setClientes] = useState<Cliente[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [erro, setErro] = useState<string | null>(null)

    useEffect(() => {
        async function carregar() {
            try {
                const dados = await clienteService.listar()
                setClientes(dados)
            } catch {
                setErro('Não foi possivel carregar os clientes, Verifique se a API está rodando.')
            } finally {
                setIsLoading(false)
            }
        }
        carregar()
    }, [])

    async function handleExcluir(id: number) {
        if (!window.confirm('Deseja realmente excluir este cliente?')) return

        try {
            await clienteService.excluir(id)
            setClientes((atuais) => atuais.filter((c) => c.id !== id))
        } catch {
            alert('Erro ao excluir o cliente.')
        }
    }

    if (isLoading) return <p>Carregando clientes...</p>
    if (erro) return <p className="erro">{erro}</p>

    return (
        <section>
            <h2>Clientes</h2>

            {clientes.length === 0 ? (
                <p>Nenhum cliente cadastrado.</p>
            ) : (
                <table>
                <thead>
                    <tr>
                    <th>Nome do Cliente</th>
                    <th>Telefone / WhatsApp</th>
                    <th>Bairro</th>
                    <th>Cidade</th>
                    <th>Ponto de Referência</th>
                    <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {clientes.map((cliente) => (
                    <tr key={cliente.id}>
                        <td>{cliente.nome}</td>
                        <td>{cliente.telefone}</td>
                        <td>{cliente.bairro}</td>
                        <td>{cliente.cidade}</td>
                        <td>{cliente.pontoReferencia}</td>
                        <td>
                        <Link to={`/clientes/${cliente.id}/editar`}>Editar</Link>
                        <button onClick={() => handleExcluir(cliente.id)}>Excluir</button>
                        </td>
                    </tr>
                    ))}
                </tbody>
                </table>
            )}
        </section>
    )
}