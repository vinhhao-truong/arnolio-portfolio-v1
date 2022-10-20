import React from "react";
import ReactProps from "../../interfaces/ReactProps";
import SectionHeader from "../SectionHeader";

interface ContactProps extends ReactProps {}
const Contact: React.FC<ContactProps> = () => {
  return (
    <div id="contact" className="relative">
      <SectionHeader title="Contact" />
    </div>
  );
};

export default Contact;
