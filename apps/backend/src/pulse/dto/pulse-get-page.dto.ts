import { IsOptional, IsString, MaxLength, MinLength } from 'class-validator'
import { Transform } from 'class-transformer'
import { StripLow, Trim } from 'class-sanitizer'
import { INCORRECT_CHARACTERS_REGEXP } from '@app/shared'

export class PulseGetPageDto {
  @MaxLength(10)
  @MinLength(2)
  @IsString()
  @IsOptional()
  @StripLow(false)
  @Trim()
  @Transform(({ value }) => value.replace(INCORRECT_CHARACTERS_REGEXP, ''))
  shareTag?: string

  @MaxLength(128)
  @MinLength(2)
  @IsString()
  @IsOptional()
  @StripLow(false)
  @Trim()
  @Transform(({ value }) => value.replace(INCORRECT_CHARACTERS_REGEXP, ''))
  search?: string
}
