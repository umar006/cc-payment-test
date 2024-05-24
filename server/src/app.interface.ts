import { DepositDTO } from './dtos/deposit.dto';
import { WithdrawDTO } from './dtos/withdraw.dto';
import { TransactionHistory } from './schemas/transaction-history.schema';
import { User } from './schemas/user.schema';
import { DepositResponse } from './types/deposit-response.type';
import { WithdrawResponse } from './types/withdraw-response.type';

export interface AppTransaction {
  createDeposit(depositDTO: DepositDTO): Promise<DepositResponse>;
  createWithdraw(withdrawDTO: WithdrawDTO): Promise<WithdrawResponse>;
  getBalance(): Promise<User>;
  getTransactionHistories(): Promise<TransactionHistory[]>;
}
