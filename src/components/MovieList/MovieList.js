import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchMovies } from '../../actions/movieActions';

class MovieList extends React.Component {
    componentDidMount() {
        this.props.fetchMovies();
    }
    render() {
        const movieItems = this.props.movies.map(movie => (
            <div key={movie.id}>
                <h2><Link to={"/movie/"+movie.id}>{movie.title}</Link></h2>
                <p>{movie.overview}</p>
            </div>
        ));
        return (
            <div>
                <h1>Movie List</h1>
                {movieItems}
            </div>
        );
    }
}

MovieList.propTypes = {
    fetchMovies: PropTypes.func.isRequired,
    movies: PropTypes.array.isRequired

}

const mapStateToProps = state => ({
    movies: state.movies.movieItems
});

export default connect(mapStateToProps, { fetchMovies })(MovieList);