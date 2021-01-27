/* eslint-disable linebreak-style */
import styled from 'styled-components';
import db from '../../../db.json';

const Button = styled.button`
    border: none;
    margin: 10px 0px 5px 0px;
    width: 100%;
    height: 40px;
    border-radius: 8px;
    background-color: ${db.theme.colors.secondary};
    color: white;
    overflow: hidden;
    transition: 0.8s;

    &:hover {
        background-color: ${db.theme.colors.primary};
        cursor: pointer;
    }
    
`;

export default Button;
