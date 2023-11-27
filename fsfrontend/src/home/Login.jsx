import { useEffect } from "react";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../redux/userInfo";
import CONST from "../common/constants";

import { Button } from "primereact/button";
import { useNavigate } from "react-router-dom";

const getCookie = (name) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
};

const dummyProfile1 = {
  sub: "111821378167001404259",
  name: "Shewta Tiwari",
  given_name: "Shewta",
  family_name: "Tiwari",
  picture:
    "https://lh3.googleusercontent.com/a/ACg8ocL-K4P4RF_tFj_rLP4mSzqvMkUyYhpeorTimWUTo5LkjH0=s96-c",
  email: "shweta.tiwari@gmail.com",
  email_verified: true,
  locale: "en-GB",
  // "id": 2
};

const dummyProfile2 = {
  sub: "111821378167001404259",
  name: "Bhargavi Patil",
  given_name: "Bhargavi",
  family_name: "Patil",
  picture:
    "https://lh3.googleusercontent.com/a/ACg8ocL-K4P4RF_tFj_rLP4mSzqvMkUyYhpeorTimWUTo5LkjH0=s96-c",
  email: "bhargavi.patil@gmail.com",
  email_verified: true,
  locale: "en-GB",
  // "id": 2
};

const Login = () => {
  const UserInfo = useSelector((state) => state.userInfo);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // const userInfoCookie = getCookie("userInfo");
  // if(userInfoCookie){
  //   dispatch(login(userInfoCookie));
  //   navigate("/main/feed");
  // }

  useEffect(() => {
    const userInfoCookie = getCookie("userInfo");
    if (userInfoCookie) {
      dispatch(login(JSON.parse(userInfoCookie)));
      navigate("/main/feed");
    }
  }, []);

  const loginWithDummyProfile = (userInfo) => {
    axios
      .get(
        CONST.SERVER_URL + "/users?queryType=getUser&email=" + userInfo.email
      )
      .then((res) => {
        if (res.data.count) {
          const id = res.data.user.id;
          document.cookie =
            "userInfo=" +
            JSON.stringify({ ...userInfo, id }) +
            "; ;max-age=172800;";
          dispatch(login({ ...userInfo, id }));
          navigate("/main/feed");
        } else {
          console.log("user not registered.");
          document.cookie =
            "userInfo=" + JSON.stringify(userInfo) + "; ;max-age=172800;";
          dispatch(login(userInfo));
          navigate("/home/signup");
        }
      });
  };

  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      // console.log(tokenResponse);
      // fetching userinfo can be done on the client or the server
      const userInfo = await axios
        .get("https://www.googleapis.com/oauth2/v3/userinfo", {
          headers: { Authorization: `Bearer ${tokenResponse.access_token}` },
        })
        .then((res) => res.data);

      console.log(userInfo);
      axios
        .get(
          CONST.SERVER_URL + "/users?queryType=getUser&email=" + userInfo.email
        )
        .then((res) => {
          if (res.data.count) {
            const id = res.data.user.id;
            document.cookie =
              "userInfo=" +
              JSON.stringify({ ...userInfo, id }) +
              "; ;max-age=172800;";
            dispatch(login({ ...userInfo, id }));
            navigate("/main/feed");
          } else {
            console.log("user not registered yet.");
            // document.cookie="userInfo="+JSON.stringify(userInfo)+"; ;max-age=172800;";
            dispatch(login(userInfo));
            navigate("/home/signup");
          }
        })
        .catch((e) => {
          console.log(e);
        });
      // set the cookie once user logged in successfully
      // document.cookie="userInfo="+JSON.stringify(userInfo)+"; ;max-age=172800; SameSite=Strict;";
      // dispatch(login(userInfo));
      // navigate("/main/feed")
    },
    onError: async (error) => {
      console.log(error);
    },
  });

  return (
    <div className="centerDiv">
      <div>
        <Button
          style={{ width: "100%", backgroundColor: "black" }}
          onClick={() => {
            googleLogin();
          }}
        >
          Login using Apple&nbsp;
          <i className="pi pi-apple" style={{ fontSize: "1rem" }}></i>
        </Button>
      </div>
      &nbsp;
      <div>
        <Button
          style={{ width: "100%", backgroundColor: "purple" }}
          onClick={() => {
            googleLogin();
          }}
        >
          Login using Google&nbsp;
          <i className="pi pi-google" style={{ fontSize: "1rem" }}></i>{" "}
        </Button>
      </div>
      &nbsp;
      <div>
        <Button
          style={{ width: "100%", backgroundColor: "red" }}
          onClick={() => {
            loginWithDummyProfile(dummyProfile1);
          }}
        >
          Login as Shweta Tiwari&nbsp;
          <i className="pi pi-google" style={{ fontSize: "1rem" }}></i>{" "}
        </Button>
      </div>
      &nbsp;
      <div>
        <Button
          style={{ width: "100%", backgroundColor: "red" }}
          onClick={() => {
            loginWithDummyProfile(dummyProfile2);
          }}
        >
          Login as Bhargavi Patil&nbsp;
          <i className="pi pi-google" style={{ fontSize: "1rem" }}></i>{" "}
        </Button>
      </div>
    </div>
  );
};

export default Login;
