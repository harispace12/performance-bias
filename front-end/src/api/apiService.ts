import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000', // adjust if needed
});

export const fetchDashboardSummary = () => api.get('/dashboard_summary');
export const fetchEmployees = () => api.get('/employees');
export const fetchBiasCases = () => api.get('/bias_cases');
export const fetchBiasByTeam = () => api.get('/bias_summary_by_team');
export const fetchPromotionStats = () => api.get('/promotion_stats');
