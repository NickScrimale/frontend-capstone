import axios from 'axios';
import { clientCredentials } from '../utils/client';

const dbUrl = clientCredentials.databaseURL;

const getBlogs = (uid) => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/blogs.json?orderBy="uid"&equalTo="${uid}"`)
    .then((response) => {
      if (response.data) {
        resolve(Object.values(response.data));
      } else {
        resolve([]);
      }
    })
    .catch((error) => reject(error));
});

const deleteBlog = (firebaseKey) => new Promise((resolve, reject) => {
  axios.delete(`${dbUrl}/blogs/${firebaseKey}.json`)
    .then(() => resolve('deleted'))
    .catch((error) => reject(error));
});

const getSingleBlog = (firebaseKey) => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/blogs/${firebaseKey}.json`)
    .then((response) => resolve(response.data))
    .catch((error) => reject(error));
});

const createBlog = (blogObj) => new Promise((resolve, reject) => {
  axios.post(`${dbUrl}/blogs.json`, blogObj)
    .then((response) => {
      const payload = { firebaseKey: response.data.name };
      axios.patch(`${dbUrl}/blogs/${response.data.name}.json`, payload)
        .then(resolve);
    }).catch(reject);
});

const updateBlog = (blogObj) => new Promise((resolve, reject) => {
  axios.patch(`${dbUrl}/blogs/${blogObj.firebaseKey}.json`, blogObj)
    .then(resolve)
    .catch(reject);
});

export {
  getBlogs,
  createBlog,
  deleteBlog,
  getSingleBlog,
  updateBlog,
};
