import { IsString } from 'class-validator';

export class WithdrawDTO {
  orderId = crypto.randomUUID();

  @IsString()
  amount: string;

  timestamp = Date.now();
}
