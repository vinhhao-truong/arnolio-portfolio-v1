import moment from "moment";

interface Exp {
  organisation?: string;
  from: string;
  to?: string;
  about?: string;
  task: string[];
  role?: "Software Developer";
  logo?: React.ReactNode;
}
const experiences: Exp[] = [
  {
    organisation: "Maqro Capital",
    from: moment("09-26-2022").format("Mo YYYY"),
    to: moment("03-31-2023").format("Mo YYYY"),
    role: "Software Developer",
    task: [""],
  },
  {
    organisation: "JDS Volunteering",
    from: moment("05-2022").format("Mo YYYY"),
    to: moment("05-2022").format("Mo YYYY"),
    role: "Software Developer",
    task: [""],
  },
];

export default experiences;
