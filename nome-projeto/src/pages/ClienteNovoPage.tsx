import { useNavigate } from 'react-router-dom'
import ClienteForm from '../components/ClienteForm'
import { clienteService } from '../services/clienteService'
import type { ClienteInput } from '../types/Cliente'

export default function ClienteNovoPage() {
    const navigate = useNavigate ()

    async function handleCriar(dados: ClienteInput) {
        await clienteService.criar(dados)
        navigate('/clientes')
    }

    return (
        <section>
            <h2>Novo Cliente</h2>
            <ClienteForm onSubmit={handleCriar} textoBotao="Salvar" />
        </section>
    )
}