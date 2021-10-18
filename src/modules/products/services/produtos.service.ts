import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Produto } from '../models/produto.model';

@Injectable()
export class ProdutosService {
  constructor(
    @Inject('PRODUCT_REPOSITORY')
    private produtoRepository: Repository<Produto>,
  ) {}

  async obterTodos(): Promise<Produto[]> {
    return this.produtoRepository.find();
  }

  async obterUm(id: number): Promise<Produto> {
    const product = await this.produtoRepository.findOne({
      where: {
        id,
      },
    });

    if (!product) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'Product not found',
        },
        HttpStatus.NOT_FOUND,
      );
    }

    return product;
  }

  async criarUm(produto: Produto): Promise<void> {
    await this.produtoRepository.save(produto);
  }

  async alterarUm(id: number, produto: Produto): Promise<void> {
    const product = await this.obterUm(id);

    await this.produtoRepository.save({ ...product, ...produto });
  }

  async deletarUm(id: number): Promise<void> {
    const product = await this.obterUm(id);

    await this.produtoRepository.delete(product.id);
  }
}
