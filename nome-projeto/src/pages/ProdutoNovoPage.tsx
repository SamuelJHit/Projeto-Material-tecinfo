import { useNavigate } from 'react-router-dom'
import ProdutoForm from '../components/ProdutoForm'
import { produtoService } from '../services/produtoService'
import type { ProdutoInput } from '../types/produto'

export default function ProdutoNovoPage() {
    const navigate = useNavigate()

    async function handleCriar(dados: ProdutoInput) {
        await produtoService.criar(dados)
        navigate('/')
    }
    return (
        <section>
            <h2>Novo Produto</h2>
            <ProdutoForm onSubmit={handleCriar} textoBotao="Salvar" />
        </section>
    )
}