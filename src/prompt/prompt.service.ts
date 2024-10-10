import {
  Inject,
  Injectable,
  Logger,
  PreconditionFailedException,
} from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { DataSource } from 'typeorm';
import { SchemaHelper } from 'src/constants/Schema.helper';
import { PromptHelper } from 'src/constants/Prompt.helper';
import { applicationConfig } from 'src/core/config/app.config';
import { ConfigType } from '@nestjs/config';

export type GetPromptResponse = {
  output: string;
  generation: {
    count: number;
  };
};

@Injectable()
export class PromptService {
  constructor(
    private readonly httpService: HttpService,
    private readonly dbService: DataSource,
    @Inject(applicationConfig.KEY)
    private readonly config: ConfigType<typeof applicationConfig>,
    private readonly logger: Logger,
  ) {}

  public async getPromptQuery(prompt: string): Promise<string> {
    try {
      const requestBody = {
        prompt: `${prompt} - ${PromptHelper}`,
        type: 'postgres',
        schema: SchemaHelper,
      };

      const headers = {
        Authorization: this.config.text2Sql.apiKey,
      };
      this.logger.log(`sending request with prompt: ${prompt}`);

      const url = this.config.text2Sql.url;
      const { data: response } = await firstValueFrom(
        this.httpService.post<GetPromptResponse>(url, requestBody, { headers }),
      );

      return response.output;
    } catch (error) {
      const errorMessage = `ERROR ON GET PROMPT SQL - ${error}`;
      this.logger.error(errorMessage);
      throw new PreconditionFailedException(errorMessage);
    }
  }

  public async getPromptResponse(prompt: string) {
    try {
      const query = await this.getPromptQuery(prompt);
      const response = await this.dbService.query(query);
      return response;
    } catch (error) {
      const errorMessage = `ERROR ON GET PROMPT RESPONSE - ${error}`;
      this.logger.error(errorMessage);
      throw new PreconditionFailedException(errorMessage);
    }
  }
}
