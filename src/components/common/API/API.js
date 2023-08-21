import Axios from "./Axios";

async function API() {
  return "test";
}

async function getAllTickets() {
  try {
    let result = await Axios.get("/tickets");
    return result;
  } catch (error) {
    return error;
  }
}

// async function getTableLength() {
//   try {
//     let result = await Axios.get("/tickets/get-log-length");
//     return result;
//   } catch (error) {
//     return error;
//   }
// }

// async function getCollection(page, limit) {
//   try {
//     let result = await Axios.get(
//       `/tickets/get-collection?page=${page}&limit=${limit}`
//     );
//     return result;
//   } catch (error) {
//     return error;
//   }
// }

async function getTicketById(id) {
  try {
    let result = await Axios.get(`/tickets/${id}`);
    return result;
  } catch (error) {
    return error;
  }
}

async function deleteTicketByID(id) {
  try {
    let result = await Axios.delete(`/tickets/${id}`);
    return result;
  } catch (error) {
    return error;
  }
}

async function createTicket(data) {
  try {
    let result = await Axios.post(`/tickets`, data);
    return result;
  } catch (error) {
    return error;
  }
}

async function updateTicket(id, data) {
  try {
    let result = await Axios.put(`/tickets/${id}`, data);
    return result;
  } catch (error) {
    return error;
  }
}
async function searchTicket(term) {
  try {
    let result = await Axios.get(`/tickets/get-by-search/${term}`);
    return result;
  } catch (error) {
    return error;
  }
}

export {
  API,
  getAllTickets,
  //getTableLength,
  getTicketById,
  deleteTicketByID,
  createTicket,
  updateTicket,
  //getCollection,
  searchTicket,
};
