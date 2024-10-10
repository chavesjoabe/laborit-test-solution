import { Controller, Post, Body } from '@nestjs/common';
import { PromptService } from './prompt.service';
import { CreatePromptDto } from './dto/create-prompt.dto';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('prompt')
@Controller('prompt')
export class PromptController {
  constructor(private readonly promptService: PromptService) {}

  @Post('sql')
  @ApiBody({ type: CreatePromptDto })
  @ApiOperation({
    summary: 'Get prompt SQL',
    description:
      'This endpoint allows you to send your prompt and receive the SQL to get the answer that you need',
  })
  public async getPromptSql(
    @Body() createPromptDto: CreatePromptDto,
  ): Promise<string> {
    return this.promptService.getPromptQuery(createPromptDto.prompt);
  }

  @Post('sql/response')
  @ApiBody({ type: CreatePromptDto })
  @ApiOperation({
    summary: 'Get prompt Response',
    description:
      'This endpoint allows you to send your prompt and receive the response of the query',
  })
  public async getPromptResponse(@Body() createPromptDto: CreatePromptDto) {
    return this.promptService.getPromptResponse(createPromptDto.prompt);
  }
}
