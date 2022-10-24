import React, { useState, useEffect, useRef } from "react";
import ReactProps from "../../interfaces/ReactProps";
import SectionHeader from "../SectionHeader";
import Container from "../Container";
import { motion, TargetAndTransition, useScroll } from "framer-motion";
import Section from "../Section";
import Link from "next/link";
//icon
import { MdAlternateEmail as EmailIcon } from "react-icons/md";
import { AiFillPhone as PhoneIcon } from "react-icons/ai";
import { GrLinkedinOption as LinkedInIcon } from "react-icons/gr";
import { TbBrandGithub as GithubIcon } from "react-icons/tb";
import { fades, scales } from "../../utils/motion/variants";
import useResponsive from "../../hooks/useResponsive";
import TopLayer from "../TopLayer";
import axios from "axios";
import ResponseData from "../../interfaces/ResponseData";
import { useDispatch, useSelector } from "react-redux";
import {
  selectGlobalState,
  startLoading,
  stopLoading,
} from "../../redux/globalStateSlice";
import ReactLoading from "react-loading";

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
  color: string;
}
const contactUrlList: ContactUrl[] = [
  {
    href: "mailto:vinhhao.truong.52@gmail.com",
    icon: <EmailIcon className="text-red-500" />,
    displayText: "Email",
    color: "text-red-500",
  },
  {
    href: "tel:+61434109621",
    icon: <PhoneIcon className="text-green-500" />,
    displayText: "Phone Number",
    color: "text-green-500",
  },
  {
    href: "https://www.linkedin.com/in/arnold-truong-501102200/",
    icon: <LinkedInIcon className="text-blue-500" />,
    displayText: "LinkedIn",
    color: "text-blue-500",
  },
  {
    href: "https://www.github.com/vinhhao-truong",
    icon: <GithubIcon className="text-black" />,
    displayText: "GitHub",
    color: "text-white-theme",
  },
];

interface ContactProps extends ReactProps {}
const Contact: React.FC<ContactProps> = () => {
  const contactRef = useRef<HTMLDivElement>(null);

  const dispatch = useDispatch();
  const { colors } = useSelector(selectGlobalState);

  const [isLeft, setIsLeft] = useState<boolean | null>(null);
  const [isFormSending, setIsFormSending] = useState<boolean>(false);

  const responsive = useResponsive();
  const isXs = responsive === "xs";
  const isSm = responsive === "sm";
  const isMd = responsive === "md";

  const [emailInput, setEmailInput] = useState<string>("");
  const [messageInput, setMessageInput] = useState<string>("");

  const handleInput =
    (
      type: string
    ): React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> =>
    (e) => {
      e.preventDefault();
      if (type === "email") {
        setEmailInput(e.target.value);
      }
      if (type === "message") {
        setMessageInput(e.target.value);
      }
    };

  const handleFormSubmit: React.FormEventHandler<HTMLFormElement> = async (
    e
  ) => {
    e.preventDefault();
    dispatch(startLoading());
    setIsFormSending(true);
    try {
      if (emailInput && messageInput) {
        const response = await axios.post("/api/contact-form", {
          email: emailInput,
          message: messageInput,
        });

        const resData: ResponseData = await response.data;
        console.log(resData);

        setEmailInput("");
        setMessageInput("");

        // console.log(messageInput);
      }
    } catch (err) {
      console.log(err);
    }
    setIsFormSending(false);
    dispatch(stopLoading());
  };

  return (
    <Section
      ref={contactRef}
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
          className="md:w-[49.5%] md:flex md:flex-col md:justify-center text-xs sm:text-sm lg:text-xl relative"
        >
          {/* {isLeft === false && <TopLayer />} */}
          {contactUrlList.map((contact: ContactUrl, idx: number) => {
            const isEmailHref = contact.href.includes("mailto");
            const isTelHref = contact.href.includes("tel");
            const isUrlHref = contact.href.includes("https");

            return (
              <motion.div
                className="relative flex items-center py-1 md:py-2"
                key={`contact-item-${idx}`}
              >
                <Link href={contact.href}>
                  <motion.a
                    href={contact.href}
                    target={isEmailHref || isTelHref ? "_self" : "_blank"}
                    className="flex items-center mr-2"
                    animate={
                      isLeft === true || isLeft === null || isXs || isSm
                        ? { position: "relative" }
                        : { x: "5rem" }
                    }
                  >
                    <span className="p-1 mr-2 rounded-full md:mr-4 bg-white-theme md:hover:brightness-90">
                      {contact.icon}
                    </span>{" "}
                    <div
                      className={`${contact.color} md:whitespace-nowrap md:hover:brightness-75`}
                    >
                      {contact.displayText}
                      {(isLeft || isLeft === null || isXs || isSm) && ":"}
                    </div>
                  </motion.a>
                </Link>

                <Link href={contact.href}>
                  <motion.a
                    href={contact.href}
                    target={isEmailHref || isTelHref ? "_self" : "_blank"}
                    className={`md:whitespace-nowrap hover:underline active:text-${contact.color}`}
                    animate={
                      isLeft === true || isLeft === null || isXs || isSm
                        ? { ...fades.fadeIn }
                        : {
                            ...fades.fadeOut,
                            display: "none",
                          }
                    }
                  >
                    {isEmailHref && "vinhhao.truong.52@gmail.com"}
                    {isTelHref && "(+61) 434109621"}
                    {isUrlHref && contact.href.slice(12)}
                  </motion.a>
                </Link>
              </motion.div>
            );
          })}
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
          className={`w-full md:w-[49.5%] ${
            !isLeft ? "md:p-5" : "md:p-4"
          } relative`}
        >
          {/* {isLeft === true && <TopLayer />} */}
          <h2 className="mb-3 text-2xl font-semibold text-blue-theme">
            Notify Me
          </h2>
          <form
            onSubmit={handleFormSubmit}
            className="flex flex-col justify-center w-full"
          >
            <input
              className="w-full mb-3 md:w-1/2 arnolio-input"
              type="email"
              placeholder="Your email here..."
              onChange={handleInput("email")}
              value={emailInput}
              required
            />
            <textarea
              className="w-full h-32 mb-3 arnolio-input arnolio-textarea"
              placeholder="Your message here..."
              onChange={handleInput("message")}
              value={messageInput}
              required
            ></textarea>
            <motion.button
              type="submit"
              className="flex items-center justify-between px-4 py-1 mx-auto rounded-lg bg-blue-theme text-white-theme"
              whileHover={{
                ...scales.scaleUp,
                // color: colors["white-theme"],
                // backgroundColor: colors["blue-theme"],
                transition: {
                  duration: 0.1,
                  ease: "easeIn",
                },
              }}
            >
              {isFormSending ? "Sending..." : "Send"}
            </motion.button>
          </form>
        </motion.div>
      </Container>
    </Section>
  );
};

export default Contact;
