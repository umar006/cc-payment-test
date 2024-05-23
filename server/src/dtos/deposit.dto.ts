import { IsString } from 'class-validator';

export class DepositDTO {
  orderId = crypto.randomUUID();

  @IsString()
  amount: string;

  timestamp = Date.now();
}
