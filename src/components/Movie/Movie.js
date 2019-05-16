import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchMovieDetails } from '../../actions/movieActions';
import styled from 'styled-components';
import theme from '../../assets/styles/theme';
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

const MovieDetails = styled.div`
    display:flex; 
    flex-direction: column;
    justify-content: center;
    @media (min-width: 1024px) {
        flex-direction: row;
    }
`;

const StyledImage = styled.img`
    width: 100%;
    box-shadow: 0px 0px 10px 0px rgba(0,0,0,0.3);
    @media (min-width: 1024px) {
        width: 342px
    }
`;

const Info = styled.div`
    @media (min-width: 1024px) {
        padding: 0 15px;
    }
`;

const TitleRatingContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 15px;
    @media (min-width: 1024px) {
        margin: 0;
    }
`;

const MovieTitle = styled.h2`
    margin: 0;
`;

const Rating = styled.span`
    font-size: ${theme.font.size.bigger};
    font-weight: ${theme.font.weight.bold};
    color: ${theme.green};
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
        console.log(this.props.movie.details);
        const similarMovies = this.props.movie.similar.map(movie => <MovieBox key={movie.id} movie={movie} inRow={5}/>);
        const { title, overview, vote_average, genres, release_date, poster_path } = this.props.movie.details;
        let genresList, releaseYear, imageUrl;
        if(genres && release_date && poster_path){
            genresList = genres.map(genre => genre.name).reduce((acc,cur) => `${acc}, ${cur}`);
            releaseYear = release_date.substr(0,4);
            imageUrl = `https://image.tmdb.org/t/p/w342/${poster_path}`;
        }

        return (
            <div>
                <MovieDetails>
                    <StyledImage src={imageUrl} alt={title}/>
                    <Info>
                        <TitleRatingContainer> 
                            <MovieTitle>{title}</MovieTitle> 
                            <Rating><i className="fas fa-star"></i> {vote_average}</Rating>
                        </TitleRatingContainer>
                        <p>{releaseYear}</p>
                        <p>{genresList}</p>
                        <p>{overview}</p>
                    </Info>
                </MovieDetails>
                <h3>Similar movies</h3>
                <StyledList>
                    {similarMovies}
                </StyledList>
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