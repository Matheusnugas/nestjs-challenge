import { IsOptional, IsString } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdatePortfolioDto {
  @IsOptional()
  @IsString()
  @ApiPropertyOptional({ description: 'The name of the portfolio' })
  name?: string;
}
