import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Box,
  Container,
  Row,
  Column,
  FooterLink,
  Heading,
} from "./FooterStyles";
import {
  faYoutube,
  faFacebook,
  faTwitter,
  faInstagram
} from "@fortawesome/free-brands-svg-icons";

  
const Footer = () => {
  return (
    <Box className="footer-pin">
      <Container>
        <Row>
          <Column>
            <Heading>Follow Us</Heading>
            <FooterLink href="#">
              <i className="fab fa-facebook-f">
                <span style={{ marginLeft: "10px" ,marginRight:"10px"}}>
                  Facebook
                </span>
                <FontAwesomeIcon icon={faFacebook} size="1x" />
              </i>
            </FooterLink>
            <FooterLink href="#">
              <i className="fab fa-instagram">
                <span style={{ marginLeft: "10px" ,marginRight:"10px"}}>
                  Instagram
                </span>
                <FontAwesomeIcon icon={faInstagram} size="1x" />
              </i>
            </FooterLink>
            <FooterLink href="#">
              <i className="fab fa-twitter">
                <span style={{ marginLeft: "10px" ,marginRight:"10px"}}>
                  Twitter
                </span>
                <FontAwesomeIcon icon={faTwitter} size="1x" />
              </i>
            </FooterLink>
            <FooterLink href="#">
              <i className="fab fa-youtube">
                <span style={{ marginLeft: "10px" ,marginRight:"10px"}}>
                  Youtube
                </span>
                <FontAwesomeIcon icon={faYoutube} size="1x" />
              </i>
            </FooterLink>
          </Column>
        </Row>
      </Container>
    </Box>
  );
};
export default Footer;