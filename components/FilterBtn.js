/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { getBlogs } from '../api/blogData';
import BlogCard from './BlogCard';

export default function BtnFilter() {
  const [blogFilter, setBlogFilter] = useState(null);
  const [blogs, setBlogs] = useState([]);
  const { typesFilter, setTypeFilter } = useState([]);

  useEffect(() => {
    getBlogs().then(setBlogs);
  }, []);

  const getBlogTypes = () => {
    const types = [];
    blogs.forEach((blog) => {
      const blogCat = blog?.blogType;
      if (blogCat && !types.includes(blogCat)) {
        types.push(blogCat);
      }
    });
    setTypeFilter(types);
  };

  useEffect(() => {
    getBlogTypes();
  }, [blogs]);

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

  const renderFilter = () => {
    if (typesFilter.length > 0) {
      return typesFilter.map((typeFilter) => (
        <button
          key={typeFilter}
          type="button"
          className="btn btn-secondary filterButton"
          onClick={() => setBlogFilter(typeFilter)}
        >
          {typeFilter}
        </button>
      ));
    }
    return null;
  };
  return (
    <>
      <div className="filterButtons">
        {renderFilter()}
        <button
          type="button"
          className="btn btn-secondary filterButton"
          style={{ 'background-color': '#84190B' }}
          onClick={() => setBlogFilter(null)}
        >
          Clear
        </button>
      </div>
    </>
  );
}
