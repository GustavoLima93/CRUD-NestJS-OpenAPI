import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';

import { ProdutosController } from './controllers/produtos.controller';
import { productProviders } from './providers/product.providers';
import { ProdutosService } from './services/produtos.service';

@Module({
  imports: [DatabaseModule],
  controllers: [ProdutosController],
  providers: [...productProviders, ProdutosService],
})
export class ProductsModule {}
