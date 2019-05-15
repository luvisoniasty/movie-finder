import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import theme from '../../assets/styles/theme';

const StyledElement = styled.li`
    list-style: none;
    width: 100%;
    margin-bottom: 20px;
    max-width: 384px;
    position: relative;
    ::after {
        content: '${props => props.rating}';
        position: absolute;
        top: 20px;
        right: 0;
        background: ${theme.green};
        color: ${theme.darkblue};
        font-size: ${theme.font.size.big};
        font-weight: ${theme.font.weight.bold};
        padding: 8px 16px;
        border-top-left-radius: 2px;
        border-bottom-left-radius: 2px;
        @media (min-width: 1024px) {
            font-size: ${theme.font.size.normal};
            padding: 6px 12px;
        }
    }
    @media (min-width: 1024px) {
        width: 23%;
    }
`;

const StyledImage = styled.img`
    width: 100%;
    box-shadow: 0px 0px 10px 0px rgba(0,0,0,0.3);
`;

const StyledYear = styled.p`
    margin: 10px 0 5px 0;
`;

const StyledTitleLink = styled(Link)`
    color: ${theme.white};
    margin: 0;
    font-weight: ${theme.font.weight.bold};
    font-size: ${theme.font.size.normal};
    text-decoration: none;
`;


class MovieBox extends React.Component {
    render() {
    const { id, title, vote_average, release_date, poster_path } = this.props.movie;
    const imageUrl = `https://image.tmdb.org/t/p/w342/${poster_path}`;
    const releaseYear = release_date.substr(0,4);
        return (
            <StyledElement key={id} rating={vote_average}>
                <Link to={"/movie/"+id}><StyledImage src={imageUrl} alt={title}/></Link>
                <StyledYear>{releaseYear}</StyledYear>
                <StyledTitleLink to={"/movie/"+id}>{title}</StyledTitleLink>
            </StyledElement>
        );
    }
}

MovieBox.propTypes = {
    movie: PropTypes.object.isRequired,
}


export default MovieBox;