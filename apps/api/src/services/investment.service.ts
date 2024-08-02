import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateInvestmentDto } from '../dto/create-investment.dto';
import { UpdateInvestmentDto } from '../dto/update-investment.dto';
import { Investment } from '@prisma/client';

@Injectable()
export class InvestmentService {
  constructor(private prisma: PrismaService) {}

  async createInvestment(
    data: CreateInvestmentDto,
    credentials: string,
  ): Promise<Investment> {
    const portfolio = await this.prisma.portfolio.findUnique({
      where: { id: data.portfolioId },
      include: { user: true },
    });
    if (!portfolio) {
      throw new NotFoundException(
        `Portfolio with ID ${data.portfolioId} not found`,
      );
    }
    if (portfolio.user.authId !== credentials) {
      throw new UnauthorizedException(
        "You don't have access to this portfolio",
      );
    }
    const company = await this.prisma.company.findUnique({
      where: { id: data.companyId },
    });
    if (!company) {
      throw new NotFoundException(
        `Company with ID ${data.companyId} not found`,
      );
    }
    return this.prisma.investment.create({
      data: {
        amount: data.amount,
        portfolio: {
          connect: { id: data.portfolioId },
        },
        company: {
          connect: { id: data.companyId },
        },
      },
    });
  }

  async getInvestment(
    id: number,
    credentials: string,
  ): Promise<Investment | null> {
    const investment = await this.prisma.investment.findUnique({
      where: { id },
      include: { portfolio: { include: { user: true } } },
    });

    if (!investment) {
      throw new NotFoundException(`Investment with ID ${id} not found`);
    }

    if (investment.portfolio.user.authId !== credentials) {
      throw new UnauthorizedException(
        "You don't have access to this investment",
      );
    }

    return investment;
  }

  async getInvestmentsByPortfolioId(
    portfolioId: number,
    credentials: string,
  ): Promise<Investment[]> {
    const portfolio = await this.prisma.portfolio.findUnique({
      where: { id: portfolioId },
      include: { user: true },
    });

    if (!portfolio) {
      throw new NotFoundException(`Portfolio with ID ${portfolioId} not found`);
    }

    if (portfolio.user.authId !== credentials) {
      throw new UnauthorizedException(
        "You don't have access to this portfolio",
      );
    }

    const investments = await this.prisma.investment.findMany({
      where: { portfolioId },
    });

    if (investments.length === 0) {
      throw new NotFoundException(
        `No investments found for portfolio with ID ${portfolioId}`,
      );
    }

    return investments;
  }

  async updateInvestment(
    id: number,
    data: UpdateInvestmentDto,
    credentials: string,
  ): Promise<Investment> {
    const investment = await this.prisma.investment.findUnique({
      where: { id },
      include: { portfolio: { include: { user: true } } },
    });

    if (!investment) {
      throw new NotFoundException(`Investment with ID ${id} not found`);
    }

    if (investment.portfolio.user.authId !== credentials) {
      throw new UnauthorizedException(
        "You don't have access to this investment",
      );
    }
    const updatedInvestment = await this.prisma.investment.update({
      where: { id },
      data,
    });

    return updatedInvestment;
  }

  async deleteInvestment(id: number, credentials: string): Promise<Investment> {
    const investment = await this.prisma.investment.findUnique({
      where: { id },
      include: { portfolio: { include: { user: true } } },
    });

    if (!investment) {
      throw new NotFoundException(`Investment with ID ${id} not found`);
    }

    if (investment.portfolio.user.authId !== credentials) {
      throw new UnauthorizedException(
        "You don't have access to this investment",
      );
    }

    return this.prisma.investment.delete({
      where: { id },
    });
  }
}
