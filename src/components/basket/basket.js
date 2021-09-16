import React, { useMemo } from 'react'
import { connect, useSelector } from 'react-redux';
import Button from '../button/button';
import styles from '../product/product.module.css';
import basketStyles from './basket.module.css';
import { decrement, increment, remove } from '../../redux/actions';

const Basket = () => {

  const value = useSelector(state => state.order)

  const show = () => {
    Object.entries(value).map((element) => (
      console.log(element)
    ))
  }

  const total = useMemo(() => {
    return Object.entries(value).reduce((sum, item) => {
      return sum + item[1] * item[1];
    }, 0);
  }, [value]);

  return (
    <div className={basketStyles.basket}>
      <button onClick={show}>Click</button>

      {Object.entries(value).map((element) => (
        <div>
          <span>{element}</span>
          <div className={styles.buttons}>
            <Button
              onClick={decrement}
              icon="minus"
              data-id="product-decrement"
            />
            <Button
              onClick={increment}
              icon="plus"
              data-id="product-increment"
            />
            <Button
              onClick={remove}
              icon="plus"
            />
          </div>
        </div>
      ))}
      {total}
    </div>
  )
}

const mapDispatchToProps = (dispatch, props) => ({
  increment: () => dispatch(increment(props.product.id)),
  decrement: () => dispatch(decrement(props.product.id)),
  remove: () => dispatch(remove(props.product.id)),
});

export default connect(null, mapDispatchToProps)(Basket);