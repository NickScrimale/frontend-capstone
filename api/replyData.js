import axios from 'axios';
import { clientCredentials } from '../utils/client';

const dbUrl = clientCredentials.databaseURL;

const getReply = (firebaseKey) => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/replies/${firebaseKey}.json`)
    .then((response) => {
      // eslint-disable-next-line no-console
      console.log('data ===', response.data);
      resolve(response.data);
    })
    .catch((error) => reject(error));
});

const deleteReply = (firebaseKey) => new Promise((resolve, reject) => {
  axios.delete(`${dbUrl}/replies/${firebaseKey}.json`)
    .then(() => resolve('deleted'))
    .catch((error) => reject(error));
});

const getReplyForBlog = (blogFirebaseKey) => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/blogs.json?orderBy="uid"&equalTo="${blogFirebaseKey}"`)
    .then((response) => resolve(Object.values(response.data)))
    .catch((error) => reject(error));
});

const getSingleReply = (firebaseKey) => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/replies/${firebaseKey}.json`)
    .then((response) => resolve(response.data))
    .catch((error) => reject(error));
});

const createReply = (replyObj) => new Promise((resolve, reject) => {
  axios.post(`${dbUrl}/replies.json`, replyObj)
    .then((response) => {
      const payload = { firebaseKey: response.data.name };
      axios.patch(`${dbUrl}/replies/${response.data.name}.json`, payload)
        .then(resolve);
    }).catch(reject);
});

const updateReply = (replyObj) => new Promise((resolve, reject) => {
  axios.patch(`${dbUrl}/replies/${replyObj.firebaseKey}.json`, replyObj)
    .then(resolve)
    .catch(reject);
});

export {
  getReplyForBlog,
  getReply,
  deleteReply,
  getSingleReply,
  updateReply,
  createReply,
};
