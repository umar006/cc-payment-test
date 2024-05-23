import { DepositDTO } from 'src/dtos/deposit.dto';
import { WithdrawDTO } from 'src/dtos/withdraw.dto';
import {
  PaymentDepositResponse,
  PaymentWithdrawResponse,
} from './payment-transaction.dto';

export interface PaymentTransaction {
  deposit(depositDTO: DepositDTO): Promise<PaymentDepositResponse>;
  withdraw(withdrawDTO: WithdrawDTO): Promise<PaymentWithdrawResponse>;
}
