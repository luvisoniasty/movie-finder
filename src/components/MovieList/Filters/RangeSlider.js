import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import theme from '../../../assets/styles/theme';
import InputRange from 'react-input-range';
import 'react-input-range/lib/css/index.css';

const RangeSliderContainer = styled.div`
    width: 90%;
    margin: 0 auto;
    padding: 10px 0 15px 0;
    .input-range__track--active,
    .input-range__slider {
        background: ${theme.green}; 
        border-color: ${theme.green};
    }
    .input-range__label-container {
        font-family: ${theme.font.family.montserrat};
        font-size: ${theme.font.size.smaller};
        top: 0.1rem;
    }
    .input-range__label {
        color: ${theme.lightblue};
        font-weight: ${theme.font.weight.bold};
    }
    .input-range__label.input-range__label--value {
        color: ${theme.green};
        top: -2.2rem;
    }
`;

class RangeSlider extends React.Component {
    render() {
        const { minValue, maxValue, value, onChange } = this.props;
        return (
            <RangeSliderContainer>
                    <InputRange
                    minValue={minValue}
                    maxValue={maxValue}
                    value={value}
                    onChange={onChange} />
            </RangeSliderContainer>
        );
    }
}

RangeSlider.propTypes = {
    minValue: PropTypes.number.isRequired,
    maxValue: PropTypes.number.isRequired,
    value: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired
}

export default RangeSlider;