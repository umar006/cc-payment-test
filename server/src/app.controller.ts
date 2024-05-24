import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { DepositDTO } from './dtos/deposit.dto';
import { WithdrawDTO } from './dtos/withdraw.dto';
import { TransactionHistory } from './schemas/transaction-history.schema';
import { User } from './schemas/user.schema';
import { DepositResponse } from './types/deposit-response.type';
import { WithdrawResponse } from './types/withdraw-response.type';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('deposit')
  async deposit(@Body() depositDto: DepositDTO): Promise<DepositResponse> {
    const response = await this.appService.createDeposit(depositDto);
    return response;
  }

  @Post('withdraw')
  async withdraw(@Body() withdrawDto: WithdrawDTO): Promise<WithdrawResponse> {
    const response = await this.appService.createWithdraw(withdrawDto);
    return response;
  }

  @Get('balance')
  async balance(): Promise<User> {
    const response = await this.appService.getBalance();
    return response;
  }

  @Get('histories')
  async transactionHistories(): Promise<TransactionHistory[]> {
    const response = await this.appService.getTransactionHistories();
    return response;
  }
}
