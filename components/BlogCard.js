import { Card } from 'react-bootstrap';
import Link from 'next/link';
import Button from 'react-bootstrap/Button';
import PropTypes from 'prop-types';
import { deleteBlog } from '../api/blogData';
import { useAuth } from '../utils/context/authContext';

function BlogCard({ blogObj, onUpdate }) {
  const { user } = useAuth();

  const deleteThisBlog = () => {
    if (window.confirm(`Delete ${blogObj.firebaseKey}?`)) {
      deleteBlog(blogObj.firebaseKey).then(() => onUpdate());
    }
  };
  return (
    <Card style={{ width: '18rem', margin: '10px' }}>
      <Card.Header>{user.displayName}</Card.Header>
      <Card.Body>
        <Card.Title>{blogObj.title}</Card.Title>
        <Card.Text>{blogObj.txt}</Card.Text>
        <Link href={`/blogs/${blogObj.firebaseKey}`} passHref>
          <Button variant="primary" className="m-2">VIEW</Button>
        </Link>
        <Link href={`/blogs/edit/${blogObj.firebaseKey}`} passHref>
          <Button variant="info">EDIT</Button>
        </Link>
        <Button variant="danger" onClick={deleteThisBlog} className="m-2">
          DELETE
        </Button>
      </Card.Body>
    </Card>
  );
}

BlogCard.propTypes = {
  blogObj: PropTypes.shape({
    firebaseKey: PropTypes.string,
    title: PropTypes.string,
    txt: PropTypes.string,
    link: PropTypes.string,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};
export default BlogCard;
