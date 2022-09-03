import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import viewBlogDetails from '../../api/mergedData';
import ReplyForm from '../../components/forms/ReplyForm';

export default function ViewBlog() {
  const [blogDetails, setBlogDetails] = useState({});
  const router = useRouter();

  const { firebaseKey } = router.query;

  useEffect(() => {
    viewBlogDetails(firebaseKey).then(setBlogDetails);
  }, [firebaseKey]);
  return (
    <>
      <div className="mt-5 d-flex flex-wrap">
        <div className="text-white ms-5 details">
          <h5>
            {blogDetails.title}
          </h5>
          <a href={`${blogDetails.link}`}>{blogDetails.txt}</a>
          <hr />
        </div>
      </div>
      <ReplyForm obj={ViewBlog} />
    </>

  );
}
