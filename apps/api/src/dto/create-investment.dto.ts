import { IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateInvestmentDto {
  @ApiProperty({ description: 'The amount of the investment', example: 10000 })
  @IsNumber()
  amount: number;

  @ApiProperty({ description: 'The ID of the portfolio', example: 1 })
  @IsNumber()
  portfolioId: number;

  @ApiProperty({ description: 'The ID of the company', example: 1 })
  @IsNumber()
  companyId: number;
}
