import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import theme from '../../assets/styles/theme';
import defaultImage from '../../assets/images/posterError.png';

const Details = styled.div`
    display:flex; 
    flex-direction: column;
    justify-content: center;
    align-items: center;
    @media (min-width: 1024px) {
        flex-direction: row;
        justify-content: flex-start;
        align-items: flex-start;

    }
`;

const StyledImage = styled.img`
    width: 100%;
    max-width: 342px;
    box-shadow: 0px 0px 10px 0px rgba(0,0,0,0.3);
    @media (min-width: 1024px) {
        width: 342px;
    }
`;

const Info = styled.div`
    @media (min-width: 1024px) {
        width: 100%;
        padding: 0 15px;
    }
`;

const TitleRatingContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-top: 15px;
    @media (min-width: 1024px) {
        margin: 0;
    }
`;

const MovieTitle = styled.h2`
    margin: 0 10px 0 0;
`;

const Rating = styled.span`
    font-size: ${theme.font.size.bigger};
    font-weight: ${theme.font.weight.bold};
    color: ${theme.green};
    display: flex;
    align-items: center;
    i {
        margin-right: 5px;
    }
`;

const ReleaseYear = styled.p`
    margin: 0;
    color: ${theme.gray};
    font-size: ${theme.font.size.big};
`;

const StyledGenres = styled.p`
    color: ${theme.green};
    font-size: ${theme.font.size.small};
    font-weight: ${theme.font.weight.bold};
    text-transform: uppercase;
    letter-spacing: 1.2px;
`; 

const OverviewTitle = styled.h4`
    margin: 0;
`;

const Overview = styled.p`
    margin-top: 5px;
    letter-spacing: 1.05px;
`;

class MovieDetails extends React.Component {
    defaultImageSrc(ev){
        ev.target.src = defaultImage;
    }
    render(){
        const { title, overview, vote_average, genres, release_date, poster_path } = this.props.details;
        let genresList, releaseYear, imageUrl;
        if(genres && release_date && poster_path){
                genresList = genres.map(genre => genre.name).reduce((acc,cur) => `${acc}, ${cur}`, ''); 
                genresList = genresList.substr(2);
                releaseYear = release_date.substr(0,4);
                imageUrl = `https://image.tmdb.org/t/p/w342/${poster_path}`;
        }
        return (
            <Details>
                {imageUrl ? 
                <StyledImage src={imageUrl} onError={this.defaultImageSrc} alt={title}/> 
                : <StyledImage src={defaultImage} alt={title}/> }
                <Info>
                    <TitleRatingContainer> 
                        <MovieTitle>{title}</MovieTitle> 
                        <Rating><i className="fas fa-star"></i> {vote_average}</Rating>
                    </TitleRatingContainer>
                    <ReleaseYear>{releaseYear}</ReleaseYear>
                    <StyledGenres>{genresList}</StyledGenres>
                    <OverviewTitle>Overview</OverviewTitle>
                    <Overview>{overview}</Overview>
                </Info>
            </Details>
        );
    }
}

MovieDetails.propTypes = {
    details: PropTypes.object.isRequired
}

export default MovieDetails;