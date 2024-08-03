import { Test, TestingModule } from '@nestjs/testing';
import { PortfolioService } from '../src/services/portfolio.service';
import { PrismaService } from '../src/prisma/prisma.service';
import { NotFoundException, UnauthorizedException } from '@nestjs/common';
import { User, Portfolio } from '@prisma/client';

describe('PortfolioService', () => {
  let service: PortfolioService;
  let prisma: PrismaService;

  const mockUser: User = {
    id: 1,
    authId: 'correctAuthId',
    ip: '127.0.0.1',
    name: 'Test',
    email: 'test@test.com',
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const mockPortfolio: Portfolio = {
    id: 1,
    name: 'Test Portfolio',
    userId: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const mockPortfolioWithUser = {
    ...mockPortfolio,
    user: mockUser,
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PortfolioService,
        {
          provide: PrismaService,
          useValue: {
            portfolio: {
              create: jest.fn().mockResolvedValue(mockPortfolioWithUser),
              findUnique: jest.fn().mockResolvedValue(mockPortfolioWithUser),
              findMany: jest.fn().mockResolvedValue([mockPortfolioWithUser]),
              update: jest.fn().mockResolvedValue(mockPortfolioWithUser),
              delete: jest.fn().mockResolvedValue(mockPortfolioWithUser),
            },
            user: {
              findUnique: jest.fn().mockResolvedValue(mockUser),
            },
            investment: {
              deleteMany: jest.fn().mockResolvedValue({ count: 1 }),
            },
          },
        },
      ],
    }).compile();

    service = module.get<PortfolioService>(PortfolioService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  describe('createPortfolio', () => {
    it('should throw UnauthorizedException if authId does not match credentials', async () => {
      await expect(
        service.createPortfolio(
          'wrongAuthId',
          { name: 'Test Portfolio' },
          'correctAuthId',
        ),
      ).rejects.toThrow(UnauthorizedException);
    });

    it('should throw NotFoundException if user is not found', async () => {
      jest.spyOn(prisma.user, 'findUnique').mockResolvedValueOnce(null);
      await expect(
        service.createPortfolio(
          'correctAuthId',
          { name: 'Test Portfolio' },
          'correctAuthId',
        ),
      ).rejects.toThrow(NotFoundException);
    });

    it('should create a portfolio', async () => {
      const result = await service.createPortfolio(
        'correctAuthId',
        { name: 'Test Portfolio' },
        'correctAuthId',
      );
      expect(result).toEqual(expect.objectContaining(mockPortfolio));
    });
  });

  describe('getPortfolio', () => {
    it('should throw NotFoundException if portfolio is not found', async () => {
      jest.spyOn(prisma.portfolio, 'findUnique').mockResolvedValueOnce(null);
      await expect(service.getPortfolio(1, 'correctAuthId')).rejects.toThrow(
        NotFoundException,
      );
    });

    it('should throw UnauthorizedException if authId does not match credentials', async () => {
      const portfolioWithDifferentAuthId = {
        ...mockPortfolio,
        user: { ...mockUser, authId: 'differentAuthId' },
      };
      jest
        .spyOn(prisma.portfolio, 'findUnique')
        .mockResolvedValue(portfolioWithDifferentAuthId as any);
      await expect(service.getPortfolio(1, 'correctAuthId')).rejects.toThrow(
        UnauthorizedException,
      );
    });

    it('should return a portfolio', async () => {
      const result = await service.getPortfolio(1, 'correctAuthId');
      expect(result).toEqual(mockPortfolioWithUser);
    });
  });

  describe('getPortfoliosByUserAuthId', () => {
    it('should throw UnauthorizedException if authId does not match credentials', async () => {
      await expect(
        service.getPortfoliosByUserAuthId('wrongAuthId', 'correctAuthId'),
      ).rejects.toThrow(UnauthorizedException);
    });

    it('should throw NotFoundException if user is not found', async () => {
      jest.spyOn(prisma.user, 'findUnique').mockResolvedValueOnce(null);
      await expect(
        service.getPortfoliosByUserAuthId('correctAuthId', 'correctAuthId'),
      ).rejects.toThrow(NotFoundException);
    });

    it('should throw NotFoundException if no portfolios are found', async () => {
      jest.spyOn(prisma.portfolio, 'findMany').mockResolvedValueOnce([]);
      await expect(
        service.getPortfoliosByUserAuthId('correctAuthId', 'correctAuthId'),
      ).rejects.toThrow(NotFoundException);
    });

    it('should return portfolios', async () => {
      const result = await service.getPortfoliosByUserAuthId(
        'correctAuthId',
        'correctAuthId',
      );
      expect(result).toEqual([mockPortfolioWithUser]);
    });
  });

  describe('updatePortfolio', () => {
    it('should throw NotFoundException if portfolio is not found', async () => {
      jest.spyOn(prisma.portfolio, 'findUnique').mockResolvedValueOnce(null);
      await expect(
        service.updatePortfolio(
          1,
          { name: 'Updated Portfolio' },
          'correctAuthId',
        ),
      ).rejects.toThrow(NotFoundException);
    });

    it('should throw UnauthorizedException if authId does not match credentials', async () => {
      const portfolioWithDifferentAuthId = {
        ...mockPortfolio,
        user: { ...mockUser, authId: 'differentAuthId' },
      };
      jest
        .spyOn(prisma.portfolio, 'findUnique')
        .mockResolvedValue(portfolioWithDifferentAuthId as any);
      await expect(
        service.updatePortfolio(
          1,
          { name: 'Updated Portfolio' },
          'correctAuthId',
        ),
      ).rejects.toThrow(UnauthorizedException);
    });

    it('should update a portfolio', async () => {
      const result = await service.updatePortfolio(
        1,
        { name: 'Updated Portfolio' },
        'correctAuthId',
      );
      expect(result).toEqual(mockPortfolioWithUser);
    });
  });

  describe('deletePortfolio', () => {
    it('should throw NotFoundException if portfolio is not found', async () => {
      jest.spyOn(prisma.portfolio, 'findUnique').mockResolvedValueOnce(null);
      await expect(service.deletePortfolio(1, 'correctAuthId')).rejects.toThrow(
        NotFoundException,
      );
    });

    it('should throw UnauthorizedException if authId does not match credentials', async () => {
      const portfolioWithDifferentAuthId = {
        ...mockPortfolio,
        user: { ...mockUser, authId: 'differentAuthId' },
      };
      jest
        .spyOn(prisma.portfolio, 'findUnique')
        .mockResolvedValue(portfolioWithDifferentAuthId as any);
      await expect(service.deletePortfolio(1, 'correctAuthId')).rejects.toThrow(
        UnauthorizedException,
      );
    });

    it('should delete a portfolio', async () => {
      const result = await service.deletePortfolio(1, 'correctAuthId');
      expect(result).toEqual({
        status: '200',
        message: 'Portfolio and its investments were successfully deleted',
      });
    });
  });
});
