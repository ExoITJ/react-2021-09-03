import React from 'react'
import { connect } from 'react-redux';
import basketStyles from './basket.module.css';
import BasketItem from './basketItem';

const Basket = ({ title = 'Корзина', total, orderProducts }) => {

  if (!total) {
    return (
      <div>
        <h4>Добавьте товар в корзину</h4>
      </div>
    );
  }

  return (
    <div className={basketStyles.basket}>
      <h4>{ title }</h4>
      {orderProducts.map(({product, amount, subtotal}) => (
        <BasketItem 
          product={product}
          amount={amount}
          key={product.id}
          subtotal={subtotal}
        />
      ))}
      <hr styles={{margin: 10}}/>
      <div>
        <p>Total</p>
      </div>
      <div>
        {`${total} $`}
      </div>
      <button>
        Заказать
      </button>
    </div>
  )
}

//Получаем "Стейт" с ресторанами для отображения в корзине
export default connect((state) => {
  //Выбираем все продукты из ресторанов
  const products = state.restaurants.flatMap((restaurant) => restaurant.menu);
  //Из ордера получаем все ключи продуктов
  const orderProducts = Object.keys(state.order)
  //Набираем все необходимые данные и добавить их в отдельный массив OrderProducts
    .filter((productId) => state.order[productId] > 0)
    .map((productId) => products.find((product) => product.id === productId))
    .map((product) => ({
      product,
      amount: state.order[product.id],
      subtotal: state.order[product.id] * product.price,
    }));
  //Считаются все суммы по заказанным позициям
  const total = orderProducts.reduce((acc, { subtotal }) => acc + subtotal, 0);
  return {
    total,
    orderProducts,
  };
})(Basket);