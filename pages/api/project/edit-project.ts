import axios from "axios";
import moment from "moment";
import { NextApiRequest, NextApiResponse } from "next";
import ResponseData from "../../../interfaces/ResponseData";

export default async function handleEditProject(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  if (req.method === "PATCH") {
    const reqBody = req.body;
    const idToken = req.query?.idToken;

    if (idToken && reqBody.id && reqBody) {
      try {
        await axios.patch(
          `${process.env.PROJECT_API?.replace(".json", "")}/${
            reqBody.id
          }.json?auth=${idToken}`,
          { ...reqBody, lastUpdate: moment().format() }
        );

        res.status(200).send({
          data: "Project Edited!",
          status: 200,
        });
      } catch (err) {
        if (axios.isAxiosError(err) && err.response) {
          console.log(err.response.data);
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
