import React from 'react'
import { connect, useSelector } from 'react-redux';
import Button from '../button/button';
import styles from '../product/product.module.css';
import basketStyles from './basket.module.css';
import { decrement, increment } from '../../redux/actions';

const Basket = ({ restaurants }) => {

  const value = useSelector(state => state.order)

  const show = () => {
    console.log(value);
  }

  return (
    <div className={basketStyles.basket}>
      <button onClick={show}>Click</button>
    </div>
  )
}

export default connect()(Basket);