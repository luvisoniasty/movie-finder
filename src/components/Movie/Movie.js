import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchMovieDetails } from '../../actions/movieActions';
import styled from 'styled-components';
import MovieDetails from './MovieDetails';
import MovieBox from '../MovieList/MovieBox';

const StyledList = styled.ul`
    padding: 0;
    margin: 0;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    @media (min-width: 1024px) {
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: space-between;
        align-items: flex-start;
    }
`;

class Movie extends React.Component {
    componentDidMount() {
        this.props.fetchMovieDetails(this.props.match.params.id);
    }

    componentDidUpdate(prevProps) {
        if(prevProps.match.params.id !== this.props.match.params.id) {
            this.props.fetchMovieDetails(this.props.match.params.id);
            window.scrollTo(0, 0);
        }
    }

    render() {
        const similarMovies = this.props.movie.similar.map(movie => <MovieBox key={movie.id} movie={movie} inRow={5}/>);
        const { details } = this.props.movie;
        return (
            <div>
                <MovieDetails details={details} />
                {similarMovies.length ? 
                <>
                    <h3>Similar movies</h3>
                    <StyledList>
                        {similarMovies}
                    </StyledList>
                </> : '' }
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