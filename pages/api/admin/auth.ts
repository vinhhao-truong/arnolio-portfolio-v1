import { NextApiResponse } from "next";
import { NextApiRequest } from "next";
import { firebaseAuth } from "../../../store/firebase";
import { AuthError, signInWithEmailAndPassword, signOut } from "firebase/auth";
import ResponseData from "../../../interfaces/ResponseData";
import { AuthEnum } from "../../../interfaces/Firebase";
import axios, { Axios, AxiosError } from "axios";
import { getFirebaseAuthApi } from "../../../store/firebaseAuth";

const handleAdminAuth = async (
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) => {
  if (req.method === "POST") {
    const body = req.body;
    const authReqType = req.body.type;

    if (Object.keys(AuthEnum).includes(authReqType)) {
      try {
        const authRes = await axios.post(getFirebaseAuthApi(authReqType), {
          ...body,
          type: undefined,
        });
        res.status(200).send({
          data: authRes.data,
          status: authRes.status,
        });
      } catch (err) {
        if (axios.isAxiosError(err) && err.response) {
          res.status(err.response.status).send({
            data: err.response.data,
            status: err.response.status,
          });

          return;
        }
        res.status(404).send({
          data: err,
          status: 404,
        });
      }
    }
  }
};

export default handleAdminAuth;
