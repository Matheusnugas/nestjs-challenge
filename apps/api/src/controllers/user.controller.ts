import { Controller, Get, Body, Param, Put, UseGuards } from '@nestjs/common';
import { UserService } from '../services/user.service';
import { UpdateUserDto } from '../dto/update-user.dto';
import { User } from '@prisma/client';
import { FirebaseAuthGuard } from 'src/guards/firebase-auth.guard';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiParam,
} from '@nestjs/swagger';
import { UserDto } from '../dto/user.dto';

@Controller('users')
@ApiTags('users')
@ApiBearerAuth()
@UseGuards(FirebaseAuthGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(':id')
  @ApiOperation({ summary: 'Get a user by ID' })
  @ApiResponse({
    status: 200,
    description: 'The user has been successfully retrieved.',
    type: UserDto,
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({ status: 404, description: 'User not found.' })
  @ApiParam({
    name: 'id',
    description: 'The ID of the user',
    type: Number,
  })
  async getUser(@Param('id') id: number): Promise<User> {
    return this.userService.getUser(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a user by authId' })
  @ApiResponse({
    status: 200,
    description: 'The user has been successfully updated.',
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({ status: 404, description: 'User not found.' })
  @ApiParam({
    name: 'id',
    description: 'The authId of the user',
    type: String,
  })
  async updateUserByAuthId(
    @Param('authId') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<User> {
    return this.userService.updateUser(id, updateUserDto);
  }
}
