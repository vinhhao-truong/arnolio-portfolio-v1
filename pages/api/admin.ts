import { NextApiResponse } from "next";
import { NextApiRequest } from "next";
import { firebaseAuth } from "../../store/firebase";
import { AuthError, signInWithEmailAndPassword, signOut } from "firebase/auth";
import ResponseData from "../../interfaces/ResponseData";

const handleAdminLogin = async (
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) => {
  if (req.method === "POST") {
    const { type, email, password } = req.body;

    //When Admin signs in
    if (type === "signIn") {
      try {
        const signIn = await signInWithEmailAndPassword(
          firebaseAuth,
          email,
          password
        );

        res.status(200).send({
          status: 200,
          data: "Signed in!",
        });
      } catch (err) {
        res.status(404).send({
          status: 404,
          data: err,
        });
      }
    }

    if (type === "signOut") {
      try {
        await signOut(firebaseAuth);
        res.status(200).send({
          status: 200,
          data: "Signed out!",
        });
      } catch (err) {
        console.log(err);
      }
    }
  }
};

export default handleAdminLogin;
