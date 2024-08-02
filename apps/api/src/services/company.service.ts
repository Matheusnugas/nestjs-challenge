import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Company } from '@prisma/client';

@Injectable()
export class CompanyService {
  constructor(private prisma: PrismaService) {}

  async getCompanies(): Promise<Company[]> {
    return this.prisma.company.findMany({
      include: {
        investments: true,
      },
    });
  }

  async getCompany(id: number): Promise<Company | null> {
    const company = await this.prisma.company.findUnique({
      where: { id },
      include: {
        investments: true,
      },
    });
    if (!company) {
      throw new NotFoundException(`Company with ID ${id} not found`);
    }
    return company;
  }
}
