import { TestBed } from '@automock/jest';

import { GetPromptResponse, PromptService } from '../prompt.service';
import { DataSource } from 'typeorm';
import * as rxjs from 'rxjs';

describe('Prompt Service Unit Test', () => {
  let promptService: PromptService;
  let database: jest.Mocked<DataSource>;

  beforeAll(() => {
    const { unit, unitRef } = TestBed.create(PromptService).compile();

    promptService = unit;
    database = unitRef.get(DataSource);
  });

  test('should be defined', async () => {
    expect(promptService).toBeDefined();
  });

  test('should send request to get SQL query', async () => {
    const mockResponse: GetPromptResponse = {
      output: 'SELECT * FROM USERS',
      generation: {
        count: 1,
      },
    };

    jest
      .spyOn(rxjs, 'firstValueFrom')
      .mockResolvedValueOnce({ data: mockResponse });

    const input = 'Bring me all users';
    const response = await promptService.getPromptQuery(input);

    expect(response).toBe('SELECT * FROM USERS');
  });

  test('should throw an error if get SQL query request fails', async () => {
    try {
      jest
        .spyOn(rxjs, 'firstValueFrom')
        .mockRejectedValueOnce(new Error('REQUEST ERROR'));

      await promptService.getPromptQuery('');
    } catch (error) {
      const errorMessage = 'ERROR ON GET PROMPT SQL - Error: REQUEST ERROR';
      expect(error.message).toBe(errorMessage);
    }
  });

  test('should get sql from endpoint and return the query result', async () => {
    const mockRequestResponse: GetPromptResponse = {
      output: 'SELECT * FROM USERS',
      generation: {
        count: 1,
      },
    };

    const mockQueryResponse = [
      { id: 1, name: 'user 1' },
      { id: 2, name: 'user 2' },
    ];

    jest
      .spyOn(rxjs, 'firstValueFrom')
      .mockResolvedValueOnce({ data: mockRequestResponse });

    jest.spyOn(database, 'query').mockResolvedValueOnce(mockQueryResponse);

    const input = 'Bring me all users';
    const response = await promptService.getPromptResponse(input);

    expect(response).toEqual(mockQueryResponse);
  });

  test('should throw an error if get query response fails', async () => {
    try {
      const mockResponse: GetPromptResponse = {
        output: 'SELECT * FROM USERS',
        generation: {
          count: 1,
        },
      };

      jest
        .spyOn(rxjs, 'firstValueFrom')
        .mockResolvedValueOnce({ data: mockResponse });

      jest
        .spyOn(database, 'query')
        .mockRejectedValueOnce(new Error('ERROR ON DATABASE REQUEST'));

      await promptService.getPromptResponse('');
    } catch (error) {
      const errorMessage =
        'ERROR ON GET PROMPT RESPONSE - Error: ERROR ON DATABASE REQUEST';
      expect(error.message).toBe(errorMessage);
    }
  });
});
