import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  wallet = {
    balance: parseFloat((10000.0).toFixed(2)),
  };

  async deposit(depositDto: Record<string, any>) {
    await fetch('https://youdomain.com/deposit', {
      signal: AbortSignal.timeout(1000),
      method: 'POST',
      headers: {
        Authorization: `Bearer ${btoa('Umar Abdul Aziz Al-Faruq')}`,
      },
      body: JSON.stringify(depositDto),
    }).catch((e) => e);

    this.wallet.balance += depositDto.amount;

    return {
      order_id: depositDto.order_id,
      amount: depositDto.amount,
      status: 1,
    };
  }

  async withdraw(withdrawDto: Record<string, any>) {
    await fetch('https://youdomain.com/withdraw', {
      signal: AbortSignal.timeout(1000),
      method: 'POST',
      headers: {
        Authorization: `Bearer ${btoa('Umar Abdul Aziz Al-Faruq')}`,
      },
      body: JSON.stringify(withdrawDto),
    }).catch((e) => e);

    this.wallet.balance += -withdrawDto.amount;

    return {
      order_id: withdrawDto.order_id,
      amount: withdrawDto.amount,
      status: 1,
    };
  }

  getHello(): string {
    return 'Hello World!';
  }
}
