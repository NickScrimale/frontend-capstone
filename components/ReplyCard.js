import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Card } from 'react-bootstrap';
import { getReply } from '../api/replyData';

export default function ReplyCard({ replyObj }) {
  const [viewReply, setViewReply] = useState({});
  const { firebaseKey } = replyObj;

  // make a call to the API to get the author data
  useEffect(() => {
    getReply(firebaseKey).then(setViewReply);
  }, [firebaseKey]);

  // getAnswersForTheQuestion(answerObj.firebaseKey);

  return (
    <div>
      {viewReply && viewReply.reply && viewReply.reply.map((reply, idx) => (
        // eslint-disable-next-line react/no-array-index-key
        <Card key={idx} style={{ width: '18rem', margin: '5px' }}>
          <Card.Body>
            <div>{reply}</div>
          </Card.Body>
        </Card>
      ))}
    </div>
  );
}

ReplyCard.propTypes = {
  replyObj: PropTypes.shape({
    txt: PropTypes.string,
    firebaseKey: PropTypes.string,
    uid: PropTypes.string,
  }).isRequired,
};
