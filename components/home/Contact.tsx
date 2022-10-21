import React, { useState } from "react";
import ReactProps from "../../interfaces/ReactProps";
import SectionHeader from "../SectionHeader";
import Container from "../Container";
import { motion, TargetAndTransition } from "framer-motion";
import Section from "../Section";
import Link from "next/link";
//icon
import { MdAlternateEmail as EmailIcon } from "react-icons/md";
import { AiFillPhone as PhoneIcon } from "react-icons/ai";
import { GrLinkedinOption as LinkedInIcon } from "react-icons/gr";
import { TbBrandGithub as GithubIcon } from "react-icons/tb";
import { fades } from "../motion/variants";
import useResponsive from "../../hooks/useResponsive";

//Motion for hovering effect
const expand: TargetAndTransition = {
  width: "66%",
};
const collapse: TargetAndTransition = {
  width: "33%",
};

//Left side list
interface ContactUrl {
  href: string;
  icon: React.ReactNode;
  displayText: string;
}
const contactUrlList: ContactUrl[] = [
  {
    href: "mailto:vinhhao.truong.52@gmail.com",
    icon: <EmailIcon className="text-red-500" />,
    displayText: "E-mail",
  },
  {
    href: "tel:+61434109621",
    icon: <PhoneIcon className="text-green-500" />,
    displayText: "Phone Number",
  },
  {
    href: "https://www.linkedin.com/in/arnold-truong-501102200/",
    icon: <LinkedInIcon className="text-blue-500" />,
    displayText: "LinkedIn",
  },
  {
    href: "https://www.github.com/vinhhao-truong",
    icon: <GithubIcon className="text-black" />,
    displayText: "GitHub",
  },
];

interface ContactProps extends ReactProps {}
const Contact: React.FC<ContactProps> = () => {
  const [isLeft, setIsLeft] = useState<boolean | null>(null);
  const responsive = useResponsive();
  const isXs = responsive === "xs";
  const isSm = responsive === "sm";
  const isMd = responsive === "md";

  return (
    <Section
      id="contact"
      className="relative justify-center md:flex md:items-center"
    >
      <SectionHeader title="Contact" />
      {/* Main section */}
      <Container className="h-full md:flex md:justify-between">
        {/* Urls to contact */}
        <motion.div
          onMouseEnter={() => setIsLeft(true)}
          transition={{ duration: 0.2, ease: "easeIn" }}
          animate={
            isLeft === true && !(isSm || isXs)
              ? { ...expand }
              : isLeft === false && !(isSm || isXs)
              ? { ...collapse }
              : {}
          }
          className="md:w-[49.5%]"
        >
          {contactUrlList.map((contact: ContactUrl, idx: number) => (
            <motion.div
              className="relative flex items-center py-2"
              key={`contact-item-${idx}`}
            >
              <Link href={contact.href}>
                <motion.a
                  className="flex items-center mr-2"
                  animate={
                    isLeft === true || isLeft === null || isXs || isSm
                      ? { position: "relative" }
                      : { x: "5rem" }
                  }
                >
                  <span className="p-1 mr-1 rounded-full bg-white-theme">
                    {contact.icon}
                  </span>{" "}
                  <div>
                    {contact.displayText}
                    {(isLeft || isLeft === null || isXs || isSm) && ":"}
                  </div>
                </motion.a>
              </Link>

              <Link href={contact.href}>
                <motion.a
                  href={contact.href}
                  className="md:whitespace-nowrap hover:underline"
                  animate={
                    isLeft === true || isLeft === null || isXs || isSm
                      ? { ...fades.fadeIn }
                      : {
                          ...fades.fadeOut,
                          display: "none",
                        }
                  }
                >
                  {contact.href.includes("mailto") &&
                    "vinhhao.truong.52@gmail.com"}
                  {contact.href.includes("tel") && "0434109621"}
                  {contact.href.includes("https") && contact.href.slice(12)}
                </motion.a>
              </Link>
            </motion.div>
          ))}
        </motion.div>
        {/* Separator */}
        <div className="relative justify-center w-full md:w-[1%] flex items-center">
          <div className="absolute md:w-[1px] h-[1px] w-4/5 md:h-4/5 bg-white-theme "></div>
          <div className="z-10 bg-navy-theme md:leading-10 ">or</div>
        </div>

        {/* Contact form */}
        <motion.div
          onMouseEnter={() => setIsLeft(false)}
          animate={
            isLeft === false && !(isSm || isXs)
              ? { ...expand }
              : isLeft === true && !(isSm || isXs)
              ? { ...collapse }
              : {}
          }
          transition={{ duration: 0.2, ease: "easeIn" }}
          className={`w-full md:w-[49.5%] ${!isLeft ? "md:px-3" : "md:px-2"}`}
        >
          <h2 className="text-xl font-semibold">Notify Me</h2>
          <form className="grid w-full grid-cols-1 gap-2">
            <input
              className="w-1/2 col-span-1 arnolio-input"
              type="email"
              placeholder="Your email here..."
              required
            />
            <textarea
              className="w-full h-32 col-span-1 arnolio-input arnolio-textarea"
              placeholder="Your message here..."
              required
            ></textarea>
            <button className="block px-4 py-1 mx-auto rounded-lg bg-white-theme text-red-theme hover:bg-red-theme hover:text-white-theme">
              Send
            </button>
          </form>
        </motion.div>
      </Container>
    </Section>
  );
};

export default Contact;
