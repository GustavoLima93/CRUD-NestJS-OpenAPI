import { ApiProperty } from '@nestjs/swagger';

import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Produto {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id?: number;

  @ApiProperty()
  @Column()
  codigo: string;

  @ApiProperty()
  @Column()
  titulo: string;

  @ApiProperty()
  @Column({
    type: 'decimal',
  })
  price: number;
}
