import React from 'react';
import Proptypes from 'prop-types';

function Movies({ id, year, title, summary, poster }) {
  return <div></div>
}

Movies.protoType = {
  id: Proptypes.number.isRequired,
  year: Proptypes.number.isRequired,
  title: Proptypes.string.isRequired,
  summary: Proptypes.string.isRequired,
  poster: Proptypes.string.isRequired
}

export default Movies;