import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePortfolioDto } from '../dto/create-portfolio.dto';
import { UpdatePortfolioDto } from '../dto/update-portfolio.dto';
import { Portfolio } from '@prisma/client';

@Injectable()
export class PortfolioService {
  constructor(private prisma: PrismaService) {}

  async createPortfolio(
    authId: string,
    data: CreatePortfolioDto,
    credentials: string,
  ): Promise<Portfolio> {
    console.log(authId, credentials);
    if (authId !== credentials) {
      throw new UnauthorizedException(
        "You can't create a portfolio for this user.",
      );
    }

    const user = await this.prisma.user.findUnique({
      where: { authId },
    });

    if (!user) {
      throw new NotFoundException(`User with authId ${authId} not found`);
    }

    return this.prisma.portfolio.create({
      data: {
        name: data.name,
        user: {
          connect: { id: user.id },
        },
      },
    });
  }

  async getPortfolio(
    id: number,
    credentials: string,
  ): Promise<Portfolio | null> {
    const portfolio = await this.prisma.portfolio.findUnique({
      where: { id },
      include: { user: true },
    });

    if (!portfolio) {
      throw new NotFoundException(`Portfolio with ID ${id} not found`);
    }

    if (portfolio.user.authId !== credentials) {
      throw new UnauthorizedException(`You do not have access to this data`);
    }

    return portfolio;
  }

  async getPortfoliosByUserAuthId(
    authId: string,
    credentials: string,
  ): Promise<Portfolio[]> {
    if (authId !== credentials) {
      throw new UnauthorizedException("You don't have access to this data");
    }

    const user = await this.prisma.user.findUnique({
      where: { authId },
    });

    if (!user) {
      throw new NotFoundException(`User with authId ${authId} not found`);
    }

    const portfolios = await this.prisma.portfolio.findMany({
      where: { userId: user.id },
    });

    if (portfolios.length === 0) {
      throw new NotFoundException(
        `No portfolios found for user with authId ${authId}`,
      );
    }

    return portfolios;
  }

  async updatePortfolio(
    id: number,
    data: UpdatePortfolioDto,
    credentials: string,
  ): Promise<Portfolio> {
    const portfolio = await this.prisma.portfolio.findUnique({
      where: { id },
      include: { user: true },
    });

    if (!portfolio) {
      throw new NotFoundException(`Portfolio with ID ${id} not found`);
    }

    if (portfolio.user.authId !== credentials) {
      throw new UnauthorizedException(
        "You don't have access to update this portfolio",
      );
    }

    return this.prisma.portfolio.update({
      where: { id },
      data,
    });
  }

  async deletePortfolio(
    id: number,
    userCredentials: string,
  ): Promise<{ status: string; message: string }> {
    const portfolio = await this.prisma.portfolio.findUnique({
      where: { id },
      include: { user: true },
    });

    if (!portfolio) {
      throw new NotFoundException(`Portfolio with ID ${id} not found`);
    }

    if (portfolio.user.authId !== userCredentials) {
      throw new UnauthorizedException(
        "You don't have access to this portfolio",
      );
    }

    await this.prisma.investment.deleteMany({
      where: { portfolioId: id },
    });

    await this.prisma.portfolio.delete({
      where: { id },
    });

    return {
      status: '200',
      message: 'Portfolio and its investments were successfully deleted',
    };
  }
}
