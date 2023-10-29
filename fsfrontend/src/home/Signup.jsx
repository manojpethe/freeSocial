import { useState } from "react";
import { Card } from "primereact/card";
import { Button } from "primereact/button";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import CONST from "../common/constants";

const emptyProfile = {
  fullName: "",
  gender:"",
  religion:"",
  motherTongue:"",
  height:"",
  annualIncome:"",
  location:"",
  caste:"",
  managedBy:"",
  maritalStatus: "",
  birthDate: "01/01/1990",
  aboutMe:"",
  family:"",
  education:"",
  career:""
};


const Signup = () => {
  const userInfo = useSelector((state) => state.userInfo.data);
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const header = (
    <i
      className="pi pi-paperclip"
      style={{ fontSize: "5rem", color: "gray" }}
    ></i>
  );
  const footer = (
    <div>
      <Button
        onClick={() => {
          setStep(2);
        }}
      >
        I Agree
      </Button>
    </div>
  );
  // console.log(userInfo);

  const handleRegistration = () => {
    axios
      .post(CONST.SERVER_URL + "/users?queryType=registerUser", {
        email: userInfo.email,
        profile: emptyProfile,
      })
      .then((res) => {
        const id = res.data.id;
        document.cookie =
          "userInfo=" +
          JSON.stringify({ ...userInfo, id }) +
          "; ;max-age=172800;";
        setStep(3);
      })
      .catch((e) => {
        console.log("Something went wrong!", e);
      });
  };

  const termsAndConditions = (
    <>
      <div style={{ width: "100%", height: "10rem" }}></div>
      <Card
        title="Terms & Conditions"
        subTitle="2023"
        footer={footer}
        header={header}
        className="md:w-25rem"
      >
        <p className="m-0">
          I agree to share my profile data with registered users considering
          that they are unknown to me.
          <br />
          It is my responsibilty to share my confidential data or my phone
          number with registered users.
        </p>
      </Card>
    </>
  );

  const registerUser = (
    <>
      <div style={{ width: "100%", height: "10rem" }}></div>
      <Card
        title="Lets get you registered"
        subTitle="2023"
        header={header}
        className="md:w-25rem"
      >
        <p className="m-0">
          Your account is getting registered with <br />
          Email:{userInfo.email} <br />
          And your name is {userInfo.name} <br />
          <br />
          Note: If you do not wish to register using this account please use
          logout button and login with different account.
          <br />
        </p>
        <div>
          <Button
            onClick={() => {
              handleRegistration();
            }}
          >
            Register
          </Button>
        </div>
      </Card>
    </>
  );

  const welcome = (
    <>
      Welcome to NRI Matrimony
      <br />
      Next Step: Click here to complete your profile.
      <br />
      <Button
        onClick={() => {
          navigate("/main/feed");
        }}
      >
        Edit Profile
      </Button>
    </>
  );

  return (
    <>
      <center>
        {step === 1
          ? termsAndConditions
          : step === 2
          ? registerUser
          : step === 3
          ? welcome
          : ""}
      </center>
    </>
  );
};

export default Signup;
