import { Injectable } from '@nestjs/common';
import { AppTransaction } from './app.interface';
import { AppRepository } from './app.repository';
import { DepositDTO } from './dtos/deposit.dto';
import { WithdrawDTO } from './dtos/withdraw.dto';
import { User } from './schemas/user.schema';
import { PaymentService } from './third-party/payment.service';
import { DepositResponse } from './types/deposit-response.type';
import { WithdrawResponse } from './types/withdraw-response.type';
import { TransactionHistory } from './schemas/transaction-history.schema';

@Injectable()
export class AppService implements AppTransaction {
  constructor(
    private readonly appRepo: AppRepository,
    private readonly paymentService: PaymentService,
  ) {}

  async createDeposit(depositDto: DepositDTO): Promise<DepositResponse> {
    const fullName = 'Umar Abdul Aziz Al-Faruq';

    depositDto.orderId = crypto.randomUUID();
    depositDto.timestamp = Date.now();
    const res = await this.paymentService.deposit(depositDto);

    try {
      await this.appRepo.deposit(fullName, depositDto);
    } catch (err) {
      throw err;
    }

    return {
      orderId: res.orderId,
      amount: res.amount,
      status: res.status,
    };
  }

  async createWithdraw(withdrawDto: WithdrawDTO): Promise<WithdrawResponse> {
    const fullName = 'Umar Abdul Aziz Al-Faruq';

    withdrawDto.orderId = crypto.randomUUID();
    withdrawDto.timestamp = Date.now();
    const res = await this.paymentService.withdraw(withdrawDto);

    try {
      await this.appRepo.withdraw(fullName, withdrawDto);
    } catch (err) {
      throw err;
    }

    return {
      orderId: res.orderId,
      amount: res.amount,
      status: res.status,
    };
  }

  async getBalance(): Promise<User> {
    const fullName = 'Umar Abdul Aziz Al-Faruq';

    try {
      const user = await this.appRepo.balance(fullName);
      return user;
    } catch (err) {
      throw err;
    }
  }

  async getTransactionHistories(): Promise<TransactionHistory[]> {
    try {
      const historyList = await this.appRepo.transactionHistories();
      return historyList;
    } catch (err) {
      throw err;
    }
  }

  getHello(): string {
    return 'Hello World!';
  }
}
