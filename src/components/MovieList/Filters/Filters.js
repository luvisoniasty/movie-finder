import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchGenres, filterYears, filterRating, toggleGenre, checkAllGenres, uncheckAllGenres } from '../../../actions/filtersActions';
import { fetchMovies } from '../../../actions/movieActions';
import styled from 'styled-components';
import theme from '../../../assets/styles/theme';
import Button from '../../Button/Button';
import GenreButton from './GenreButton';
import RangeSlider from './RangeSlider';

const FiltersContainer = styled.div`
    display: ${props => props.hidden ? 'none' : 'block'};
    @media (min-width: 1024px) {
        display: block;
        width: 285px;
        padding-right: 15px;
    }
`;

const FiltersHeader = styled.div`
    display: flex;
    justify-content: flex-end;
`;

const CloseFilters = styled(Button)`
    border: none;
    font-size: ${theme.font.size.bigger};
    padding: 0;
    display: flex;
    align-self: flex-end;
    @media (min-width: 1024px) {
        display: none;
    }
`;

const FilterTypeHeader = styled.h4`
    margin: 5px 0;
`;

const GenreHeader = styled.div`
    display: flex;
    justify-content: space-between;    
`;

const CheckAllContainer = styled.div`
    display: flex;
    align-content: center;
    align-items: center;
`;

const Slash = styled.span`
    padding: 0 8px;
`;

const CheckButton = styled(Button)`
    border: none;
    padding: 8px 0;
`;

const StyledSearchButton = styled(Button)`
    border: none;
    background: ${theme.green};
    color: ${theme.darkblue};
    width: 100%;
    margin: 15px 0;
`;

const GenreContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
`;

class Filters extends React.Component {
    componentDidMount() {
        this.props.fetchGenres();
    }

    filterMovies = () => {
        const { year, rating, genres } = this.props;
        const withoutGenres = genres.filter(g => g.checked === false).map(genre => genre.id).reduce((acc, cur) => `${acc},${cur}`, '');
        this.props.fetchMovies(1, 'filtered' ,rating.min, rating.max, year.min, year.max, withoutGenres);
        this.props.toggleFilters();
    }

    render() {
        const genres = this.props.genres.map(genre => 
            <GenreButton key={genre.id} checked={genre.checked} onClick={() => {this.props.toggleGenre(genre.id)}}>{genre.name}</GenreButton>
        );
        const { hidden, toggleFilters } = this.props;
        return (
            <FiltersContainer hidden={hidden}>
                <FiltersHeader>
                    <CloseFilters onClick={toggleFilters}><i className="fas fa-window-close"></i></CloseFilters> 
                </FiltersHeader>

                <FilterTypeHeader>Release year</FilterTypeHeader>
                <RangeSlider
                minValue={1970}
                maxValue={new Date().getFullYear()}
                value={this.props.year}
                onChange={year => this.props.filterYears(year)} />

                <FilterTypeHeader>Rating</FilterTypeHeader>
                <RangeSlider
                minValue={0}
                maxValue={10}
                value={this.props.rating}
                onChange={rating => this.props.filterRating(rating)} />
                
                <GenreHeader>
                    <FilterTypeHeader>Genres</FilterTypeHeader>
                    <CheckAllContainer>
                        <CheckButton onClick={this.props.checkAllGenres}>Select all</CheckButton>
                        <Slash>/</Slash>
                        <CheckButton onClick={this.props.uncheckAllGenres}>Unselect all</CheckButton>
                    </CheckAllContainer>
                </GenreHeader>

                <GenreContainer>
                    {genres}
                </GenreContainer>

                <StyledSearchButton type="button" onClick={this.filterMovies}>
                    Search
                </StyledSearchButton>
            </FiltersContainer>
        );
    }
}

Filters.propTypes = {
    fetchGenres: PropTypes.func.isRequired,
    filterYears: PropTypes.func.isRequired,
    filterRating: PropTypes.func.isRequired,
    toggleGenre: PropTypes.func.isRequired,
    checkAllGenres: PropTypes.func.isRequired,
    uncheckAllGenres: PropTypes.func.isRequired,
    fetchMovies: PropTypes.func.isRequired,
    genres: PropTypes.array.isRequired,
    year: PropTypes.object.isRequired,
    rating: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    genres: state.filters.genreItems,
    year: state.filters.year,
    rating: state.filters.rating
});

export default connect(mapStateToProps, { fetchGenres, filterYears, filterRating, toggleGenre, checkAllGenres, uncheckAllGenres, fetchMovies })(Filters);