import { Injectable } from '@nestjs/common';
import { AppTransaction } from './app.interface';
import { AppRepository } from './app.repository';
import { DepositDTO } from './dtos/deposit.dto';
import { WithdrawDTO } from './dtos/withdraw.dto';
import { TransactionHistory } from './schemas/transaction-history.schema';
import { User } from './schemas/user.schema';
import { PaymentService } from './third-party/payment.service';
import { DepositResponse } from './types/deposit-response.type';
import { WithdrawResponse } from './types/withdraw-response.type';

@Injectable()
export class AppService implements AppTransaction {
  constructor(
    private readonly appRepo: AppRepository,
    private readonly paymentService: PaymentService,
  ) {}

  async createDeposit(depositDto: DepositDTO): Promise<DepositResponse> {
    const fullName = 'Umar Abdul Aziz Al-Faruq';

    const res = await this.paymentService.deposit(depositDto);

    try {
      depositDto.status = res.status;
      await this.appRepo.createDeposit(fullName, depositDto);
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

    const res = await this.paymentService.withdraw(withdrawDto);

    try {
      await this.appRepo.createWithdraw(fullName, withdrawDto);
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
      const user = await this.appRepo.getBalance(fullName);
      return user;
    } catch (err) {
      throw err;
    }
  }

  async getTransactionHistories(): Promise<TransactionHistory[]> {
    try {
      const historyList = await this.appRepo.getTransactionHistories();
      return historyList;
    } catch (err) {
      throw err;
    }
  }
}
