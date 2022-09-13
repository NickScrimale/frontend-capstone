/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { getBlogs } from '../api/blogData';

export default function BtnFilter() {
  // eslint-disable-next-line no-unused-vars
  const [blogFilter, setBlogFilter] = useState(null);
  const [blogs, setBlogs] = useState([]);
  const [typeFilter, setTypeFilter] = useState([]);

  const getBlogTypes = () => {
    const types = [];
    blogs.map((blog) => (
      types.push(blog.type)
    ));
    setTypeFilter(types);
    // console.warn(types);
  };

  useEffect(() => {
    getBlogs().then(setBlogs).then(getBlogTypes());
  }, []);

  // eslint-disable-next-line consistent-return
  // const renderBlogs = () => {
  //   if (blogs.length) {
  //     return blogs.map((blog) => {
  //       console.warn(blog.blogType);
  //       console.warn(blogFilter);
  //       if (blogFilter === null) {
  //         return (
  //           <BlogCard
  //             key={blog.firebaseKey}
  //             blogObj={blog}
  //             onUpdate={getBlogs}
  //           />
  //         );
  //       }
  //       if (blog.blogType === blogFilter) {
  //         return (
  //           <BlogCard
  //             key={blog.firebaseKey}
  //             blogObj={blog}
  //             onUpdate={getBlogs}
  //           />
  //         );
  //       }
  //       return null;
  //     });
  //   }
  // };

  return (
    <>
      <div className="filterButtons">
        {
          typeFilter.length > 0
            ? typeFilter.map((tF) => (
              <button
                key={tF}
                type="button"
                className="btn btn-secondary filterButton"
                onClick={() => setBlogFilter(tF)}
              >
                {tF}
              </button>
            )) : ''
        }
        <button
          type="button"
          className="btn btn-secondary filterButton"
          style={{ 'background-color': '#84190B' }}
          onClick={() => setBlogFilter(null)}
        >
          All
        </button>
      </div>
    </>
  );
}
