import {
  FaAccessibleIcon,
  FaEnvelope,
  FaHome,
  FaPhoneAlt,
} from "react-icons/fa";
import footerLogo from "../../../assets/light-logo.webp";

const Footer = () => {
  return (
    <footer className="bg-[#571F9C] pt-20 pb-10 px-10 md:px-0">
      <div className="max-w-screen-xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        <div className="text-white">
          <img src={footerLogo} alt="" />
          <p>
            Dance is a wordpress theme that is truly multi-purpose with our way
            of taking care your needs.
          </p>
          <p>
            The barrage of shortcodes that works in the pages, makes it the
            better choice for your business.
          </p>
        </div>
        <div>
          <h4 className="text-2xl font-bold text-white mb-3">Opening Hours</h4>
          <ul className="text-white space-y-3">
            <li className="flex gap-2 items-center">
              <FaAccessibleIcon></FaAccessibleIcon> Hip Hop Dance : 07:00 –
              21:00
            </li>
            <li className="flex gap-2 items-center">
              <FaAccessibleIcon></FaAccessibleIcon>Ballet : 09:00 – 21:00
            </li>
            <li className="flex gap-2 items-center">
              <FaAccessibleIcon></FaAccessibleIcon>Break Dance : 18:00 – 24:00
            </li>
            <li className="flex gap-2 items-center">
              <FaAccessibleIcon></FaAccessibleIcon>Salsa : 18:00 – 22:00
            </li>
            <li className="flex gap-2 items-center">
              <FaAccessibleIcon></FaAccessibleIcon>Tab Dancing : 19:00 – 23:00
            </li>
            <li className="flex gap-2 items-center">
              <FaAccessibleIcon></FaAccessibleIcon>Cha Cha : 20:00 – 23:00
            </li>
          </ul>
        </div>
        <div className="text-white">
          <h4 className="text-2xl font-bold text-white mb-3">Contact Us</h4>
          <ul className="space-y-3">
            <li className="flex items-center gap-2">
              <FaHome></FaHome> 72 Pilgrim Avenue, Chevy Chase, MD 20815
            </li>
            <li className="flex items-center gap-2">
              <FaPhoneAlt></FaPhoneAlt> (226) 906-2721 <br /> (671) 925-1352
            </li>
            <li className="flex items-center gap-2">
              <FaEnvelope></FaEnvelope> info@dance.com
            </li>
          </ul>
        </div>
      </div>
      <div className="text-center max-w-screen-xl mx-auto text-white">
        <div className="divider"></div>
        <p>Copyright © 2019. All rights reserved by, Dance Academy</p>
      </div>
    </footer>
  );
};

export default Footer;
