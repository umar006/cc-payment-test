import { Injectable } from '@nestjs/common';
import { AppRepository } from './app.repository';
import { DepositDTO } from './dtos/deposit.dto';
import { WithdrawDTO } from './dtos/withdraw.dto';
import { User } from './schemas/user.schema';
import { PaymentService } from './third-party/payment.service';

@Injectable()
export class AppService {
  constructor(
    private readonly appRepo: AppRepository,
    private readonly paymentService: PaymentService,
  ) {}

  async deposit(depositDto: DepositDTO) {
    const fullName = 'Umar Abdul Aziz Al-Faruq';

    const res = await this.paymentService.deposit(depositDto);

    try {
      await this.appRepo.deposit(fullName, depositDto);
    } catch (err) {
      throw err;
    }

    return {
      order_id: res.order_id,
      amount: res.amount,
      status: res.status,
    };
  }

  async withdraw(withdrawDto: WithdrawDTO) {
    const fullName = 'Umar Abdul Aziz Al-Faruq';

    await fetch('https://youdomain.com/withdraw', {
      signal: AbortSignal.timeout(100),
      method: 'POST',
      headers: {
        Authorization: `Bearer ${btoa('Umar Abdul Aziz Al-Faruq')}`,
      },
      body: JSON.stringify({
        ...withdrawDto,
        amount: parseFloat(withdrawDto.amount),
      }),
    }).catch((e) => e);

    try {
      await this.appRepo.withdraw(fullName, withdrawDto);
    } catch (err) {
      throw err;
    }

    return {
      order_id: withdrawDto.order_id,
      amount: withdrawDto.amount,
      status: 1,
    };
  }

  async balance(): Promise<User> {
    const fullName = 'Umar Abdul Aziz Al-Faruq';

    try {
      const user = await this.appRepo.balance(fullName);
      return user;
    } catch (err) {
      throw err;
    }
  }

  async transactionHistories() {
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
