import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { DepositDTO } from './dtos/deposit.dto';
import { WithdrawDTO } from './dtos/withdraw.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('deposit')
  async deposit(@Body() depositDto: DepositDTO) {
    const response = await this.appService.createDeposit(depositDto);
    return response;
  }

  @Post('withdraw')
  async withdraw(@Body() withdrawDto: WithdrawDTO) {
    const response = await this.appService.createWithdraw(withdrawDto);
    return response;
  }

  @Get('balance')
  async balance() {
    const response = await this.appService.balance();
    return response;
  }

  @Get('histories')
  async transactionHistories() {
    const response = await this.appService.transactionHistories();
    return response;
  }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
