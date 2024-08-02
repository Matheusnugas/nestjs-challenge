import { ApiProperty } from '@nestjs/swagger';
import { InvestmentDto } from './investment.dto';

export class CompanyDto {
  @ApiProperty({ description: 'The unique identifier of the company' })
  id: number;

  @ApiProperty({ description: 'The name of the company' })
  name: string;

  @ApiProperty({ description: 'The ticker of the company' })
  ticker: string;

  @ApiProperty({ description: 'The description of the company' })
  description: string;

  @ApiProperty({ description: 'The creation date of the company' })
  createdAt: Date;

  @ApiProperty({ description: 'The last update date of the company' })
  updatedAt: Date;

  @ApiProperty({
    type: [InvestmentDto],
    description: 'The investments related to the company',
  })
  investments: InvestmentDto[];
}
