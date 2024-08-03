import { Test, TestingModule } from '@nestjs/testing';
import { PortfolioController } from './controllers/portfolio.controller';
import { PortfolioService } from './services/portfolio.service';
import { CreatePortfolioDto } from './dto/create-portfolio.dto';
// import { UpdatePortfolioDto } from '../src/dto/update-portfolio.dto';
// import { FirebaseAuthGuard } from 'src/guards/firebase-auth.guard';
import { NotFoundException, UnauthorizedException } from '@nestjs/common';
import { Portfolio } from '@prisma/client';

describe('PortfolioController', () => {
  let controller: PortfolioController;
  let service: PortfolioService;

  const mockPortfolio: Portfolio = {
    id: 1,
    name: 'Test Portfolio',
    userId: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PortfolioController],
      providers: [
        {
          provide: PortfolioService,
          useValue: {
            createPortfolio: jest.fn().mockResolvedValue(mockPortfolio),
            getPortfoliosByUserAuthId: jest
              .fn()
              .mockResolvedValue([mockPortfolio]),
            getPortfolio: jest.fn().mockResolvedValue(mockPortfolio),
            updatePortfolio: jest.fn().mockResolvedValue(mockPortfolio),
            deletePortfolio: jest.fn().mockResolvedValue({
              status: '200',
              message:
                'Portfolio and its investments were successfully deleted',
            }),
          },
        },
      ],
    }).compile();

    controller = module.get<PortfolioController>(PortfolioController);
    service = module.get<PortfolioService>(PortfolioService);
  });

  describe('createPortfolio', () => {
    it('should create a portfolio', async () => {
      const result = { id: 1, name: 'Test Portfolio' };
      jest.spyOn(service, 'createPortfolio').mockResolvedValue(result as any);

      expect(
        await controller.createPortfolio(
          'authId',
          { name: 'Test Portfolio' } as CreatePortfolioDto,
          '{"id": "authId"}',
        ),
      ).toBe(result);
    });

    it('should throw UnauthorizedException if authId does not match credentials', async () => {
      jest
        .spyOn(service, 'createPortfolio')
        .mockRejectedValue(new UnauthorizedException());
      await expect(
        controller.createPortfolio(
          'wrongAuthId',
          { name: 'Test Portfolio' },
          '{"id": "correctAuthId"}',
        ),
      ).rejects.toThrow(UnauthorizedException);
    });

    it('should throw NotFoundException if user is not found', async () => {
      jest
        .spyOn(service, 'createPortfolio')
        .mockRejectedValue(new NotFoundException());
      await expect(
        controller.createPortfolio(
          'correctAuthId',
          { name: 'Test Portfolio' },
          '{"id": "correctAuthId"}',
        ),
      ).rejects.toThrow(NotFoundException);
    });
  });

  describe('getPortfoliosByUserAuthId', () => {
    it('should return portfolios', async () => {
      const result = [mockPortfolio];
      jest
        .spyOn(service, 'getPortfoliosByUserAuthId')
        .mockResolvedValue(result as any);

      expect(
        await controller.getPortfoliosByUserAuthId(
          'authId',
          '{"id": "authId"}',
        ),
      ).toBe(result);
    });

    it('should throw UnauthorizedException if authId does not match credentials', async () => {
      jest
        .spyOn(service, 'getPortfoliosByUserAuthId')
        .mockRejectedValue(new UnauthorizedException());
      await expect(
        controller.getPortfoliosByUserAuthId(
          'wrongAuthId',
          '{"id": "correctAuthId"}',
        ),
      ).rejects.toThrow(UnauthorizedException);
    });

    it('should throw NotFoundException if user is not found', async () => {
      jest
        .spyOn(service, 'getPortfoliosByUserAuthId')
        .mockRejectedValue(new NotFoundException());
      await expect(
        controller.getPortfoliosByUserAuthId(
          'correctAuthId',
          '{"id": "correctAuthId"}',
        ),
      ).rejects.toThrow(NotFoundException);
    });
  });

  describe('getPortfolio', () => {
    it('should return a portfolio', async () => {
      const result = mockPortfolio;
      jest.spyOn(service, 'getPortfolio').mockResolvedValue(result as any);

      expect(await controller.getPortfolio(1, '{"id": "correctAuthId"}')).toBe(
        result,
      );
    });

    it('should throw UnauthorizedException if authId does not match credentials', async () => {
      jest
        .spyOn(service, 'getPortfolio')
        .mockRejectedValue(new UnauthorizedException());
      await expect(
        controller.getPortfolio(1, '{"id": "wrongAuthId"}'),
      ).rejects.toThrow(UnauthorizedException);
    });

    it('should throw NotFoundException if portfolio is not found', async () => {
      jest
        .spyOn(service, 'getPortfolio')
        .mockRejectedValue(new NotFoundException());
      await expect(
        controller.getPortfolio(1, '{"id": "correctAuthId"}'),
      ).rejects.toThrow(NotFoundException);
    });
  });

  describe('updatePortfolio', () => {
    it('should update a portfolio', async () => {
      const result = mockPortfolio;
      jest.spyOn(service, 'updatePortfolio').mockResolvedValue(result as any);

      expect(
        await controller.updatePortfolio(
          1,
          { name: 'Updated Portfolio' },
          '{"id": "correctAuthId"}',
        ),
      ).toBe(result);
    });

    it('should throw UnauthorizedException if authId does not match credentials', async () => {
      jest
        .spyOn(service, 'updatePortfolio')
        .mockRejectedValue(new UnauthorizedException());
      await expect(
        controller.updatePortfolio(
          1,
          { name: 'Updated Portfolio' },
          '{"id": "wrongAuthId"}',
        ),
      ).rejects.toThrow(UnauthorizedException);
    });

    it('should throw NotFoundException if portfolio is not found', async () => {
      jest
        .spyOn(service, 'updatePortfolio')
        .mockRejectedValue(new NotFoundException());
      await expect(
        controller.updatePortfolio(
          1,
          { name: 'Updated Portfolio' },
          '{"id": "correctAuthId"}',
        ),
      ).rejects.toThrow(NotFoundException);
    });
  });

  describe('deletePortfolio', () => {
    it('should delete a portfolio', async () => {
      const result = {
        status: '200',
        message: 'Portfolio and its investments were successfully deleted',
      };
      jest.spyOn(service, 'deletePortfolio').mockResolvedValue(result as any);

      expect(
        await controller.deletePortfolio(1, '{"id": "correctAuthId"}'),
      ).toBe(result);
    });

    it('should throw UnauthorizedException if authId does not match credentials', async () => {
      jest
        .spyOn(service, 'deletePortfolio')
        .mockRejectedValue(new UnauthorizedException());
      await expect(
        controller.deletePortfolio(1, '{"id": "wrongAuthId"}'),
      ).rejects.toThrow(UnauthorizedException);
    });

    it('should throw NotFoundException if portfolio is not found', async () => {
      jest
        .spyOn(service, 'deletePortfolio')
        .mockRejectedValue(new NotFoundException());
      await expect(
        controller.deletePortfolio(1, '{"id": "correctAuthId"}'),
      ).rejects.toThrow(NotFoundException);
    });
  });
});
