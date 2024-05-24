import { DepositDTO } from 'src/dtos/deposit.dto';
import { WithdrawDTO } from 'src/dtos/withdraw.dto';
import { TransactionHistory } from 'src/schemas/transaction-history.schema';
import { User } from 'src/schemas/user.schema';
import { DepositResponse } from 'src/types/deposit-response.type';
import { WithdrawResponse } from 'src/types/withdraw-response.type';

export interface AppTransactionService {
  createDeposit(depositDTO: DepositDTO): Promise<DepositResponse>;
  createWithdraw(withdrawDTO: WithdrawDTO): Promise<WithdrawResponse>;
  getBalance(): Promise<User>;
  getTransactionHistories(): Promise<TransactionHistory[]>;
}
