import { NextApiRequest, NextApiResponse } from "next";
import ResponseData from "../../interfaces/ResponseData";

const handleAllProject = (
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) => {
  if (req) {
    res.status(200).send({
      status: 200,
      data: "Hello world",
    });
  }
};

export default handleAllProject;
