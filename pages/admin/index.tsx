import axios from "axios";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import Seo from "../../components/Seo";
import { startLoading, stopLoading } from "../../redux/globalStateSlice";
import { firebaseAuth } from "../../store/firebase";

export const getServerSideProps = async () => {
  const admin = firebaseAuth.currentUser;

  return {
    props: {
      isLoggedIn: admin ? true : false,
    },
  };
};

const Admin = ({
  isLoggedIn,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const dispatch = useDispatch();
  const router = useRouter();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  //Check Auth
  useEffect(() => {
    if (isLoggedIn) {
      router.push("/admin/dashboard");
    }
  }, []);

  const handleInput =
    (field: "email" | "password"): React.ChangeEventHandler<HTMLInputElement> =>
    (e) => {
      e.preventDefault();
      if (field === "email") {
        setEmail(e.target.value);
      }
      if (field === "password") {
        setPassword(e.target.value);
      }
    };

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    if (email && password) {
      dispatch(startLoading());
      try {
        console.log(email);
        const adminRes = await axios.post("/api/admin", {
          type: "signIn",
          email: email,
          password: password,
        });

        const msg = await adminRes.data.data;
        setTimeout(() => {
          router.push("/admin/dashboard");
        }, 1000);
        alert(msg);
      } catch (err) {
        alert("Invalid credential!");
        setEmail("");
        setPassword("");
      }
      dispatch(stopLoading());
    }
  };

  return (
    <>
      <Seo title="Admin" />
      <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-3">
        <div className="col-span-1 text-3xl">Login to Admin Panel</div>
        <input
          required
          onChange={handleInput("email")}
          className="arnolio-input col-span-1 text-navy-theme"
          value={email}
          placeholder="Admin Email"
        />
        <input
          required
          onChange={handleInput("password")}
          className="arnolio-input col-span-1 text-navy-theme"
          value={password}
          placeholder="Admin Password"
          type="password"
        />
        <button
          className="block mx-auto py-1 rounded-lg hover:text-blue-theme dark:hover:bg-white-theme px-4 col-span-1 text-white bg-blue-theme"
          type="submit"
        >
          Login
        </button>
      </form>
    </>
  );
};

export default Admin;
