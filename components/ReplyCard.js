import React from 'react';
import PropTypes from 'prop-types';
import { Card } from 'react-bootstrap';

export default function ReplyCard({ replyObj }) {
  return (
    <div>
      <Card style={{ width: '18rem', margin: '5px' }}>
        {/* <Card.Header>{User.displayName}</Card.Header> */}
        <Card.Body>
          <div>{replyObj.reply}</div>
        </Card.Body>
      </Card>
    </div>
  );
}
ReplyCard.propTypes = {
  replyObj: PropTypes.shape({
    reply: PropTypes.string,
    firebaseKey: PropTypes.string,
    txt: PropTypes.string,
    uid: PropTypes.string,
  }).isRequired,
};
