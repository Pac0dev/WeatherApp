import React from 'react'

import MainComponent from './components/main/MainComponent';

import ContextServerProvider from './context/ContextServer';
import './styles/styles.scss';
const WeatherApp = () => {
  return (
    <ContextServerProvider>
      <div className="weather-app">
        <MainComponent />
      </div>
    </ContextServerProvider>
  );
}

export default WeatherApp
