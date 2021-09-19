import React from 'react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Button from '../button';
import { increment, decrement, remove } from '../../redux/actions';

const BasketItem = ({product, amount, subtotal, decrement, increment, remove}) => {

  BasketItem.propTypes = {
    product: PropTypes.shape({
      name: PropTypes.string,
    }).isRequired,
    amount: PropTypes.number.isRequired,
    subtotal: PropTypes.number.isRequired,
    decrement: PropTypes.func.isRequired,
    increment: PropTypes.func.isRequired,
    remove: PropTypes.func.isRequired,
  };

  return (
    <div>
      <div>
        <div>
          <span>{product.name}</span>
        </div>
        <div>
          <div styles={{display:'flex', flexDirection:'column'}}>
            <Button onClick={increment}>-</Button>
            <span>{amount}</span>
            <Button onClick={decrement}>+</Button>
          </div>
          <p>{subtotal}</p>
          <Button onClick={remove}>x</Button>
        </div>
      </div>
    </div>
  );
}

const mapDispatchToProps = (dispatch, ownProps) => ({
  increment: () => dispatch(increment(ownProps.product.id)),
  decrement: () => dispatch(decrement(ownProps.product.id)),
  remove: () => dispatch(remove(ownProps.product.id)),
});

export default connect(null, mapDispatchToProps)(BasketItem);