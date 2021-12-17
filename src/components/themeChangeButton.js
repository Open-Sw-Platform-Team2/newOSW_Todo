import React from 'react';
//import { Pressable, StyleSheet, View, Image } from 'react-native';
import { theme } from '../theme';
import PropTypes from 'prop-types';
import { images } from '../Images';
import { TouchableOpacity } from 'react-native';
import styled from 'styled-components/native'

const ThemeChangeButton = ({type, onPressOut, id}) => {
    const _onPressOut = () => {
        onPressOut(id);
    };

    return (
        <TouchableOpacity onPressOut={_onPressOut}>
            <Icon source={type} />
        </TouchableOpacity>
    );
};

const Icon = styled.Image`
    tint-color: ${({theme, completed})=>completed? theme.done:theme.text};
    width: 30px;
    height: 30px;
    margin: 10px;    
`;

ThemeChangeButton.propTypes = {
    type: PropTypes.oneOf(Object.values(images)).isRequired,
    onPressOut: PropTypes.func,
    id: PropTypes.string,
    completed: PropTypes.bool,
};

export default ThemeChangeButton;