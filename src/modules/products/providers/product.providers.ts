import { Connection } from 'typeorm';

import { Produto } from '../models/produto.model';

export const productProviders = [
  {
    provide: 'PRODUCT_REPOSITORY',
    useFactory: (connection: Connection) => connection.getRepository(Produto),
    inject: ['DATABASE_CONNECTION'],
  },
];
