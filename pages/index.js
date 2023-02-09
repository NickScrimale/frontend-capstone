import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { getBlogs } from '../api/blogData';
import BlogCard from '../components/BlogCard';
import BtnFilter from '../components/FilterBtn';
// import { useAuth } from '../utils/context/authContext';

function Home() {
  const [filteredResults, setFilteredResults] = useState([]);
  const [blogs, setBlogs] = useState([]);
  // const { user } = useAuth();
  const getAllTheBlogs = () => {
    getBlogs().then((data) => {
      setBlogs(data);
      setFilteredResults(data);
    });
  };
  useEffect(() => {
    getAllTheBlogs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const filterBlogs = (typeValue) => {
    // filter on blogs based on typeValue
    if (typeValue !== 'All') {
      const filteredData = blogs.filter((blog) => blog.type === typeValue);
      setFilteredResults(filteredData);
    } else { setFilteredResults(blogs); }
  };

  return (
    <div className="text-center my-4">
      <title>Pog Blog</title>
      <Link href="/blogs/new" passHref>
        <Button variant="info">Post A Blog</Button>
      </Link>
      <BtnFilter filterBlogs={filterBlogs} blogs={blogs} />
      <div className="d-flex flex-wrap justify-content-center">
        {filteredResults.map((blog) => (
          <BlogCard key={blog.firebaseKey} blogObj={blog} onUpdate={getAllTheBlogs} />
        ))}
      </div>
    </div>
  );
}
// const [blogObject, setBlogObject] = useState();
// const [filteredBlog, setfFlteredBlog] = useState();
// const { user } = useAuth();

export default Home;
