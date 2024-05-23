import { IsString } from 'class-validator';

export class WithdrawDTO {
  orderId: string;
  @IsString()
  amount: string;
  timestamp: number;
}
