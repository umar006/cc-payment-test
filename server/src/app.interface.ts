import { DepositDTO } from './dtos/deposit.dto';

export interface AppTransaction {
  createDeposit(depositDTO: DepositDTO);
  createWithdraw(withdrawDTO: DepositDTO);
}
