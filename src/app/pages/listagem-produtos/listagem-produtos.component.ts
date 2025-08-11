import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProdutoService, Produto } from '../../services/produto.service';

@Component({
  selector: 'app-listagem-produtos',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './listagem-produtos.component.html',
  styleUrls: ['./listagem-produtos.component.css']
})
export class ListagemProdutosComponent implements OnInit {
  produtos: Produto[] = [];
  carregando = false;

  /* Modal */
  produtoEditando: Produto | null = null;
  editarProdutoForm = {
    nome: '',
    descricao: '',
    preco: 0,
    estoque: 0
  };

  constructor(private produtoService: ProdutoService) {}

  ngOnInit(): void {
    this.carregarProdutos();
  }

  /* ---------- Listagem ---------- */
  carregarProdutos(): void {
    this.carregando = true;
    this.produtoService.getProdutos().subscribe({
      next: dados => {
        this.produtos = dados;
        this.carregando = false;
      },
      error: err => {
        console.error('Erro ao carregar produtos:', err);
        this.carregando = false;
      }
    });
  }

  /* ---------- Excluir ---------- */
  excluirProduto(id: number): void {
    if (confirm('Tem certeza que deseja excluir este produto?')) {
      this.produtoService.excluirProduto(id).subscribe({
        next: () => {
          this.produtos = this.produtos.filter(p => p.id !== id);
          alert('Produto excluído com sucesso!');
        },
        error: err => {
          console.error('Erro ao excluir produto:', err);
          alert('Erro ao excluir produto.');
        }
      });
    }
  }

  /* ---------- Editar (modal) ---------- */
  abrirModalEditar(produto: Produto): void {
    this.produtoEditando = { ...produto };
    this.editarProdutoForm = {
      nome: produto.nome,
      descricao: produto.descricao ?? '',
      preco: produto.preco,
      estoque: produto.estoque
    };
  }

  cancelarEdicao(): void {
    this.produtoEditando = null;
  }

  salvarEdicao(): void {
    if (!this.produtoEditando) return;

    this.produtoService
      .atualizarProduto(this.produtoEditando.id, this.editarProdutoForm)
      .subscribe({
        next: () => {
          alert('Produto atualizado com sucesso!');
          this.cancelarEdicao();
          this.carregarProdutos();
        },
        error: err => {
          console.error('Erro ao atualizar produto:', err);
          alert('Erro ao atualizar produto.');
        }
      });
  }
}
