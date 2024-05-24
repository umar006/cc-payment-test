import { DepositDTO } from 'src/dtos/deposit.dto';
import { WithdrawDTO } from 'src/dtos/withdraw.dto';
import { TransactionHistory } from 'src/schemas/transaction-history.schema';
import { User } from 'src/schemas/user.schema';

export interface AppTransactionRepository {
  createDeposit(fullName: string, depositDto: DepositDTO): Promise<void>;
  createWithdraw(fullName: string, withdrawDto: WithdrawDTO): Promise<void>;
  getBalance(fullName: string): Promise<User>;
  getTransactionHistories(): Promise<TransactionHistory[]>;
}
