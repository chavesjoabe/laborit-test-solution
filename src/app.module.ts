import { Logger, Module } from '@nestjs/common';
import { PromptModule } from './prompt/prompt.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { applicationConfig } from './core/config/app.config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    PromptModule,
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      load: [applicationConfig],
      envFilePath: ['.env'],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        const { mySql } = configService.get('application');
        return mySql;
      },
      inject: [ConfigService],
    }),
  ],
  providers: [Logger],
})
export class AppModule {}
