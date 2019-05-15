import React from 'react';
import styled from 'styled-components';
import Button from '../../Button/Button';
import theme from '../../../assets/styles/theme';

const StyledButton = styled(Button)`
    width: 42%;
    padding: 8px 0;
    margin: 2px;
    text-align: left;
    border: none;
    :before {
        font-family: ${theme.font.family.fontawesome};
        content: '${props => props.checked ? '\f14a' : '\f0c8'}'
    }
`;

class GenreButton extends React.Component {
    render(){
        const { className, checked, onClick, children } = this.props;
        return (
            <StyledButton className={className} checked={checked} onClick={onClick}>{children}</StyledButton>
        );
    }

}

export default GenreButton