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
  Req,
} from '@nestjs/common';
import { PortfolioService } from '../services/portfolio.service';
import { CreatePortfolioDto } from '../dto/create-portfolio.dto';
import { UpdatePortfolioDto } from '../dto/update-portfolio.dto';
import { FirebaseAuthGuard } from '../guards/firebase-auth.guard';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { PortfolioDto } from '../dto/portfolio.dto';

@Controller('portfolios')
@ApiTags('portfolios')
@ApiBearerAuth('access-token')
@UseGuards(FirebaseAuthGuard)
export class PortfolioController {
  constructor(private readonly portfolioService: PortfolioService) {}

  @Post(':authId')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a new portfolio' })
  @ApiResponse({
    status: 201,
    description: 'The portfolio has been successfully created.',
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async createPortfolio(
    @Param('authId') authId: string,
    @Body() createPortfolioDto: CreatePortfolioDto,
    @Headers('credentials') credentials: string,
  ) {
    const userCredentials = credentials;
    return this.portfolioService.createPortfolio(
      authId,
      createPortfolioDto,
      userCredentials,
    );
  }

  @Get('user/:authId')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get portfolios by user authId' })
  @ApiResponse({
    status: 200,
    description: 'The portfolios have been successfully retrieved.',
    type: [PortfolioDto],
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({ status: 404, description: 'Portfolios not found.' })
  async getPortfoliosByUserAuthId(
    @Param('authId') authId: string,
    @Headers('credentials') credentials: string,
  ) {
    const userCredentials = credentials;
    return this.portfolioService.getPortfoliosByUserAuthId(
      authId,
      userCredentials,
    );
  }

  @Get(':id')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get a portfolio by ID' })
  @ApiResponse({
    status: 200,
    description: 'The portfolio has been successfully retrieved.',
    type: PortfolioDto,
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({ status: 404, description: 'Portfolio not found.' })
  async getPortfolio(
    @Param('id') id: number,
    @Headers('credentials') credentials: string,
  ) {
    const userCredentials = credentials;
    return this.portfolioService.getPortfolio(Number(id), userCredentials);
  }

  @Put(':id')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update an existing portfolio' })
  @ApiResponse({
    status: 200,
    description: 'The portfolio has been successfully updated.',
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({ status: 404, description: 'Portfolio not found.' })
  async updatePortfolio(
    @Param('id') id: number,
    @Body() updatePortfolioDto: UpdatePortfolioDto,
    @Headers('credentials') credentials: string,
  ) {
    const userCredentials = credentials;
    return this.portfolioService.updatePortfolio(
      Number(id),
      updatePortfolioDto,
      userCredentials,
    );
  }

  @Delete(':id')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete a portfolio by ID' })
  @ApiResponse({
    status: 200,
    description: 'The portfolio has been successfully deleted.',
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({ status: 404, description: 'Portfolio not found.' })
  async deletePortfolio(
    @Param('id') id: number,
    @Headers('credentials') credentials: string,
  ) {
    const userCredentials = credentials;
    return this.portfolioService.deletePortfolio(Number(id), userCredentials);
  }
}
