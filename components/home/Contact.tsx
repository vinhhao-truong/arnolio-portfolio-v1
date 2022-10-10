import React from "react";
import ReactProps from "../../interfaces/ReactProps";

interface ContactProps extends ReactProps {}
const Contact: React.FC<ContactProps> = () => {
  return (
    <div id="contact" className="">
      Contact
    </div>
  );
};

export default Contact;
