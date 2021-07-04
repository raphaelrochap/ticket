import axios from 'axios';

const API_URL = 'http://localhost:3333/api';

class TicketService {
  retrieveAllTickets() {
    return axios.get(`${API_URL}/ticket`);
  }

  saveTicket(ticket) {
    return axios.post(`${API_URL}/ticket`, ticket);
  }

  deleteTicket(id) {
    return axios.delete(`${API_URL}/ticket/${id}`);
  }

  updateTicket(id, ticket) {
    return axios.put(`${API_URL}/ticket/${id}`, ticket);
  }
}

export default new TicketService();
