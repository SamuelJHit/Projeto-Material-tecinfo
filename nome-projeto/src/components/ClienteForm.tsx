import { useState } from 'react'
import type { FormEvent, ChangeEvent } from 'react'
import type { ClienteInput } from '../types/Cliente'

interface ClienteFormProps {
  valoresIniciais?: ClienteInput
  onSubmit: (dados: ClienteInput) => Promise<void>
  textoBotao?: string
}

const estadoVazio: ClienteInput = {
  nome: '',
  telefone: '',
  rua: '',
  numero: '',
  bairro: '',
  cidade: '',
  cep: '',
  pontoReferencia: '',
}

export default function ClienteForm({
  valoresIniciais,
  onSubmit,
  textoBotao = 'Salvar',
}: ClienteFormProps) {
  const [form, setForm] = useState<ClienteInput>(
    valoresIniciais ?? estadoVazio,
  )
  const [erro, setErro] = useState<string | null>(null)
  const [isSaving, setIsSaving] = useState(false)

  function handleChange(
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
    const { name, value } = e.target
    setForm((atual) => ({ ...atual, [name]: value }))
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setErro(null)

    
    const telefoneNumeros = form.telefone.replace(/\D/g, '')
    if (telefoneNumeros.length < 10 || telefoneNumeros.length > 11) {
      setErro('Informe um telefone válido com DDD (10 ou 11 dígitos).')
      return
    }

    const cepNumeros = form.cep.replace(/\D/g, '')
    if (cepNumeros.length !== 8) {
      setErro('O CEP deve ter 8 dígitos.')
      return
    }

    if (form.pontoReferencia.trim().length < 5) {
      setErro('Informe um Ponto de Referência (mínimo de 5 caracteres) para a entrega.')
      return
    }

    setIsSaving(true)
    try {
      await onSubmit({
        nome: form.nome.trim(),
        telefone: form.telefone.trim(),
        rua: form.rua.trim(),
        numero: form.numero.trim(),
        bairro: form.bairro.trim(),
        cidade: form.cidade.trim(),
        cep: form.cep.trim(),
        pontoReferencia: form.pontoReferencia.trim(),
      })
    } catch (e) {
      console.error('Erro ao salvar cliente:', e)
      setErro('Erro ao salvar o cliente. Tente novamente.')
      setIsSaving(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="form">
      <fieldset>
        <legend>Dados Pessoais</legend>

        <label>
          Nome completo
          <input name="nome" value={form.nome} onChange={handleChange} required />
        </label>

        <label>
          Telefone / WhatsApp
          <input
            name="telefone"
            type="tel"
            placeholder="(83) 99999-1234"
            value={form.telefone}
            onChange={handleChange}
            required
          />
        </label>
      </fieldset>

      <fieldset>
        <legend>Endereço de Entrega</legend>

        <label>
          Rua
          <input name="rua" value={form.rua} onChange={handleChange} required />
        </label>

        <label>
          Número
          <input name="numero" value={form.numero} onChange={handleChange} required />
        </label>

        <label>
          Bairro
          <input name="bairro" value={form.bairro} onChange={handleChange} required />
        </label>

        <label>
          Cidade
          <input name="cidade" value={form.cidade} onChange={handleChange} required />
        </label>

        <label>
          CEP
          <input
            name="cep"
            placeholder="58450-000"
            value={form.cep}
            onChange={handleChange}
            maxLength={9}
            required
          />
        </label>

        <label>
          Ponto de Referência
          <textarea
            name="pontoReferencia"
            placeholder="Ex.: Próximo ao depósito central"
            value={form.pontoReferencia}
            onChange={handleChange}
            rows={3}
            required
          />
        </label>
      </fieldset>

      {erro && <p className="erro">{erro}</p>}

      <button type="submit" disabled={isSaving}>
        {isSaving ? 'Salvando...' : textoBotao}
      </button>
    </form>
  )
}