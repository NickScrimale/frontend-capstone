/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from 'bootstrap';
import { getBlogs } from '../api/blogData';
import { useAuth } from '../utils/context/authContext';

export default function NavBar() {
  const [blogObject, setBlogObject] = useState();
  const [filteredBlog, setfFlteredBlog] = useState();
  const { user } = useAuth();

  const getUserBlogs = () => {
    getBlogs(user.uid).then((resopnse) => {
      setBlogObject(resopnse);
      setfFlteredBlog(resopnse);
    });
  };

  const handleClick = (e) => {
    const location = e.target.innerText;
    filteredBlog?.filter((blogObj) => blogObj.location === location);
    setBlogObject(filteredBlog);
  };
  blogObject();
  useEffect(() => {
    getUserBlogs();
  });
  return (
    <nav className="navbar navbar-expand-md navbar-dark bg-dark">
      <div className="container-fluid">
        <Link passHref href="/">
          <a className="navbar-brand" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo01">
            Pog Blog
          </a>
        </Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon" />
        </button>

        <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <Link passHref href="/">
                <a className="nav-link">
                  Home
                </a>
              </Link>
              <Link passHref href="/profile">
                <a className="nav-link">
                  Profile
                </a>
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <Button onClick={handleClick}>Link</Button>
          <Button onClick={handleClick}>Video</Button>
          <Button onClick={handleClick}>Song</Button>
        </div>
      </div>
    </nav>
  );
}
