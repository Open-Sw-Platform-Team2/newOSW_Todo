import React from "react";
import styled from 'styled-components/native'
import { StyleSheet, TextInput } from "react-native";
import { lightTheme, darkTheme, theme } from '../theme';
import { Dimensions } from "react-native";
import PropTypes from "prop-types";

const StyledInput = styled.TextInput.attrs(({theme})=>({placeholderTextColor: theme.itemBackground,
}))`
    width: ${({width}) => width - 40}px;
    height: 60px;
    margin: 3px 0;
    padding: 15px 20px;
    border-radius: 10px;
    background-color: ${({theme}) => theme.main};
    font-size: 25px;
    color: ${({theme}) => theme.text};
`;
//
const SearchBar = ({ placeholder, value, onChangeText, onSubmitEditing, onBlur }) => {
    const width = Dimensions.get('window').width;
    
    return (
        <StyledInput
            width={width}
            placeholder={placeholder}
            maxLength={50}
            autoCapitalize="none"
            autoCorrect={false}
            returnKeyLabel="done"
            keyboardAppearance="dark"
            value={value} onChangeText={onChangeText}
            onSubmitEditing={onSubmitEditing}
            onBlur={onBlur}
            autoFocus={true}>
        </StyledInput>
    );
};
//
SearchBar.propTypes = {
    placeholder: PropTypes.string,
    value: PropTypes.string,
    onChangeText: PropTypes.func,
    onSubmitEditing: PropTypes.func,
    onBlur: PropTypes.func,
}


export default SearchBar;