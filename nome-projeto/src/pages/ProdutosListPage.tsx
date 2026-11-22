import {useEffect, useState} from 'react'
import { Link } from 'react-router-dom'
import type { Produto } from '../types/produto'
import { produtoService } from '../services/produtoService'

const formatarMoeda = (valor: number) => 
    valor.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})

export default function ProdutosListPage() {
    const [produtos, setProdutos] = useState<Produto[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [erro, setErro] = useState<string | null>(null)

    useEffect(() => {
        async function carregar() {
            try {
                const dados = await produtoService.listar()
                setProdutos(dados)
            }  catch {
                setErro('Não foi possivel carregar os produtos. Verifique se a API está')
            } finally {
                setIsLoading(false)
            }
        }
        carregar()
    }, [])

    async function handleExcluir(id: number) {
        if (!window.confirm('Deseja realmente excluir o produto?')) return 
        try {
            await produtoService.excluir(id)
            setProdutos((atuais) => atuais.filter((p) => p.id !== id))
        } catch {
            alert('Não foi possível excluir o produto. Verifique se a API está funcionando corretamente.')
        }
    }

    if (isLoading) return <p> Carregando produtos... </p>
    if (erro) return <p className="erro">{erro}</p>
    return (
        <section>
            <h2>Produtos em Estoque</h2>

            {produtos.length === 0 ? (
                <p>Nenhum produto cadastrado.</p>
            ) : (
                <table>
                <thead>
                    <tr>
                    <th>Código</th>
                    <th>Nome do Produto</th>
                    <th>Marca</th>
                    <th>Preço de Venda</th>
                    <th>Estoque Atual</th>
                    <th>Unidade</th>
                    <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {produtos.map((produto) => (
                    <tr key={produto.id}>
                        <td>{produto.codigoBarras}</td>
                        <td>{produto.nome}</td>
                        <td>{produto.marca}</td>
                        <td>{formatarMoeda(produto.precoVenda)}</td>
                        <td>{produto.estoqueAtual}</td>
                        <td>{produto.unidade}</td>
                        <td>
                        <Link to={`/produtos/${produto.id}/editar`}>Editar</Link>
                        <button onClick={() => handleExcluir(produto.id)}>Excluir</button>
                        </td>
                    </tr>
                    ))}
                </tbody>
                </table>
            )}
        </section>
        )
}