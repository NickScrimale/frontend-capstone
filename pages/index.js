import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { getBlogs } from '../api/blogData';
import BlogCard from '../components/BlogCard';
import { useAuth } from '../utils/context/authContext';

function Home() {
  const [blogs, setBlogs] = useState([]);
  const { user } = useAuth();
  const getAllTheBlogs = () => {
    getBlogs(user.uid).then(setBlogs);
  };
  useEffect(() => {
    getAllTheBlogs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="text-center my-4">
      <Link href="/blogs/new" passHref>
        <Button variant="info">Post A Blog</Button>
      </Link>
      <div className="d-flex flex-wrap justify-content-center">
        {blogs.map((blog) => (
          <BlogCard key={blog.firebaseKey} blogObj={blog} onUpdate={getAllTheBlogs} />
        ))}
      </div>
    </div>
  );
}
// const [blogObject, setBlogObject] = useState();
// const [filteredBlog, setfFlteredBlog] = useState();
// const { user } = useAuth();

// const getUserBlogs = () => {
//   getBlogs(user.uid).then((resopnse) => {
//     setBlogObject(resopnse);
//     setfFlteredBlog(resopnse);
//   });
// };

// const handleClick = (e) => {
//   const location = e.target.innerText;
//   filteredBlog?.filter((blogObj) => blogObj.location === location);
//   setBlogObject(filteredBlog);
// };

// useEffect(() => {
//   getUserBlogs();
// });

export default Home;
