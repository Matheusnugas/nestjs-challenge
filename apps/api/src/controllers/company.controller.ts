import { Controller, Get, Param } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CompanyService } from '../services/company.service';
import { Company } from '@prisma/client';
import { CompanyDto } from 'src/dto/company.dto';

@Controller('companies')
@ApiTags('companies')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @Get()
  @ApiOperation({ summary: 'Get all companies' })
  @ApiResponse({
    status: 200,
    description: 'List of all companies',
    type: [CompanyDto],
  })
  async getCompanies(): Promise<Company[]> {
    return this.companyService.getCompanies();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a company by ID' })
  @ApiResponse({
    status: 200,
    description: 'The company with the given ID',
    type: CompanyDto,
  })
  @ApiResponse({ status: 404, description: 'Company not found' })
  async getCompany(@Param('id') id: number): Promise<Company> {
    return this.companyService.getCompany(Number(id));
  }
}
