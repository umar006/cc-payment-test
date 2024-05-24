import { Exclude } from 'class-transformer';
import { IsString } from 'class-validator';

export class DepositDTO {
  @Exclude()
  orderId = crypto.randomUUID();

  @IsString()
  amount: string;

  @Exclude()
  timestamp = new Date();

  @Exclude()
  status: number;
}
