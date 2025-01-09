import {
  IsBoolean,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateTipDto {
  @IsString()
  path: string;

  @MinLength(2)
  @MaxLength(28)
  name: string;

  @MinLength(3)
  @MaxLength(280)
  @IsOptional()
  message?: string;

  @MaxLength(32)
  @IsString()
  amount: string;

  @IsBoolean()
  private: boolean;

  @IsOptional()
  @IsNumber()
  coinId?: number;
}
