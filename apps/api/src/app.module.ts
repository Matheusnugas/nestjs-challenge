import { Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { UserService } from './services/user.service';
import { UserController } from './controllers/user.controller';
import { PortfolioService } from './services/portfolio.service';
import { PortfolioController } from './controllers/portfolio.controller';
import { InvestmentService } from './services/investment.service';
import { InvestmentController } from './controllers/investment.controller';
import { CompanyService } from './services/company.service';
import { CompanyController } from './controllers/company.controller';
import { AuthService } from './services/auth.service';
import { AuthController } from './controllers/auth.controller';
import { AppController } from './app.controller';
import { AppService } from './app.service';
// import { ServeStaticModule } from '@nestjs/serve-static';
// import { join } from 'path';

@Module({
  imports: [
    // ServeStaticModule.forRoot({
    //   rootPath: join(__dirname, '../../..', 'web', 'dist'),
    // }),
  ],
  controllers: [
    UserController,
    PortfolioController,
    InvestmentController,
    CompanyController,
    AuthController,
    AppController,
  ],
  providers: [
    PrismaService,
    UserService,
    PortfolioService,
    InvestmentService,
    CompanyService,
    AuthService,
    AppService,
  ],
})
export class AppModule {}
