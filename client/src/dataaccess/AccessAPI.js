import axios from 'axios';

const apiUrl = process.env.REACT_APP_API_URL;

export const getTasks = async () => {
  const reqRes = await axios.get(`${apiUrl}/tasks`);
  return reqRes.data;
};

export const getTask = async (taskId) => {
  const reqRes = await axios.get(`${apiUrl}/tasks/${taskId}`);
  return reqRes.data;
};

export const getOrganisationTasks = async (orgId) => {
  const orgRes = await axios.get(`${apiUrl}/Organisations/${orgId}`);
  const reqRes = await axios.get(`${apiUrl}/Organisations/${orgId}/tasks`);
  return { organisation: orgRes.data, tasks: reqRes.data };
};

export const addTask = async (task) => {
  await axios.request({
    method: 'post',
    url: `${apiUrl}/tasks`,
    data: task
  });
};

export const updateTask = async (task) => {
  await axios.request({
    method: 'put',
    url: `${apiUrl}/tasks/${task.id}`,
    data: task
  });
};

export const getOrganisations = async () => {
  const reqRes = await axios.get(`${apiUrl}/Organisations`);
  return reqRes.data;
};

export const getPriorities = async () => {
  const reqRes = await axios.get(`${apiUrl}/priorities`);
  return reqRes.data;
};

export const getStatuses = async () => {
  const reqRes = await axios.get(`${apiUrl}/statuses`);
  return reqRes.data;
};

export const getVehicles = async () => {
  const reqRes = await axios.get(`${apiUrl}/vehicles`);
  return reqRes.data;
};
