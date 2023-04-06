import axios from "axios";
import moment from "moment";
import { NextApiRequest, NextApiResponse } from "next";
import ResponseData from "../../../interfaces/ResponseData";

export default async function handleAddProject(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  if (req.method === "POST") {
    const reqBody = req.body;
    const idToken = req.query?.idToken;

    if (idToken) {
      try {
        await axios.post(`${process.env.PROJECT_API}?auth=${idToken}`, {
          ...reqBody,
          lastUpdate: moment().format(),
        });

        res.status(200).send({
          data: "Project added!",
          status: 200,
        });
      } catch (err) {
        if (axios.isAxiosError(err) && err.response) {
          // console.log(err.response.data);

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
    } else {
      res.status(400).send({
        data: "No idToken provided",
        status: 400,
      });
    }
  }
}
