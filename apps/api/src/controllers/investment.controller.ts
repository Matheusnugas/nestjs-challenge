import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  UseGuards,
  Headers,
} from '@nestjs/common';
import { InvestmentService } from '../services/investment.service';
import { CreateInvestmentDto } from '../dto/create-investment.dto';
import { UpdateInvestmentDto } from '../dto/update-investment.dto';
import { FirebaseAuthGuard } from 'src/guards/firebase-auth.guard';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiHeader,
} from '@nestjs/swagger';
import { InvestmentDto } from 'src/dto/investment.dto';

@Controller('investments')
@ApiTags('investments')
@ApiBearerAuth('access-token')
@UseGuards(FirebaseAuthGuard)
export class InvestmentController {
  constructor(private readonly investmentService: InvestmentService) {}

  @Post()
  @ApiHeader({
    name: 'Authorization',
    description: 'Authorization token',
    required: true,
  })
  @ApiOperation({ summary: 'Create a new investment' })
  @ApiResponse({
    status: 201,
    description: 'The investment has been successfully created.',
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async createInvestment(
    @Body() createInvestmentDto: CreateInvestmentDto,
    @Headers('credentials (authId)') credentials: string,
  ) {
    const userCredentials = credentials;
    return this.investmentService.createInvestment(
      createInvestmentDto,
      userCredentials,
    );
  }

  @Get(':id')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get an investment by ID' })
  @ApiResponse({
    status: 200,
    description: 'The investment has been successfully retrieved.',
    type: InvestmentDto,
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({ status: 404, description: 'Investment not found.' })
  async getInvestment(
    @Param('id') id: number,
    @Headers('credentials (authId)') credentials: string,
  ) {
    const userCredentials = credentials;
    return this.investmentService.getInvestment(Number(id), userCredentials);
  }

  @Get('portfolio/:portfolioId')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get investments by portfolio ID' })
  @ApiResponse({
    status: 200,
    description: 'The investments have been successfully retrieved.',
    type: [InvestmentDto],
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({ status: 404, description: 'Investments not found.' })
  async getInvestmentsByPortfolioId(
    @Param('portfolioId') portfolioId: number,
    @Headers('credentials (authId)') credentials: string,
  ) {
    const userCredentials = credentials;
    return this.investmentService.getInvestmentsByPortfolioId(
      Number(portfolioId),
      userCredentials,
    );
  }

  @Put(':id')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update an existing investment' })
  @ApiResponse({
    status: 200,
    description: 'The investment has been successfully updated.',
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({ status: 404, description: 'Investment not found.' })
  async updateInvestment(
    @Param('id') id: number,
    @Body() updateInvestmentDto: UpdateInvestmentDto,
    @Headers('credentials (authId)') credentials: string,
  ) {
    const userCredentials = credentials;
    return this.investmentService.updateInvestment(
      id,
      updateInvestmentDto,
      userCredentials,
    );
  }

  @Delete(':id')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete an investment by ID' })
  @ApiResponse({
    status: 200,
    description: 'The investment has been successfully deleted.',
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({ status: 404, description: 'Investment not found.' })
  async deleteInvestment(
    @Param('id') id: number,
    @Headers('credentials (authId)') credentials: string,
  ) {
    const userCredentials = credentials;
    return this.investmentService.deleteInvestment(Number(id), userCredentials);
  }
}
