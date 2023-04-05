import axios from "axios";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import Seo from "../../components/Seo";
import { startLoading, stopLoading } from "../../redux/globalStateSlice";
import { firebaseAuth } from "../../store/firebase";
import Cookies from "js-cookie";
import { getFirebaseAuthApi } from "../../store/firebaseAuth";
import { AuthEnum } from "../../interfaces/Firebase";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const idToken = ctx.req.cookies.idToken;

  if (idToken) {
    const type: keyof typeof AuthEnum = "Get User Data";
    try {
      await axios.post(getFirebaseAuthApi(type), {
        idToken,
      });
      return {
        redirect: {
          permanent: false,
          destination: "/admin/dashboard",
        },
      };
    } catch (err) {
      console.log(err);
    }
  }

  return {
    props: {},
  };
};

const Admin = ({}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const dispatch = useDispatch();
  const router = useRouter();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  useEffect(() => {
    router.prefetch("/admin/dashboard");

    if (Cookies.get("idToken")) {
      Cookies.remove("idToken");
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

      const type: keyof typeof AuthEnum = "Sign In";

      try {
        const adminRes = await axios.post("/api/admin/auth", {
          type,
          returnSecureToken: true,
          email: email,
          password: password,
        });

        const adminData = await adminRes.data.data;

        if (adminData.idToken) {
          Cookies.set("idToken", adminData.idToken, { expires: 1 / 24 });
          router.replace("/admin/dashboard");
        }

        dispatch(stopLoading({ msg: "Signed In!" }));
        return;
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
          className="col-span-1 arnolio-input text-navy-theme"
          value={email}
          placeholder="Admin Email"
        />
        <input
          required
          onChange={handleInput("password")}
          className="col-span-1 arnolio-input text-navy-theme"
          value={password}
          placeholder="Admin Password"
          type="password"
        />
        <button
          className="block col-span-1 px-4 py-1 mx-auto text-white rounded-lg hover:text-blue-theme dark:hover:bg-white-theme bg-blue-theme"
          type="submit"
        >
          Login
        </button>
      </form>
    </>
  );
};

export default Admin;
