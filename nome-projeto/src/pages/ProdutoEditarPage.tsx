import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import ProdutoForm from '../components/ProdutoForm'
import { produtoService } from '../services/produtoService'
import type { Produto, ProdutoInput } from '../types/produto'

export default function ProdutoEditarPage() {
    const { id } = useParams<{ id: string }>()
    const navigate = useNavigate()

    const [produto, setProduto] = useState<Produto | null>(null)
    const [isLoading, setIsLoanding] = useState(true)
    const [erro, setErro] = useState<string | null>(null)

    useEffect(() => {
        async function carregar() {
            try {
                const dados = await produtoService.buscarPorId(id!)
                setProduto(dados)
            } catch (error) {
                setErro('Erro ao carregar o produto.')
            } finally {
                setIsLoanding(false)
            }
        }
        carregar()
    }, [id])

    async function handleAtualizar(dados: ProdutoInput) {
        await produtoService.atualizar(id!, dados)
        navigate('/')
    }

    if(isLoading) return <p>Carregando produto...</p>
    if(erro || !produto) return <p className="erro">{erro ?? 'Erro inesperado.'}</p>

    const { id: _id, ...valoresIniciais } = produto

    return (
        <section>
      <h2>Editar Produto #{produto.id}</h2>
      <ProdutoForm
        valoresIniciais={valoresIniciais}
        onSubmit={handleAtualizar}
        textoBotao="Atualizar"
      />
    </section>
    )
}