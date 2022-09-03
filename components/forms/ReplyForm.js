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

const ReplyForm = ({ object }) => {
  // eslint-disable-next-line no-console
  console.log('obj value ===', object);
  const [formInput, setFormInput] = useState(initialState);
  const [replies, setReplies] = useState([]);
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    if (object.firebaseKey) {
      setFormInput(object);
      if (object && object?.reply && object?.reply.length) {
        setReplies(object.reply);
      }
    }
  }, [object]);

  const handleChange = (e) => {
    const { value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      reply: replies.concat([value]),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (object.firebaseKey) {
      // eslint-disable-next-line no-console
      console.log('form value ===', formInput, replies);
      updateReply(formInput)
        .then(() => router.push(`/reply/${object.firebaseKey}`));
    } else {
      const payload = { ...formInput, uid: user.uid };
      createReply(payload).then(() => {
        router.push('/');
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
  object: PropTypes.shape({
    txt: PropTypes.string,
    firebaseKey: PropTypes.string,
    reply: PropTypes.arrayOf(PropTypes.string),
    uid: PropTypes.string,
  }),
};

ReplyForm.defaultProps = {
  object: initialState,
};

export default ReplyForm;
