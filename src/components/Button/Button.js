import React from 'react';
import styled from 'styled-components';
import theme from '../../assets/styles/theme';

const StyledButton = styled.button`
    padding: 8px 16px;
    background: none
    color: ${theme.green};
    border: 1px solid ${theme.gray};
    border-radius: 1px;
    cursor: pointer;
`;

class Button extends React.Component {
    render() {
        const { className, onClick, children } = this.props;
        return (
            <StyledButton className={className} onClick={onClick}> {children}</StyledButton>
        )
    }
}

export default Button;