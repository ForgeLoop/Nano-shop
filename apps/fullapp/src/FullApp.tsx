import React from 'react';
import Navbar from './components/navbar/Navbar';
import Carousel from './components/carousel/Carousel';
import ProductCategoriesGrid from './components/grid/Grid';

const FullApp: React.FC = () => (
  <>
    <Navbar />
    <Carousel />
    <ProductCategoriesGrid />
  </>
);

export default FullApp;
