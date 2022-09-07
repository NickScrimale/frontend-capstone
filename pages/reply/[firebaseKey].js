import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { getReply } from '../../api/replyData';
import ReplyContainer from '../../components/ReplyContainer';

export default function ViewReply() {
  const router = useRouter();
  const { firebaseKey } = router.query;
  const [viewReplies, setViewReplies] = useState({});

  useEffect(() => {
    getReply(firebaseKey).then(setViewReplies);
  }, [firebaseKey]);

  return (
    <ReplyContainer obj={viewReplies} />
  );
}
