import { Logger, Module } from '@nestjs/common';
import { PromptService } from './prompt.service';
import { PromptController } from './prompt.controller';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  controllers: [PromptController],
  providers: [PromptService, Logger],
})
export class PromptModule {}
