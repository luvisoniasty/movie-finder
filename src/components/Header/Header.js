import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { filterQuery } from '../../actions/filtersActions';
import { fetchMovies, fetchMoviesByTitle } from '../../actions/movieActions';
import styled from 'styled-components';
import theme from '../../assets/styles/theme';

const Navbar = styled.div`
    background: ${theme.darkblue};
    padding: 15px;
    height: 95px;
    z-index: 1;
    @media (min-width: 1024px) {
        height: 80px;
    }
`;

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    align-content: center;
    margin: 0 auto;
    height: 100%;
    @media (min-width: 1024px) {
        flex-direction: row;
        justify-content: space-between;
        max-width: 1024px;
    }    
`;

const StyledLink = styled(Link)`
    text-decoration: none;
    text-transform: uppercase;
    font-weight: ${theme.font.weight.bold};
    font-size: ${theme.font.size.bigger};
    color: ${theme.white};
    margin-bottom: 5px;
    margin-top: 0;
    :before {
        content: '-';
        color: ${theme.green};
        font-size: ${theme.font.size.extrabig};
        line-height: 5px;
    }
    :after {
        content: '.';
        color: ${theme.green};
        font-size: ${theme.font.size.extrabig}
        line-height: 5px;
    }
    @media (min-width: 1024px) {
        margin: 0;
    }
`;

const SearchBox = styled.div`
    color: ${theme.green};
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`;

const SearchInput = styled.input`
    background: ${theme.darkblue};
    color: ${theme.gray};
    border: 2px solid ${theme.darkblue};
    font-size: ${theme.font.size.normal};
    font-family ${theme.font.family.montserrat};
    font-style: italic;
    text-align: center;
    padding: 5px;
    margin-left: 3px;
    ::placeholder {
        color: ${theme.gray};
        opacity: .5;
    }
    :focus, :active {
        outline: none;
        border-bottom: 2px solid ${theme.green};
    }
`;

class Header extends React.Component {
    searchByTitle = (e) => {
        const query = e.target.value;
        this.props.filterQuery(query);
        query ? this.props.fetchMoviesByTitle(query) : this.props.fetchMovies()
    }

    render() {
        return (
            <Navbar>
                <Wrapper>
                    <StyledLink to="/">movfinder</StyledLink>
                    <SearchBox>
                        <i className="fas fa-search"></i>
                        <SearchInput type="text" placeholder="Search movies by title here..." onChange={this.searchByTitle}/>
                    </SearchBox>
                </Wrapper>
            </Navbar>
        );
    }
};

Header.propTypes = {
    filterQuery: PropTypes.func.isRequired,
    fetchMoviesByTitle: PropTypes.func.isRequired,
    fetchMovies: PropTypes.func.isRequired,
    query: PropTypes.string.isRequired
}

const mapStateToProps = state => ({
    query: state.filters.query,
});

export default connect(mapStateToProps, { filterQuery, fetchMovies, fetchMoviesByTitle })(Header);