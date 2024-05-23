import { DepositDTO } from './dtos/deposit.dto';
import { DepositResponse } from './types/deposit-response.type';
import { WithdrawResponse } from './types/withdraw-response.type';

export interface AppTransaction {
  createDeposit(depositDTO: DepositDTO): Promise<DepositResponse>;
  createWithdraw(withdrawDTO: DepositDTO): Promise<WithdrawResponse>;
}
