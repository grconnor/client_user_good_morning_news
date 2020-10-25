import axios from "axios";
import { getAuthHeaders } from "./auth";

const Articles = {
  async index(category, location) {
    let response;
    try {
      let result;
      if (category) {
        result = await axios.get(`/articles/?category=${category}`);
      } else if (location) {
        result = await axios.get(`/articles/?location=${location}`);
      } else {
        result = await axios.get(`/articles`);
      }
      response = result.data.articles;
    } catch (error) {
      response = error.response.data.error_message;
    } finally {
      return response;
    }
  },

  async show(articleId, role) {
    try {
      let result;
      if (role) {
        result = await axios.get(`/articles/${articleId}`, {
          headers: getAuthHeaders(),
        });
      } else {
        result = await axios.get(`/articles/${articleId}`);
      }
      return result.data.article;
    } catch (error) {
      return error.response.data.error;
    }
  },
};
export default Articles;
