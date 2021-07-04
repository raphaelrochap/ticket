import axios from 'axios';

const API_URL = 'http://localhost:3333/api';

class TagService {
  retrieveAllTags() {
    return axios.get(`${API_URL}/tag`);
  }

  saveTag(tag) {
    return axios.post(`${API_URL}/tag`, tag);
  }

  deleteTag(id) {
    return axios.delete(`${API_URL}/tag/${id}`);
  }
}

export default new TagService();
