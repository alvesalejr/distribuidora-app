import { Routes } from '@angular/router';
import { CadastroProdutoComponent } from './pages/cadastro-produto/cadastro-produto.component';
import { ListagemProdutosComponent } from './pages/listagem-produtos/listagem-produtos.component';
import { CadastroListagemProdutosComponent } from './pages/cadastro-listagem-produtos/cadastro-listagem-produtos.component';

export const routes: Routes = [
  { path: '', redirectTo: 'cadastro-produto', pathMatch: 'full' },
  { path: 'cadastro-produto', component: CadastroProdutoComponent },
  { path: 'cadastro-produto/:id', component: CadastroProdutoComponent },
  { path: 'listagem-produtos', component: ListagemProdutosComponent },
  { path: 'cadastro-listagem', component: CadastroListagemProdutosComponent }

];
