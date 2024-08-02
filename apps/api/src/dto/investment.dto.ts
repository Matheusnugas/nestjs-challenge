import { ApiProperty } from '@nestjs/swagger';

export class InvestmentDto {
  @ApiProperty({ description: 'The unique identifier of the investment' })
  id: number;

  @ApiProperty({ description: 'The amount of the investment' })
  amount: number;

  @ApiProperty({ description: 'The portfolio ID related to the investment' })
  portfolioId: number;

  @ApiProperty({ description: 'The company ID related to the investment' })
  companyId: number;

  @ApiProperty({ description: 'The creation date of the investment' })
  createdAt: Date;

  @ApiProperty({ description: 'The last update date of the investment' })
  updatedAt: Date;
}
