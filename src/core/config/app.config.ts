import { registerAs } from '@nestjs/config';

export interface IMySqlOptions {
  type: string;
  host: string;
  port: number;
  username: string;
  password: string;
  database: string;
  entities: any[];
}

export interface IText2SqlCongig {
  apiKey: string;
  url: string;
}

export interface IApplicationConfig {
  port: number;
  mySql: IMySqlOptions;
  text2Sql: IText2SqlCongig;
}

const mySqlOptions = (): IMySqlOptions => {
  return {
    type: process.env.DB_TYPE,
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    entities: [],
  };
};

export const configFactory = (): IApplicationConfig => ({
  port: process.env.PORT ? Number(process.env.PORT) : 3000,
  mySql: mySqlOptions(),
  text2Sql: {
    url: process.env.TEXT_2_SQL_URL,
    apiKey: process.env.TEXT_2_SQL_API_KEY,
  },
});

export const applicationConfig = registerAs('application', configFactory);
