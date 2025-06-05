// src/utils/api.js
import axios from "axios";

const baseURL = "http://localhost:3000"; // change to your backend's actual URL

/**
 * Universal API call helper for admin panel
 *
 * @param {string} method - HTTP method (GET, POST, etc.)
 * @param {string} endpoint - API endpoint (e.g. /api/login)
 * @param {object} data - Payload for POST/PUT
 * @param {boolean} withAuth - If true, includes Authorization header
 * @returns {Promise<any>} - Full Axios response or throws error
 */
export const apiRequest = async (method, endpoint, data = {}) => {


  try {
    const accessToken = await localStorage.getItem('accesstoken');
    const config = {
      method,
      url: `${baseURL}${endpoint}`,
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      data,
    };
    
    const response = await axios(config);
    return response;
  } catch (error) {
     // Handle 401 Unauthorized
    if (error.response?.status === 401) {
      console.warn("⚠️ Unauthorized. Clearing access token.");
      localStorage.removeItem('accesstoken');
    }
    console.error("🔴 API Error:", error.response?.data || error.message);
    throw error;
  }
};
