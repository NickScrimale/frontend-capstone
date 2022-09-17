/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

export default function BtnFilter({ filterBlogs, blogs }) {
  const [typeFilter, setTypeFilter] = useState([]);

  const getBlogTypes = () => {
    const types = blogs.map((blog) => blog.type);
    const noDupes = [...new Set(types)];
    setTypeFilter(noDupes);
  };

  useEffect(() => {
    getBlogTypes();
  }, [blogs]);

  return (
    <>
      <div className="filterButtons">
        {
          typeFilter.length > 0
            ? typeFilter.map((tF) => (
              <button
                key={tF}
                type="button"
                className="btn btn-secondary filterButton"
                onClick={() => filterBlogs(tF)}
              >
                {tF}
              </button>
            )) : ''
        }
        <button
          type="button"
          className="btn btn-secondary filterButton"
          style={{ backgroundColor: '#84190B' }}
          onClick={() => filterBlogs('All')}
        >
          All
        </button>
      </div>
    </>
  );
}

BtnFilter.propTypes = {
  blogs: PropTypes.arrayOf(PropTypes.shape({
    firebaseKey: PropTypes.string,
    title: PropTypes.string,
    txt: PropTypes.string,
    link: PropTypes.string,
    type: PropTypes.string,
  })).isRequired,
  filterBlogs: PropTypes.func.isRequired,
};
