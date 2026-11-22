import {Routes, Route, Link} from 'react-router-dom'
import ProdutoListPage from './pages/ProdutosListPage'
import ProdutoNovoPage from './pages/ProdutoNovoPage'
import ProdutoEditarPage from './pages/ProdutoEditarPage'
import ClientesListPage from './pages/ClientesListPage'
import ClienteNovoPage from './pages/ClienteNovoPage'
import ClienteEditarPage from './pages/ClienteEditarPage'

export default function App() {
  return (
    <div className="container">
      <header className="header">
        <h1> Materiais de Construção</h1>
        <nav>
          <Link to="/">Produtos</Link>
          <Link to="/produtos/novo">Novo Produto</Link>
          <Link to="/clientes">Clientes</Link>
          <Link to="/clientes/novo">Novo Cliente</Link>
        </nav>
      </header>

      <main>
        <Routes>
          <Route path="/" element={<ProdutoListPage />} />
          <Route path="/produtos/novo" element={<ProdutoNovoPage />} />
          <Route path="/produtos/:id/editar" element={<ProdutoEditarPage />} />

          <Route path="/clientes" element={<ClientesListPage />} />
          <Route path="/clientes/novo" element={<ClienteNovoPage />} />
          <Route path="/clientes/:id/editar" element={<ClienteEditarPage />} />
        </Routes> 
      </main>

    </div>
  )
}