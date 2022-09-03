import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { getSingleBlog } from '../../../api/blogData';
import BlogForm from '../../../components/forms/BlogForm';

export default function EditBlog() {
  const [editBlogs, setEditBlogs] = useState({});
  const router = useRouter();
  const { firebaseKey } = router.query;

  useEffect(() => {
    getSingleBlog(firebaseKey).then(setEditBlogs);
  }, [firebaseKey]);
  return (
    <BlogForm obj={editBlogs} />
  );
}
