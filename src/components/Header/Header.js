import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { filterQuery } from '../../actions/filtersActions';
import { fetchMovies, fetchMoviesByTitle } from '../../actions/movieActions';

class Header extends React.Component {
    searchByTitle = (e) => {
        const query = e.target.value;
        this.props.filterQuery(query);
        query ? this.props.fetchMoviesByTitle(query) : this.props.fetchMovies()
    }

    render() {
        return (
            <div>
                <Link to="/">movie.finder</Link>
                <input type="text" onChange={this.searchByTitle}/>
            </div>
        );
    }
};

const mapStateToProps = state => ({
    filterQuery: PropTypes.func.isRequired,
    fetchMoviesByTitle: PropTypes.func.isRequired,
    fetchMovies: PropTypes.func.isRequired,
    query: state.filters.query,
});

Header.propTypes = {
    query: PropTypes.string.isRequired
}

export default connect(mapStateToProps, { filterQuery, fetchMovies, fetchMoviesByTitle })(Header);