import React from 'react';
import Navbar from './components/navbar/Navbar';
import Carousel from './components/carousel/Carousel';
import ProductCategoriesGrid from './components/grid/Grid';
import Footer from './components/footer/Footer';

const FullApp: React.FC = () => (
  <>
    <Navbar />
    <Carousel />
    <ProductCategoriesGrid />
    <Footer />
  </>
);

export default FullApp;
