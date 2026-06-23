import axios from 'axios';
import type { AuditResult } from '../types/audit';
import { notification } from 'antd';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api/v1';

export const auditClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 60000, // 60s timeout for scraping and AI processing
});

export const auditApi = {
  analyzeWebsite: async (url: string): Promise<AuditResult> => {
    try {
      const response = await auditClient.post<AuditResult>('/audits', { url });
      return response.data;
    } catch (error: any) {
      let errorMessage = 'Failed to analyze the website. Make sure the server is running and the URL is publicly accessible.';

      if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      } else if (error.response?.data?.error) {
        errorMessage = error.response.data.error;
      } else if (error.message) {
        errorMessage = error.message;
      }

      // Notify users through popup
      notification.error({
        message: 'Analysis Failed',
        description: errorMessage,
        placement: 'topRight',
        duration: 5,
      });

      throw new Error(errorMessage);
    }
  },

  checkHealth: async (): Promise<boolean> => {
    try {
      const response = await auditClient.get<{ status: string }>('/health');
      return response.data?.status === 'UP';
    } catch {
      return false;
    }
  }
};
