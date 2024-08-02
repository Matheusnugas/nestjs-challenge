import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('hello')
@ApiTags('hello')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @ApiOperation({ summary: 'Get a hello message' })
  @ApiResponse({
    status: 200,
    description: 'The hello message has been successfully retrieved.',
    type: String,
  })
  getHello(): string {
    return this.appService.getHello();
  }
}
