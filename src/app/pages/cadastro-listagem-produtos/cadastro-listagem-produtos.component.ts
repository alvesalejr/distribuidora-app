import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProdutoService, Produto, CriarProdutoDTO } from '../../services/produto.service';

@Component({
  selector: 'app-cadastro-listagem-produtos',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './cadastro-listagem-produtos.component.html',
  styleUrls: ['./cadastro-listagem-produtos.component.css']
})
export class CadastroListagemProdutosComponent implements OnInit {

  novoProduto: CriarProdutoDTO = {
    nome: '',
    descricao: '',
    preco: 0,
    estoque: 0
  };

  produtos: Produto[] = [];

  constructor(private produtoService: ProdutoService) {}

  ngOnInit() {
    this.carregarProdutos();
  }

  carregarProdutos() {
    this.produtoService.getProdutos().subscribe({
      next: (produtos) => this.produtos = produtos,
      error: (err) => console.error('Erro ao carregar produtos', err)
    });
  }

  cadastrar() {
    if (!this.novoProduto.nome || this.novoProduto.preco <= 0 || this.novoProduto.estoque < 0) {
      alert('Preencha os campos corretamente!');
      return;
    }

    this.produtoService.criarProduto(this.novoProduto).subscribe({
      next: (produto) => {
        alert(`Produto ${produto.nome} cadastrado com sucesso!`);
        this.novoProduto = { nome: '', descricao: '', preco: 0, estoque: 0 };
        this.carregarProdutos(); 
      },
      error: (err) => {
        console.error('Erro ao cadastrar produto', err);
        alert('Erro ao cadastrar produto. Veja o console para mais detalhes.');
      }
    });
  }
}
