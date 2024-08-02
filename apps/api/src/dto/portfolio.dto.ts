import { ApiProperty } from '@nestjs/swagger';
import { UserDto } from './user.dto'; // Certifique-se de importar UserDto corretamente

export class PortfolioDto {
  @ApiProperty({ example: 1, description: 'The ID of the portfolio' })
  id: number;

  @ApiProperty({
    example: 'Portfolio Name',
    description: 'The name of the portfolio',
  })
  name: string;

  @ApiProperty({
    example: 1,
    description: 'The ID of the user who owns the portfolio',
  })
  userId: number;

  @ApiProperty({
    example: '2024-08-01T22:07:19.868Z',
    description: 'The date the portfolio was created',
  })
  createdAt: string;

  @ApiProperty({
    example: '2024-08-01T22:07:19.868Z',
    description: 'The date the portfolio was last updated',
  })
  updatedAt: string;

  // Propriedades adicionais
  @ApiProperty({
    example: {
      id: 1,
      authId: 'authId123',
      ip: '192.168.0.1',
      createdAt: '2024-08-01T15:50:45.337Z',
      updatedAt: '2024-08-01T15:50:45.337Z',
    },
    description: 'The user who owns the portfolio',
    type: () => UserDto,
  })
  user?: UserDto;
}
