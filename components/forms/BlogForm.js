/* eslint-disable react-hooks/rules-of-hooks */
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';
import PropTypes from 'prop-types';
import { FloatingLabel, Button } from 'react-bootstrap';

import { createBlog, updateBlog } from '../../api/blogData';
import { useAuth } from '../../utils/context/authContext';

const initialState = {
  title: '',
  link: '',
  txt: '',
  type: '',
};

function BlogForm({ obj }) {
  const [formInput, setFormInput] = useState(initialState);
  const router = useRouter();
  const { user } = useAuth();
  useEffect(() => {
    if (obj.firebaseKey) setFormInput(obj);
  }, [obj, user]);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (obj.firebaseKey) {
      updateBlog(formInput)
        .then(() => router.push('/'));
    } else {
      const payload = { ...formInput, uid: user.uid };
      createBlog(payload).then(() => {
        router.push('/');
      });
    }
  };
  return (
    <Form onSubmit={handleSubmit}>
      <h2 className="text-white mt-5">{obj.firebaseKey ? 'Update' : 'Create'} Blog</h2>
      <FloatingLabel controlId="floatingInput1" label="Title" className="mb-3">
        <Form.Control type="text" placeholder="Enter Title" name="title" value={formInput.title} onChange={handleChange} required />
      </FloatingLabel>
      <FloatingLabel controlId="floatingInput2" label="Link" className="mb-3">
        <Form.Control type="url" placeholder="Enter a url" name="link" value={formInput.link} onChange={handleChange} required />
      </FloatingLabel>
      <FloatingLabel controlId="floatingInput2" label="Text" className="mb-3">
        <Form.Control type="text" placeholder="Say Something..." name="txt" value={formInput.txt} onChange={handleChange} required />
      </FloatingLabel>
      <FloatingLabel>
        <Form.Select name="type" value={formInput.type} onChange={handleChange} required>
          <option value="url">Link</option>
          <option value="video">Video</option>
          <option value="song">song</option>
        </Form.Select>
      </FloatingLabel>

      <Button type="submit">{obj.firebaseKey ? 'Update' : 'Create'} Blog</Button>
    </Form>
  );
}

BlogForm.propTypes = {
  obj: PropTypes.shape({
    title: PropTypes.string,
    link: PropTypes.string,
    txt: PropTypes.string,
    type: PropTypes.string,
    firebaseKey: PropTypes.string,
  }),
};

BlogForm.defaultProps = {
  obj: initialState,
};
export default BlogForm;
