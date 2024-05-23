import { Injectable } from '@nestjs/common';
import { DepositDTO } from 'src/dtos/deposit.dto';
import { WithdrawDTO } from 'src/dtos/withdraw.dto';
import {
  PaymentDepositResponse,
  PaymentWithdrawResponse,
} from './payment-transaction.dto';
import { PaymentTransaction } from './payment-transaction.interface';

@Injectable()
export class PaymentService implements PaymentTransaction {
  async deposit(depositDTO: DepositDTO): Promise<PaymentDepositResponse> {
    await fetch('https://youdomain.com/deposit', {
      signal: AbortSignal.timeout(100),
      method: 'POST',
      headers: {
        Authorization: `Bearer ${btoa('Umar Abdul Aziz Al-Faruq')}`,
      },
      body: JSON.stringify({
        ...depositDTO,
        amount: parseFloat(depositDTO.amount),
      }),
    }).catch((e) => e);

    return {
      orderId: depositDTO.orderId,
      amount: parseFloat(depositDTO.amount),
      status: 1,
    };
  }

  async withdraw(withdrawDTO: WithdrawDTO): Promise<PaymentWithdrawResponse> {
    await fetch('https://youdomain.com/withdraw', {
      signal: AbortSignal.timeout(100),
      method: 'POST',
      headers: {
        Authorization: `Bearer ${btoa('Umar Abdul Aziz Al-Faruq')}`,
      },
      body: JSON.stringify({
        ...withdrawDTO,
        amount: parseFloat(withdrawDTO.amount),
      }),
    }).catch((e) => e);

    return {
      orderId: withdrawDTO.orderId,
      amount: parseFloat(withdrawDTO.amount),
      status: 1,
    };
  }
}
