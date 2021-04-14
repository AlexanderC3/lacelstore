import React from "react";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  selectCartItems,
  selectCartTotal,
} from "../../redux/Cart/cart.selectors";
import { createStructuredSelector } from "reselect";
import Button from "../../components/Forms/Button";
import Item from "./Item";
import "./styles.scss";

const mapState = createStructuredSelector({
  cartItems: selectCartItems,
  total: selectCartTotal,
});

const Checkout = ({}) => {
  const history = useHistory();
  const { cartItems, total } = useSelector(mapState);
  const emptyCart = "You have no items in your cart";

  return (
    <div className="checkout">
      <h1>Checkout</h1>
      <br />
      <br />
      <div className="cart">
        {cartItems.length > 0 ? (
          <table border="0" cellPadding="0" cellSpacing="0">
            <tbody style={{ textAlign: "center" }}>
              <tr style={{ textAlign: "center", margin: "auto" }}>
                <table
                  className="checkoutHeader"
                  border="0"
                  cellPadding="10"
                  cellSpacing="0"
                  style={{ textAlign: "center" }}
                >
                  <tbody>
                    <tr>
                      <th>Product</th>
                      <th>Description</th>
                      <th>Quantity</th>
                      <th>Price</th>
                      <th>Remove</th>
                    </tr>
                  </tbody>
                </table>
              </tr>
              <tr>
                <table border="0" cellSpacing="0" cellPadding="0">
                  <tbody>
                    {cartItems.map((item, pos) => {
                      return (
                        <tr key={pos}>
                          <td>
                            <Item {...item} />
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </tr>

              <tr>
                <table
                  algin="right"
                  border="0"
                  cellSpacing="0"
                  cellPadding="10"
                >
                  <tr align="left">
                    <td>
                      <br />
                      <h3>Total: € {total}</h3>
                    </td>
                  </tr>

                  <tr>
                    <table border="0" cellSpacing="0" cellPadding="10">
                      <tbody>
                        <tr>
                          <td>
                            <Button onClick={() => history.goBack()}>
                              Continue shopping
                            </Button>
                          </td>
                          <td>
                            <Button>Checkout</Button>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </tr>
                </table>
              </tr>
            </tbody>
          </table>
        ) : (
          <p>{emptyCart}</p>
        )}
      </div>
    </div>
  );
};

export default Checkout;
