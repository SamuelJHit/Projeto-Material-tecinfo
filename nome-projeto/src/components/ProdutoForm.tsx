import { useState } from 'react'
import type { FormEvent, ChangeEvent } from 'react'
import type { ProdutoInput } from '../types/Produto'

interface ProdutoFormProps {
    valoresIniciais?: ProdutoInput
    onSubmit: (dados: ProdutoInput) => Promise<void>
    textoBotao?: string
}

interface FormState {
    nome: string
    codigoBarras: string
    marca: string
    familia: string
    precoVenda: string
    estoqueAtual: string
    unidade: string
}

const FAMILIAS = ['Alvenaria', 'Elétrica', 'Hidráulica', 'Pintura', 'Ferramentas']
const UNIDADES = ['Unidade', 'Saco', 'Metro', 'Kg', 'Lata', 'Caixa']

const estadoVazio: FormState = {
    nome: '',
    codigoBarras: '',
    marca: '',
    familia: FAMILIAS[0],
    precoVenda: '',
    estoqueAtual: '',
    unidade: UNIDADES[0],
}

export default function ProdutoForm({
  valoresIniciais,
  onSubmit,
  textoBotao = 'Salvar',
}: ProdutoFormProps) {
  const [form, setForm] = useState<FormState>(
    valoresIniciais
      ? {
          ...valoresIniciais,
          precoVenda: String(valoresIniciais.precoVenda),
          estoqueAtual: String(valoresIniciais.estoqueAtual),
        }
      : estadoVazio,
  )
  const [erro, setErro] = useState<string | null>(null)
  const [isSaving, setIsSaving] = useState(false)

  // UM handler para TODOS os campos, usando o atributo name do input
  function handleChange(
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) {
    const { name, value } = e.target
    setForm((atual) => ({ ...atual, [name]: value }))
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault() // impede o reload da página
    setErro(null)

    if (!/^\d{13}$/.test(form.codigoBarras)) {
      setErro('O código de barras EAN-13 deve ter exatamente 13 números.')
      return
    }

    const preco = Number(form.precoVenda)
    const estoque = Number(form.estoqueAtual)

    if (preco <= 0 || estoque < 0) {
      setErro('Informe um preço maior que zero e um estoque válido.')
      return
    }

    setIsSaving(true)
    try {
      await onSubmit({
        nome: form.nome.trim(),
        codigoBarras: form.codigoBarras,
        marca: form.marca.trim(),
        familia: form.familia,
        precoVenda: preco,
        estoqueAtual: estoque,
        unidade: form.unidade,
      })
    } catch {
      setErro('Erro ao salvar o produto. Tente novamente.')
      setIsSaving(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="form">
      <label>
        Nome
        <input name="nome" value={form.nome} onChange={handleChange} required />
      </label>

      <label>
        Código de Barras (EAN-13)
        <input
          name="codigoBarras"
          value={form.codigoBarras}
          onChange={handleChange}
          maxLength={13}
          inputMode="numeric"
          required
        />
      </label>

      <label>
        Marca
        <input name="marca" value={form.marca} onChange={handleChange} required />
      </label>

      <label>
        Família
        <select name="familia" value={form.familia} onChange={handleChange}>
          {FAMILIAS.map((f) => (
            <option key={f} value={f}>{f}</option>
          ))}
        </select>
      </label>

      <label>
        Preço de Venda (R$)
        <input
          name="precoVenda"
          type="number"
          step="0.01"
          min="0"
          value={form.precoVenda}
          onChange={handleChange}
          required
        />
      </label>

      <label>
        Estoque Atual
        <input
          name="estoqueAtual"
          type="number"
          min="0"
          value={form.estoqueAtual}
          onChange={handleChange}
          required
        />
      </label>

      <label>
        Unidade de Medida
        <select name="unidade" value={form.unidade} onChange={handleChange}>
          {UNIDADES.map((u) => (
            <option key={u} value={u}>{u}</option>
          ))}
        </select>
      </label>

      {erro && <p className="erro">{erro}</p>}

      <button type="submit" disabled={isSaving}>
        {isSaving ? 'Salvando...' : textoBotao}
      </button>
    </form>
  )
}