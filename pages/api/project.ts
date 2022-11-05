import { NextApiRequest, NextApiResponse } from "next";
import ResponseData from "../../interfaces/ResponseData";
import { firebaseDb } from "../../store/firebase";
import { set, ref, push } from "firebase/database";
import ProjectInterface from "../../interfaces/ProjectInterface";

const handleAllProject = async (
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) => {
  if (req.method === "POST") {
    const { slug, name, demoUrl, srcCodeUrl, thumbnail }: ProjectInterface =
      req.body;

    const allProjectRef = ref(firebaseDb, "project");
    const slugRef = ref(firebaseDb, `project/${slug}`);

    try {
      await set(slugRef, {
        slug: slug,
        name: name,
        demoUrl: demoUrl,
        srcCodeUrl: srcCodeUrl,
        thumbnail: thumbnail,
      });
      res.status(200).send({
        status: 404,
        data: "New Project Created!",
      });
    } catch (err) {
      res.status(404).send({
        status: 404,
        data: err,
      });
    }
  }
};

export default handleAllProject;
