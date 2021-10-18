import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';

import { ApiParam, ApiTags } from '@nestjs/swagger';

import { plainToClass } from 'class-transformer';

import { Produto } from '../models/produto.model';
import { ProdutosService } from '../services/produtos.service';

@ApiTags('products')
@Controller('produtos')
export class ProdutosController {
  constructor(private produtosService: ProdutosService) {}

  @Get()
  async obterTodos(): Promise<Produto[]> {
    const products = await this.produtosService.obterTodos();
    return products;
  }

  @Get(':id')
  @ApiParam({
    name: 'id',
    required: true,
    description: 'Id Product',
  })
  async obter(@Param() param): Promise<Produto> {
    const product = await this.produtosService.obterUm(param.id);
    return product;
  }

  @Post()
  async criarProduto(@Body() produto: Produto): Promise<string> {
    const product = plainToClass(Produto, produto);
    console.log(product);
    await this.produtosService.criarUm(product);
    return 'Produto criado';
  }

  @Put(':id')
  @ApiParam({
    name: 'id',
    required: true,
    description: 'Id Product',
  })
  async alterarProduto(
    @Body() produto: Produto,
    @Param() param,
  ): Promise<string> {
    await this.produtosService.alterarUm(param.id, produto);
    return `Produto alterado ${param.id}`;
  }

  @Delete(':id')
  @ApiParam({
    name: 'id',
    required: true,
    description: 'Id Product',
  })
  async deletarProduto(@Param() param): Promise<string> {
    await this.produtosService.deletarUm(param.id);
    return `Produto deletado ${param.id}`;
  }
}
