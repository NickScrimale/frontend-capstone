import { getSingleBlog } from './blogData';
import { getSingleReply } from './replyData';

const viewBlogDetails = (blogFirebaseKey) => new Promise((resolve, reject) => {
  getSingleBlog(blogFirebaseKey)
    .then((blogObject) => {
      getSingleReply(blogObject.uid)
        .then((replyObject) => {
          resolve({ replyObject, ...blogObject });
        });
    }).catch((error) => reject(error));
});

export default viewBlogDetails;
