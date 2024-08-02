import { IsNumber } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateInvestmentDto {
  @IsNumber()
  @ApiPropertyOptional({ description: 'The amount of the investment' })
  amount?: number;
}
