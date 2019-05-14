import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchGenres, filterYears, filterRating, toggleGenre, checkAllGenres, uncheckAllGenres } from '../../actions/filtersActions';
import { fetchMovies } from '../../actions/movieActions';
import InputRange from 'react-input-range';
import 'react-input-range/lib/css/index.css';

class Filters extends React.Component {
    componentDidMount() {
        this.props.fetchGenres();
    }

    filterMovies = () => {
        const { year, rating, genres } = this.props;
        const withoutGenres = genres.filter(g => g.checked === false).map(genre => genre.id).reduce((acc, cur) => `${acc},${cur}`, '');
        this.props.fetchMovies(1, 'filtered' ,rating.min, rating.max, year.min, year.max, withoutGenres);
    }

    render() {
        const genres = this.props.genres.map(genre => <button key={genre.id} onClick={() => this.props.toggleGenre(genre.id)}>{genre.name}</button>)
        return (
            <div>
                <label htmlFor="yearRangeSlider">Year</label>
                <InputRange
                name="yearRangeSlider"
                minValue={1970}
                maxValue={new Date().getFullYear()}
                value={this.props.year}
                onChange={year => this.props.filterYears(year)} />

                <label htmlFor="ratingRangeSlider">Rating</label>
                <InputRange
                name="yearRangratingRangeSlidereSlider"
                minValue={0}
                maxValue={10}
                value={this.props.rating}
                onChange={rating => this.props.filterRating(rating)} />

                <h3>Genres</h3>
                <button onClick={this.props.checkAllGenres}>Check all</button>
                <button onClick={this.props.uncheckAllGenres}>Uncheck all</button>
                {genres}

                <button type="button" onClick={this.filterMovies}>
                    Search
                </button>
            </div>
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