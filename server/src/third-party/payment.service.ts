import { Injectable } from '@nestjs/common';
import { DepositDTO } from 'src/dtos/deposit.dto';

@Injectable()
export class PaymentService {
  async deposit(depositDTO: DepositDTO) {
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
      order_id: depositDTO.order_id,
      amount: depositDTO.amount,
      status: 1,
    };
  }
}
