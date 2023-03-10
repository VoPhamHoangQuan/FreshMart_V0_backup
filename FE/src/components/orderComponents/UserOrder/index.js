import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import clsx from "clsx";
import style from "./userOrderStyle.module.scss";
import { numberWithCommas } from "~/vendor/js";
import {
    fetchUserOrderCancel,
    fetchUserOrderList,
} from "~/pages/user/UserOrderList/userOrderListSlice";

export default function UserOrder({ orderItem }) {
    const history = useNavigate();
    const dispatch = useDispatch();
    const [isPaid, setIsPaid] = useState(false);
    const [paidAt, setPaidAt] = useState(null);
    const [isDelivered, setIsDelivered] = useState(false);
    const [canceledAt, setCanceledAt] = useState(null);
    const [deliveriedAt, setDeliveredAt] = useState(null);
    const [cartItems, setCartItems] = useState([]);
    const [orderTotalPrice, setOrderTotalPrice] = useState(0);

    function handleOrderDetail() {
        history(`/orderInfo/${orderItem._id}`);
    }

    async function handleOrderCancel() {
        await dispatch(
            fetchUserOrderCancel({ orderId: orderItem._id, isDeleted: true })
        );
    }

    useEffect(() => {
        orderItem.isPaid === true ? setIsPaid(true) : setIsPaid(false);
        orderItem.paidAt
            ? setPaidAt(new Date(orderItem.paidAt).toLocaleString())
            : setPaidAt(null);
        orderItem.isDelivered === true
            ? setIsDelivered(true)
            : setIsDelivered(false);
        orderItem.deliveredAt
            ? setDeliveredAt(new Date(orderItem.deliveredAt).toLocaleString())
            : setDeliveredAt(null);
        orderItem.isDeleted === true
            ? setCanceledAt(new Date(orderItem.updatedAt).toLocaleString())
            : setCanceledAt(null);
        orderItem.orderItems
            ? setCartItems(orderItem.orderItems)
            : setCartItems([]);
        orderItem.shippingInfo
            ? setOrderTotalPrice(
                  orderItem.shippingInfo.shippingPrice +
                      orderItem.shippingInfo.itemsPrice
              )
            : setOrderTotalPrice(null);
    }, []);
    return (
        <div className={style.container}>
            <div className={style.header_container}>
                <div
                    className={clsx(style.payment_container, {
                        [style.payment_container__inActive]: !isPaid,
                    })}
                >
                    <i className="fa-solid fa-money-check-dollar"></i>{" "}
                    <span className={style.status}>
                        {isPaid ? "???? thanh to??n" : "Ch??a thanh to??n"}{" "}
                    </span>
                    <span className={style.time}>{paidAt ? paidAt : ""}</span>
                </div>
                <div
                    className={clsx(style.shipping_container, {
                        [style.shipping_container__inActive]: !isDelivered,
                    })}
                >
                    <i className="fa-solid fa-truck-fast"></i>
                    <span className={style.status}>
                        {isDelivered ? "???? nh???n h??ng" : "??ang v???n chuy???n"}{" "}
                    </span>
                    <span className={style.time}>
                        {deliveriedAt ? deliveriedAt : ""}
                    </span>
                </div>
            </div>
            <div className={style.body_container}>
                {cartItems.map((el, id) => (
                    <Link
                        key={id}
                        className={style.product_link}
                        to={`/product/${el.productId._id}`}
                    >
                        <div className={style.item_container}>
                            <div className={style.productInfo_container}>
                                <img
                                    src={el.productId.image}
                                    alt="product"
                                ></img>
                                <div className={style.detail_container}>
                                    <span className={style.name}>
                                        {el.productId.name}
                                    </span>
                                    <span className={style.price}>
                                        {" "}
                                        {numberWithCommas(
                                            el.productId.primaryPrice
                                        )}
                                        <span>??</span>
                                    </span>
                                    <span className={style.quantity}>
                                        x{el.qty}
                                    </span>
                                </div>
                            </div>
                            <div className={style.productTotalPrice_container}>
                                <span>
                                    {numberWithCommas(
                                        el.qty * el.productId.primaryPrice
                                    )}
                                </span>
                                <span>??</span>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
            <div className={style.footer_container}>
                <div className={style.totalPrice_container}>
                    {orderItem.isDeleted ? (
                        <div
                            className={clsx(style.shipping_container, {
                                [style.shipping_container__inActive]:
                                    !isDelivered,
                            })}
                        >
                            <i className="fa-solid fa-ban"></i>
                            <span className={style.status}>
                                ???? h???y ????n h??ng
                            </span>
                            <span className={style.time}>
                                {canceledAt ? canceledAt : ""}
                            </span>
                        </div>
                    ) : (
                        <span></span>
                    )}
                    <div className={style.totalPrice}>
                        <i className="fa-solid fa-sack-dollar"></i>
                        <span>T???ng s??? ti???n: </span>
                        <span>{numberWithCommas(orderTotalPrice)}</span>
                        <span>??</span>
                    </div>
                </div>
                <div className={style.controlBtns_container}>
                    {orderItem.isPaid ||
                    orderItem.isDelivered ||
                    orderItem.isDeleted ? (
                        <span></span>
                    ) : (
                        <div
                            className={style.controlBtn}
                            onClick={handleOrderCancel}
                        >
                            <button className="primary_btn_style_3">
                                H???y ????n
                            </button>
                        </div>
                    )}
                    {orderItem.isDeleted ? (
                        <span></span>
                    ) : (
                        <>
                            {/* <div className={style.controlBtn}>
                            <button className="primary_btn_style_1">
                                Mua l???i
                            </button>
                        </div> */}

                            <div
                                className={style.controlBtn}
                                onClick={handleOrderDetail}
                            >
                                <button className="primary_btn_style_1">
                                    Xem chi ti???t
                                </button>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}
