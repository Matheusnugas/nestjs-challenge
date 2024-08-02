import { ApiProperty } from '@nestjs/swagger';
import { PortfolioDto } from './portfolio.dto';

export class UserDto {
  @ApiProperty({ example: 1, description: 'The ID of the user' })
  id: number;

  @ApiProperty({
    example: 'authId123',
    description: 'The authentication ID of the user',
  })
  authId: string;

  @ApiProperty({
    example: '192.168.0.1',
    description: 'The IP address of the user',
  })
  ip: string;

  @ApiProperty({
    example: '2024-08-01T15:50:45.337Z',
    description: 'The date the user was created',
  })
  createdAt: string;

  @ApiProperty({
    example: '2024-08-01T15:50:45.337Z',
    description: 'The date the user was last updated',
  })
  updatedAt: string;

  @ApiProperty({
    type: [PortfolioDto],
    description: 'The portfolios owned by the user',
  })
  portfolios?: PortfolioDto[];
}
