import { useState, useEffect, useCallback } from 'react';
import { getProduct } from '../functions/product';
import SingleProduct from '../components/cards/SingleProduct';

const Product = ({ match }) => {
  const [product, setProduct] = useState({});

  const { slug } = match.params;

  const loadSingleProduct = useCallback(
    () => getProduct(slug).then((res) => setProduct(res.data)),
    [slug]
  );

  useEffect(() => {
    loadSingleProduct();
  }, [loadSingleProduct, slug]);

  return (
    <div className='container-fluid'>
      <div className='row pt-4'>
        <SingleProduct product={product} />
      </div>

      <div className='row'>
        <div className='col text-center pt-5 pb-5'>
          <hr />
          <h4>Related Products</h4>
          <hr />
        </div>
      </div>
    </div>
  );
};

export default Product;
