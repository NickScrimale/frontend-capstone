import React from 'react';
import PropTypes from 'prop-types';
// import { getReply } from '../api/replyData';
import ReplyCard from './ReplyCard';

export default function ReplyContainer({ obj }) {
  // const [, setReplies] = useState({});
  // const getAllReplies = async () => {
  //   await getReply(obj.uid).then(setReplies);
  // };
  console.warn(obj);
  return (
    <>
      <div className="d-flex flex-wrap">
        <ReplyCard key={obj.firebaseKey} replyObj={obj} />
      </div>
    </>
  );
}

ReplyContainer.propTypes = {
  obj: PropTypes.shape({
    firebaseKey: PropTypes.string,
    txt: PropTypes.string,
    uid: PropTypes.string,
  }).isRequired,
};
