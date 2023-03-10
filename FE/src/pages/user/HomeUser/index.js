import clsx from "clsx";
import style from "./homeUser.module.scss";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import homeUserSlice, { fetchProductList } from "./homeUserSlide.js";
import {
    homeUserSelector,
    productListCategoryMeatSelector,
    productListCategoryVegetableSelector,
} from "./homeUserSelectors.js";
import Loading from "~/components/Loading";
import Error from "~/components/popupComponents/Error";
import Product from "~/components/productComponents/Product";
import Carousel from "~/components/CarouselComponent";
import AutoPopUpNotify from "~/components/popupComponents/AutoPopUpNotify";

function HomeUser() {
    const dispatch = useDispatch();
    const { productListBySearch, error, loading, productList } = useSelector(
        (state) => state.homeUser
    );
    const { message } = useSelector((state) => state.cartInfo);
    const [notify, setNotyfy] = useState(false);
    const [currentMeatProductNum, setCurrentMeatProductNum] = useState(8);
    const [currentVegetableProductNum, setCurrentVegetableProductNum] =
        useState(8);
    const homeUser = useSelector(homeUserSelector);
    const meatList = useSelector(productListCategoryMeatSelector).slice(
        0,
        currentMeatProductNum
    );

    const vegetableList = useSelector(
        productListCategoryVegetableSelector
    ).slice(0, currentVegetableProductNum);

    useEffect(() => {
        const fetchProductListData = async () => {
            await dispatch(fetchProductList());
        };
        fetchProductListData();
    }, [dispatch]);

    useEffect(() => {
        message === "addToCartSuccess" ? setNotyfy(true) : setNotyfy(false);
    }, [message]);

    function handleCategoryMeatClick(e) {
        dispatch(homeUserSlice.actions.setCategoryMeatFilter(e.target.value));
    }

    function handleCategoryVegetableClick(e) {
        dispatch(
            homeUserSlice.actions.setCategoryVegetableFilter(e.target.value)
        );
    }

    return (
        <div className={clsx("col_lg_8_10")}>
            {notify ? (
                <AutoPopUpNotify message="???? th??m s???n ph???m v??o gi??? h??ng."></AutoPopUpNotify>
            ) : (
                <></>
            )}
            {loading ? (
                <Loading></Loading>
            ) : error !== "" ? (
                <Error type="danger" message={homeUser.error}></Error>
            ) : productListBySearch.length === 0 && productList.length > 0 ? (
                <>
                    {/* carousel */}
                    <div className={clsx("row ", "mt-1")}>
                        <Carousel
                            carouselItem={[
                                {
                                    img: "https://cdn.tgdd.vn/bachhoaxanh/banners/5599/fresh-khuyen-mai-gia-soc-2010202222524.jpg",
                                    link: "#",
                                },
                                {
                                    img: "https://cdn.tgdd.vn/bachhoaxanh/banners/5599/ngay-chay-21122022112655.jpg",
                                    link: "#",
                                },
                            ]}
                            showThumbs={false}
                        ></Carousel>
                    </div>
                    {/* end carousel */}

                    {/* Meat Product Section */}
                    <div className={clsx("row ", "mt-1")}>
                        <div className={style.homeUser_productSection}>
                            <div
                                className={clsx(style.productSection_Container)}
                            >
                                {/* title */}
                                <div
                                    className={
                                        style.productSection_titleContainer
                                    }
                                >
                                    <div className={style.title}>
                                        <span>th???t, c??, tr???ng, h???i s???n</span>
                                    </div>
                                    <div className={style.control}>
                                        <button
                                            className={clsx(style.control_item)}
                                            value={[
                                                "pork",
                                                "chicken",
                                                "fish",
                                                "sea food",
                                                "egg",
                                            ]}
                                            onClick={handleCategoryMeatClick}
                                        >
                                            Th???t, C??, Tr???ng, H???i s???n
                                        </button>
                                        <button
                                            className={clsx(style.control_item)}
                                            value={["pork", "chicken"]}
                                            onClick={handleCategoryMeatClick}
                                        >
                                            Th???t c??c lo???i
                                        </button>
                                        <button
                                            className={clsx(style.control_item)}
                                            value={["fish"]}
                                            onClick={handleCategoryMeatClick}
                                        >
                                            C?? c??c lo???i
                                        </button>
                                        <button
                                            className={clsx(style.control_item)}
                                            value={"sea food"}
                                            onClick={handleCategoryMeatClick}
                                        >
                                            H???i s???n c??c lo???i
                                        </button>
                                        <button
                                            className={clsx(style.control_item)}
                                            value={"egg"}
                                            onClick={handleCategoryMeatClick}
                                        >
                                            Tr???ng
                                        </button>
                                    </div>
                                </div>
                                {/* end title */}

                                {/* product show case */}
                                <div
                                    className={
                                        style.productSection_productContainer
                                    }
                                >
                                    {meatList.map((product, index) => (
                                        <Product
                                            key={index}
                                            product={product}
                                        ></Product>
                                    ))}
                                </div>
                                {/*end product show case */}
                            </div>
                            <div className={style.productSection_seeMore}>
                                <span
                                    onClick={() =>
                                        setCurrentMeatProductNum(
                                            (prev) => prev + 8
                                        )
                                    }
                                >
                                    Xem th??m
                                    <i className="fa-solid fa-sort-down"></i>
                                </span>
                            </div>
                        </div>
                    </div>
                    {/* end Meat Product Section */}

                    {/* vegetable Product Section */}
                    <div className={clsx("row ", "mt-1")}>
                        <div className={style.homeUser_productSection}>
                            <div
                                className={clsx(style.productSection_Container)}
                            >
                                {/* title */}
                                <div
                                    className={
                                        style.productSection_titleContainer
                                    }
                                >
                                    <div className={style.title}>
                                        <span>rau, c???, tr??i c??y</span>
                                    </div>
                                    <div className={style.control}>
                                        <button
                                            className={clsx(style.control_item)}
                                            value={[
                                                "vegetable",
                                                "root vegetable",
                                                "fruit",
                                            ]}
                                            onClick={
                                                handleCategoryVegetableClick
                                            }
                                        >
                                            Rau, C???, Tr??i c??y
                                        </button>
                                        <button
                                            className={clsx(style.control_item)}
                                            value={"vegetable"}
                                            onClick={
                                                handleCategoryVegetableClick
                                            }
                                        >
                                            Rau l?? c??c lo???i
                                        </button>
                                        <button
                                            className={clsx(style.control_item)}
                                            value={"root vegetable"}
                                            onClick={
                                                handleCategoryVegetableClick
                                            }
                                        >
                                            Rau c??? c??c lo???i
                                        </button>
                                        <button
                                            className={clsx(style.control_item)}
                                            value={"fruit"}
                                            onClick={
                                                handleCategoryVegetableClick
                                            }
                                        >
                                            Tr??i c??y c??c lo???i
                                        </button>
                                    </div>
                                </div>
                                {/* end title */}

                                {/* product show case */}
                                <div
                                    className={
                                        style.productSection_productContainer
                                    }
                                >
                                    {vegetableList.map((product, index) => (
                                        <Product
                                            key={index}
                                            product={product}
                                        ></Product>
                                    ))}
                                </div>
                                {/*end product show case */}
                            </div>
                            <div className={style.productSection_seeMore}>
                                <span
                                    onClick={() =>
                                        setCurrentVegetableProductNum(
                                            (prev) => prev + 8
                                        )
                                    }
                                >
                                    Xem th??m
                                </span>
                            </div>
                        </div>
                    </div>
                    {/* end Vegetable Product Section */}
                </>
            ) : (
                <div className={clsx("row ", "mt-1")}>
                    <div className={style.homeUser_productSection}>
                        <div className={clsx(style.productSection_Container)}>
                            {/* title */}
                            <div
                                className={style.productSection_titleContainer}
                            >
                                <div className={style.title}>
                                    <span>S???N PH???M T??M ???????C</span>
                                </div>
                            </div>
                            {/* end title */}

                            {/* product show case */}
                            <div
                                className={
                                    style.productSection_productContainer
                                }
                            >
                                {productListBySearch.map((product, index) => (
                                    <Product
                                        key={index}
                                        product={product}
                                    ></Product>
                                ))}
                            </div>
                            {/*end product show case */}
                        </div>
                        <div className={style.productSection_seeMore}>
                            <span
                                onClick={() =>
                                    setCurrentMeatProductNum((prev) => prev + 8)
                                }
                            >
                                Xem th??m
                                <i className="fa-solid fa-sort-down"></i>
                            </span>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default HomeUser;
