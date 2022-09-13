import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { getReplyForBlog } from '../../api/replyData';
import ReplyContainer from '../../components/ReplyContainer';

export default function ViewReply() {
  const router = useRouter();
  const { firebaseKey } = router.query;
  const [viewReplies, setViewReplies] = useState([]);

  useEffect(() => {
    getReplyForBlog(firebaseKey).then(setViewReplies);
  }, [firebaseKey]);

  return (
    <>
      {viewReplies.map((oneReply) => <ReplyContainer obj={oneReply} />)}
    </>
  );
}
