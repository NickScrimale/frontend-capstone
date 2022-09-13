import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import { useAuth } from '../../utils/context/authContext';
import { createReply, updateReply } from '../../api/replyData';

const initialState = {
  txt: '',
};

const ReplyForm = ({ object, blogFbKey }) => {
  // eslint-disable-next-line no-console
  // console.log('obj value ===', object);
  const [formInput, setFormInput] = useState(initialState);
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    if (object.firebaseKey) {
      setFormInput(object);
    }
  }, [object]);

  const handleChange = (e) => {
    const { value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      reply: (value),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (object.firebaseKey) {
      updateReply(formInput)
        .then(() => router.push(`/reply/${object.firebaseKey}`));
    } else {
      const payload = { ...formInput, uid: user.uid, blog_id: blogFbKey };
      createReply(payload).then(() => {
        router.push(`/reply/${blogFbKey}`);
      });
    }
  };

  return (
    <Form onSubmit={handleSubmit} className="reply-grid">
      <h4 className="reply-form">{object.firebaseKey ? 'Enter' : 'Enter'} Reply</h4>
      <FloatingLabel controlId="floatingInput1" label="Your Reply" className="mb-3">
        <Form.Control type="text" placeholder="Enter Your Reply" name="reply" value={formInput.name} onChange={handleChange} required />
      </FloatingLabel>
      <div className="reply-grid">
        <Button type="submit">{object.firebaseKey ? 'Add' : 'Add'} Reply</Button>
      </div>
    </Form>
  );
};

ReplyForm.propTypes = {
  blogFbKey: PropTypes.string.isRequired,
  object: PropTypes.shape({
    txt: PropTypes.string,
    firebaseKey: PropTypes.string,
    reply: PropTypes.string,
    uid: PropTypes.string,
  }),
};

ReplyForm.defaultProps = {
  object: initialState,
};

export default ReplyForm;
