import React from 'react';
import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchMovies, fetchMoviesByTitle } from '../../actions/movieActions';
import Filters from './Filters/Filters';
import styled from 'styled-components';
import theme from '../../assets/styles/theme';
import MovieBox from './MovieBox';
import Button from '../Button/Button';

const FiltersContainer = styled.div`
    padding-bottom: 15px;
`;

const FiltersButton = styled(Button)`
    display: ${props => props.hidden ? 'block' : 'none'};
    width: 50%;
    margin: 0 auto;
    font-weight: ${theme.font.weight.bold};
    letter-spacing: .6px;
    font-size: ${theme.font.size.normal};
    padding: 0 0 5px 0;
    border: none;
    border-bottom: 2px solid ${theme.green};
    @media (min-width: 1024px) {
        display: none;
    }
`;

const Container = styled.div`
    display:flex;
    flex-direction: column;
    width: 100%;
    @media (min-width: 1024px) {
        flex-direction: row;
        justify-content: space-between;
    }
`;

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
        justify-content: space-between;;
        align-items: flex-start;
    }
`;

const PageButtons = styled.div`
    display: flex;
    justify-content: flex-end;
    padding-bottom: 15px;
`;

const PageButton = styled(Button)`
    background: ${theme.green};
    border: 1px solid ${theme.green};
    color: ${theme.darkblue};
    margin-left: 15px;
`;

class MovieList extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            hidden: true
        }
    }
    componentDidMount() {
        this.props.fetchMovies();
    }

    componentDidUpdate() {
        window.scrollTo(0, 0);
    }

    changePage = (newPage) => {
        const { type } = this.props.movieItems;
        const { year, rating, genres, query } = this.props;
        this.setState({hidden: true});

        if (type === 'byTitle')  
            this.props.fetchMoviesByTitle(query, newPage)
        else if (type === 'filtered') {
            const withoutGenres = genres.filter(g => g.checked === false).map(genre => genre.id).reduce((acc, cur) => `${acc},${cur}`, '');
            this.props.fetchMovies(newPage, 'filtered', rating.min, rating.max, year.min, year.max, withoutGenres);
        } else 
            this.props.fetchMovies(newPage);
    }

    toggleFilters = () => {
        this.setState({hidden: !this.state.hidden});
    }

    render() {
        const { type, page, pages } = this.props.movieItems;
        const movieItems = this.props.movieItems.movies.map(movie => <MovieBox key={movie.id} movie={movie} inRow={4}/>);
        return (
            <Container>
                <Helmet>
                    <title>Home - Movfinder</title>
                </Helmet>
                {!(type === 'byTitle') ?
                <FiltersContainer>
                    <Filters hidden={this.state.hidden} toggleFilters={this.toggleFilters}/>
                    <FiltersButton hidden={this.state.hidden} onClick={this.toggleFilters}><i className="fas fa-sliders-h"></i> Filter movies</FiltersButton>
                </FiltersContainer> : ''
                }
                <div>
                    <StyledList>
                        {movieItems}
                    </StyledList>
                    <PageButtons>
                        {(page - 1 > 0) ? <PageButton onClick={() => {this.changePage(page - 1)}}>Previous page</PageButton> : ''}
                        {(page + 1 <= pages) ? <PageButton onClick={() => {this.changePage(page + 1)}}>Next page</PageButton> : ''}
                    </PageButtons>
                </div>
            </Container>
        );
    }
}

MovieList.propTypes = {
    fetchMovies: PropTypes.func.isRequired,
    fetchMoviesByTitle: PropTypes.func.isRequired,
    movieItems: PropTypes.object.isRequired,
    year: PropTypes.object,
    rating: PropTypes.object,
    genres: PropTypes.array,
    query: PropTypes.string
}

const mapStateToProps = state => ({
    movieItems: state.movies.movieItems,
    year: state.filters.year,
    rating: state.filters.rating,
    genres: state.filters.genreItems,
    query: state.filters.query
});

export default connect(mapStateToProps, { fetchMovies, fetchMoviesByTitle })(MovieList);