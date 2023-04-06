import axios from "axios";
import moment from "moment";
import { NextApiRequest, NextApiResponse } from "next";
import ResponseData from "../../../interfaces/ResponseData";

export default async function handleDeleteProject(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  if (req.method === "DELETE") {
    const reqBody = req.body;
    const idToken = req.query?.idToken;

    if (idToken && reqBody.id) {
      try {
        await axios.delete(
          `${process.env.PROJECT_API?.replace(".json", "")}/${
            reqBody.id
          }.json?auth=${idToken}`
        );

        res.status(200).send({
          data: "Project Deleted!",
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
