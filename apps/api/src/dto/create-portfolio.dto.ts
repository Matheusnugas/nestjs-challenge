import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class CreatePortfolioDto {
  @ApiProperty({
    example: 'My Portfolio',
    description: 'The name of the portfolio',
  })
  @IsString()
  @IsNotEmpty()
  name: string;
}
