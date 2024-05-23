import { IsString } from 'class-validator';

export class DepositDTO {
  orderId: string;
  @IsString()
  amount: string;
  timestamp: number;
}
