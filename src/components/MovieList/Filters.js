import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { filterYears, filterRating } from '../../actions/filtersActions';
import { fetchMovies } from '../../actions/movieActions';
import InputRange from 'react-input-range';
import 'react-input-range/lib/css/index.css';

class Filters extends React.Component {
    filterMovies = () => {
        const { year, rating } = this.props;
        this.props.fetchMovies(1, 'filtered' ,rating.min, rating.max, year.min, year.max);
    }

    render() {
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

                <button type="button" onClick={this.filterMovies}>
                    Search
                </button>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    filterYears: PropTypes.func.isRequired,
    filterRating: PropTypes.func.isRequired,
    fetchMovies: PropTypes.func.isRequired,
    year: state.filters.year,
    rating: state.filters.rating
});

Filters.propTypes = {
    year: PropTypes.object.isRequired,
    rating: PropTypes.object.isRequired
}

export default connect(mapStateToProps, { filterYears, filterRating, fetchMovies })(Filters);