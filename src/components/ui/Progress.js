import React, { useState, useEffect } from 'react'
import PropTypes from "prop-types";
import Styled from "styled-components";

const ProgressBar = ({ value, max, color, width }) => {

  const [progressColor, setProgressColor] = useState("")
  const clicked = () => {}

  const changeColor = () => {
      clicked ? setProgressColor("yellow") : setProgressColor("red")
  }
  
  return (
    <Container color={color} width={width} >
      <progress value={value} max={max} />
      <span>{(value / max) * 1000 / 10}%</span>
    </Container>
  );
};

ProgressBar.propTypes = {
  value: PropTypes.number.isRequired,
  max: PropTypes.number,
  color: PropTypes.string,
  width: PropTypes.string,
  progress: PropTypes.string
};

ProgressBar.defaultProps = {
  max: 100,
  width: "250px",
  color: 'green'
};

const Container = Styled.div`
  progress {
    margin-right: 20px;
    margin-top: 20px;
  }

  progress[value] {
    width: ${props => props.width};

    -webkit-appearance: none;
    appearance: none;
  }

  progress[value]::-webkit-progress-bar {
    height: 20px;
    border-radius: 20px;
    background-color: #F2F2F2;
    opacity: 84%;
    margin-left: 10px;
  }  

  progress[value]::-webkit-progress-value {
    height: 20px;
    border-radius: 20px;
    background-color: ${props => props.color};
  }
`;

export default ProgressBar;