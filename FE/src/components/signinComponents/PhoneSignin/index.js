import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import style from "./phoneSigninStyle.module.scss";
import clsx from "clsx";
import { useDispatch, useSelector } from "react-redux";
import checkedicon from "~/vendor/image/checked.png";
import invalidIcon from "~/vendor/image/error_icon.png";
import {
    fetchCreateUser,
    fetchSigninUser,
} from "~/pages/user/authentication/signinSlice";

function PhoneSignin() {
    const history = useNavigate();
    const dispatch = useDispatch();
    const [gender, setGender] = useState("male");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [infoValid, setInfoValid] = useState(false);
    const { phoneNumber, userInfo } = useSelector((state) => state.signin);

    function handleSigninSubmit(e) {
        e.preventDefault();
        dispatch(
            fetchCreateUser({
                name: name,
                gender: gender,
                password: password,
                phone: phoneNumber,
            })
        );
        dispatch(
            fetchSigninUser({
                phone: phoneNumber,
                password: password,
            })
        );
        console.log("create success");
    }

    function handleRadioClick(e) {
        setGender(e.target.value);
    }
    function handleNameChange(e) {
        setName(e.target.value);
    }
    function handlePasswordChange(e) {
        setPassword(e.target.value);
    }

    useEffect(() => {
        gender !== "" && name !== "" && password !== ""
            ? setInfoValid(true)
            : setInfoValid(false);
    }, [gender, name, password]);

    useEffect(() => {
        if (userInfo.phone) {
            history("/", { replace: true });
        }
    }, [userInfo]);

    return (
        <div className="row">
            <div className="col_lg_6_12">
                <div className={style.container}>
                    <form>
                        <div className={style.title_container}>
                            <span>
                                Vui l??ng b??? sung th??ng tin d?????i ????y ????? ho??n t???t
                            </span>
                        </div>

                        <span
                            className={clsx(
                                {
                                    [style.auth_notify__error]: !infoValid,
                                },
                                style.auth_notify__active
                            )}
                        >
                            {!infoValid ? (
                                <img src={invalidIcon} alt="invalid" />
                            ) : (
                                <img src={checkedicon} alt="valid" />
                            )}
                            {!infoValid
                                ? "Y??u c???u qu?? kh??ch ??i???n ?????y ????? th??ng tin"
                                : "Th??ng tin h???p l???"}
                        </span>

                        <div className={style.input_container}>
                            <i className="fa-solid fa-venus-mars"></i>
                            <label style={{ margin: "0 4rem 0 -0.6rem" }}>
                                Danh x??ng
                            </label>
                            <div className={style.input_radio}>
                                <input
                                    id="male"
                                    name="gender radio"
                                    type="radio"
                                    value="male"
                                    checked={gender === "male"}
                                    onChange={(e) => handleRadioClick(e)}
                                    // required
                                />
                                <label htmlFor="male">Anh</label>
                            </div>
                            <div className={style.input_radio}>
                                <input
                                    id="female"
                                    name="gender radio"
                                    value="female"
                                    type="radio"
                                    checked={gender === "female"}
                                    onChange={(e) => handleRadioClick(e)}
                                    // required
                                />
                                <label htmlFor="female">Ch???</label>
                            </div>
                        </div>

                        <div className={style.input_container}>
                            <i className="fa-solid fa-user"></i>
                            <div className={style.input_text}>
                                <label htmlFor="userName">
                                    H??? v?? t??n <i style={{ color: "red" }}>*</i>
                                </label>
                                <input
                                    id="userName"
                                    type="text"
                                    placeholder="Nh???p h??? v?? t??n"
                                    onChange={(e) => handleNameChange(e)}
                                    // required
                                />
                            </div>
                        </div>

                        <div className={style.input_container}>
                            <i className="fa-solid fa-key"></i>{" "}
                            <div className={style.input_text}>
                                <label htmlFor="userPassword">
                                    M???t kh???u <i style={{ color: "red" }}>*</i>
                                </label>
                                <input
                                    id="userPassword"
                                    type="text"
                                    placeholder="Nh???p m???t kh???u m???i"
                                    onChange={(e) => handlePasswordChange(e)}
                                    // required
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            onClick={(e) => handleSigninSubmit(e)}
                            className={clsx(
                                style.submit_button,
                                "primary_btn_style_1"
                            )}
                        >
                            X??c nh???n
                        </button>
                        <a className={style.return_link} href="/signin">
                            <i className="fa-solid fa-arrow-left" />
                            Quay l???i trang ????ng nh???p
                        </a>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default PhoneSignin;
