import React from 'react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchMovieDetails } from '../../actions/movieActions';

class Movie extends React.Component {
    componentDidMount() {
        this.props.fetchMovieDetails(this.props.match.params.id);
    }

    componentDidUpdate(prevProps) {
        if(prevProps.match.params.id !== this.props.match.params.id) {
            this.props.fetchMovieDetails(this.props.match.params.id);
        }
    }

    render() {
        const similarMovies = this.props.movie.similar.map(movie => (
            <div key={movie.id}>
                <h2><Link to={"/movie/"+movie.id}>{movie.title}</Link></h2>
                <p>{movie.overview}</p>
            </div>
        ));
        const { details } = this.props.movie;
        return (
            <div>
                <div key={details.id}>
                    <h2>{details.title}</h2>
                    <p>{details.overview}</p>
                </div>
                <h1>Similar movies</h1>
                {similarMovies}
            </div>
        );
    }
}

Movie.propTypes = {
    fetchMovieDetails: PropTypes.func.isRequired,
    movie: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    movie: state.movies.movieItem
});

export default connect(mapStateToProps, { fetchMovieDetails })(withRouter(Movie));