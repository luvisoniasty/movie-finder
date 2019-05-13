import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchMovies, fetchMoviesByTitle } from '../../actions/movieActions';
import Filters from './Filters';

class MovieList extends React.Component {
    componentDidMount() {
        this.props.fetchMovies();
    }

    changePage = (newPage) => {
        const { type } = this.props.movieItems;
        const { year, rating, query } = this.props;

        if (type === 'byTitle')  
            this.props.fetchMoviesByTitle(query, newPage)
        else if (type === 'filtered')
            this.props.fetchMovies(newPage, 'filtered', rating.min, rating.max, year.min, year.max)
        else 
            this.props.fetchMovies(newPage);
    }

    render() {
        const { page, pages } = this.props.movieItems;
        const movieItems = this.props.movieItems.movies.map(movie => (
            <div key={movie.id}>
                <h2><Link to={"/movie/"+movie.id}>{movie.title}</Link></h2>
                <p>{movie.overview}</p>
            </div>
        ));
        return (
            <div>
                <h1>Filters</h1>
                <Filters/>
                <h1>Movie List</h1>
                {movieItems}
                {(page - 1 > 0) ? <button onClick={() => {this.changePage(page - 1)}}>Prev</button> : ''}
                {(page + 1 <= pages) ? <button onClick={() => {this.changePage(page + 1)}}>Next</button> : ''}
            </div>
        );
    }
}

MovieList.propTypes = {
    fetchMovies: PropTypes.func.isRequired,
    fetchMoviesByTitle: PropTypes.func.isRequired,
    movieItems: PropTypes.object.isRequired,
    year: PropTypes.object,
    rating: PropTypes.object,
    query: PropTypes.string
}

const mapStateToProps = state => ({
    movieItems: state.movies.movieItems,
    year: state.filters.year,
    rating: state.filters.rating,
    query: state.filters.query
});

export default connect(mapStateToProps, { fetchMovies, fetchMoviesByTitle })(MovieList);