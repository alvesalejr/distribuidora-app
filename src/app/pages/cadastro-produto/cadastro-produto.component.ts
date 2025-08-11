import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProdutoService, CriarProdutoDTO } from '../../services/produto.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cadastro-produto',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './cadastro-produto.component.html',
  styleUrls: ['./cadastro-produto.component.css'],
})
export class CadastroProdutoComponent {
  novoProduto: CriarProdutoDTO = {
    nome: '',
    descricao: '',
    preco: 0,
    estoque: 0,
  };

  constructor(private produtoService: ProdutoService, private router: Router) {}

  cadastrar(): void {
    if (!this.novoProduto.nome || this.novoProduto.preco <= 0 || this.novoProduto.estoque < 0) {
      alert('Preencha os campos corretamente!');
      return;
    }

    this.produtoService.criarProduto(this.novoProduto).subscribe({
      next: (produto) => {
        alert(`Produto ${produto.nome} cadastrado com sucesso!`);
        this.router.navigate(['/listagem-produtos']);
      },
      error: (err) => {
        console.error('Erro ao cadastrar produto', err);
        alert('Erro ao cadastrar produto. Veja o console para mais detalhes.');
      },
    });
  }
}
