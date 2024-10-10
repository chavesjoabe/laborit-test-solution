import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreatePromptDto {
  @IsString()
  @ApiProperty({
    example: 'Find all users',
    description: 'The prompt to get required data',
  })
  prompt: string;
}
