import { APIRequestContext } from '@playwright/test';
import { loadConfig } from '../utils/config-loader';

const config = loadConfig();
export class UserAPI {
  readonly request: APIRequestContext;

  constructor(request: APIRequestContext) {
    this.request = request;
  }

  async createUser(userData: any) {
    const response = await this.request.post(`${config.baseURL}/api/users`, {
      data: userData,
      headers: {
        'Authorization': `Bearer ${config.apiKey}` // Use API key from config
      }
    });
    return response;
  }
}