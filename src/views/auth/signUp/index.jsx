/* eslint-disable */
/*!
  _   _  ___  ____  ___ ________  _   _   _   _ ___
 | | | |/ _ \|  _ \|_ _|__  / _ \| \ | | | | | |_ _|
 | |_| | | | | |_) || |  / / | | |  \| | | | | || |
 |  _  | |_| |  _ < | | / /| |_| | |\  | | |_| || |
 |_| |_|\___/|_| \_\___/____\___/|_| \_|  \___/|___|

=========================================================
* Horizon UI - v1.1.0
=========================================================

* Product Page: https://www.horizon-ui.com/
* Copyright 2023 Horizon UI (https://www.horizon-ui.com/)

* Designed and Coded by Simmmple

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/

import React from "react";
import { NavLink, useHistory } from "react-router-dom";
// Chakra imports
import {
  Box,
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Icon,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  Select,
  useColorModeValue,
} from "@chakra-ui/react";
// Custom components
import { HSeparator } from "components/separator/Separator";
import DefaultAuth from "layouts/auth/Default";
// Assets
import illustration from "assets/img/auth/auth.png";
import { FcGoogle } from "react-icons/fc";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { RiEyeCloseLine } from "react-icons/ri";
// Firebase
import { auth } from "../../../firebase";
import {createUserWithEmailAndPassword, onAuthStateChanged} from "firebase/auth";
import { db } from "../../../firebase";
import {
  doc,
  setDoc,
  Timestamp,
  addDoc,
  collection,
  updateDoc,
  arrayUnion,
} from "firebase/firestore";
// UUID
import { v4 as uuid } from "uuid";

function SignUp() {
  // Chakra color mode
  const textColor = useColorModeValue("navy.700", "white");
  const textColorSecondary = "gray.400";
  const textColorDetails = useColorModeValue("navy.700", "secondaryGray.600");
  const textColorBrand = useColorModeValue("brand.500", "white");
  const brandStars = useColorModeValue("brand.500", "brand.400");
  const googleBg = useColorModeValue("secondaryGray.300", "whiteAlpha.200");
  const googleText = useColorModeValue("navy.700", "white");
  const googleHover = useColorModeValue(
    { bg: "gray.200" },
    { bg: "whiteAlpha.300" }
  );
  const googleActive = useColorModeValue(
    { bg: "secondaryGray.300" },
    { bg: "whiteAlpha.200" }
  );
  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);

  const genderOptions = [
    { value: "Male", label: "Male" },
    { value: "Female", label: "Female" },
  ];

  // Process Sign Up
  const [err, setErr] = React.useState(false);

  const [fullName, setFullName] = React.useState("");
  const [nickName, setNickName] = React.useState("");
  const [birthDay, setBirthDay] = React.useState("");
  const [gender, setGender] = React.useState("");
  const [phoneNum, setPhoneNum] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const history = useHistory();
  const handleSignUp = async () => {
    const timestampDate = new Date(birthDay);
    const formattedBirth = timestampDate.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    console.log("fullName: " + fullName);
    console.log("nickName: " + nickName);
    console.log("birthDay: " + formattedBirth);
    console.log("gender: " + gender);
    console.log("phoneNum: " + phoneNum);
    console.log("email: " + email);
    console.log("password: " + password);
    try {
      // create email password auth
      const userValue = await createUserWithEmailAndPassword(auth, email, password);

      // create firestore
      const docData = {
        userDetails: arrayUnion({
          uuid: userValue.user.uid,
          fullName: fullName,
          nickName: nickName,
          birth: Timestamp.fromDate(new Date(formattedBirth)),
          gender: gender,
          phone: phoneNum,
          emailAddress: email,
        }),
        // arrayExample: [5, true, "hello"],
        // booleanExample: true,
        // dateExample: Timestamp.fromDate(new Date("December 10, 1815")),
        // nullExample: null,
        // numberExample: 3.14159265,
        // objectExample: {
        //   a: 5,
        //   b: {
        //     nested: "foo",
        //   },
        // },
        // stringExample: "Hello world!",
        // uuid: uid,
      };
      await updateDoc(doc(db, "user", "userProfiles"), docData);
      history.push("/");
    } catch (err) {
      setErr(true);
    }
  };

  return (
    <DefaultAuth illustrationBackground={illustration} image={illustration}>
      <Flex
        maxW={{ base: "100%", md: "max-content" }}
        w="100%"
        mx={{ base: "auto", lg: "0px" }}
        me="auto"
        h="100%"
        alignItems="start"
        justifyContent="center"
        mb={{ base: "30px", md: "60px" }}
        px={{ base: "25px", md: "0px" }}
        mt={{ base: "40px", md: "14vh" }}
        flexDirection="column"
      >
        <Box me="auto">
          <Heading color={textColor} fontSize="36px" mb="10px">
            Sign Up
          </Heading>
          <Text
            mb="36px"
            ms="4px"
            color={textColorSecondary}
            fontWeight="400"
            fontSize="md"
          >
            Enter your email and password to sign up!
          </Text>
        </Box>
        <Flex
          zIndex="2"
          direction="column"
          w={{ base: "100%", md: "420px" }}
          maxW="100%"
          background="transparent"
          borderRadius="15px"
          mx={{ base: "auto", lg: "unset" }}
          me="auto"
          mb={{ base: "20px", md: "auto" }}
        >
          <FormControl>
            <FormLabel
              display="flex"
              ms="4px"
              fontSize="sm"
              fontWeight="500"
              color={textColor}
              mb="8px"
            >
              Full Name<Text color={brandStars}>*</Text>
            </FormLabel>
            <Input
              id="fullName"
              isRequired={true}
              variant="auth"
              fontSize="sm"
              ms={{ base: "0px", md: "0px" }}
              type="text"
              placeholder="My Full Name"
              mb="24px"
              fontWeight="500"
              size="lg"
              onChange={(e) => setFullName(e.target.value)}
            />
            <FormLabel
              display="flex"
              ms="4px"
              fontSize="sm"
              fontWeight="500"
              color={textColor}
              mb="8px"
            >
              Nickname<Text color={brandStars}>*</Text>
            </FormLabel>
            <Input
              id="nickName"
              isRequired={true}
              variant="auth"
              fontSize="sm"
              ms={{ base: "0px", md: "0px" }}
              type="text"
              placeholder="myNickname"
              mb="24px"
              fontWeight="500"
              size="lg"
              onChange={(e) => setNickName(e.target.value)}
            />
            <FormLabel
              display="flex"
              ms="4px"
              fontSize="sm"
              fontWeight="500"
              color={textColor}
              mb="8px"
            >
              Birthday<Text color={brandStars}>*</Text>
            </FormLabel>
            <Input
              id="birthDay"
              isRequired={true}
              variant="auth"
              fontSize="sm"
              ms={{ base: "0px", md: "0px" }}
              type="date"
              placeholder="birthday"
              mb="24px"
              fontWeight="500"
              size="lg"
              onChange={(e) => setBirthDay(e.target.value)}
            />
            <FormLabel
              display="flex"
              ms="4px"
              fontSize="sm"
              fontWeight="500"
              color={textColor}
              mb="8px"
            >
              Gender<Text color={brandStars}>*</Text>
            </FormLabel>
            <Box p={1}>
              <Select
                placeholder="Select your gender"
                onChange={(e) => setGender(e.target.value)}
              >
                {genderOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </Select>
            </Box>
            <FormLabel
              display="flex"
              ms="4px"
              fontSize="sm"
              fontWeight="500"
              color={textColor}
              mb="8px"
            >
              Phone<Text color={brandStars}>*</Text>
            </FormLabel>
            <Input
              id="phoneNum"
              isRequired={true}
              variant="auth"
              fontSize="sm"
              ms={{ base: "0px", md: "0px" }}
              type="text"
              placeholder="08*******321"
              mb="24px"
              fontWeight="500"
              size="lg"
              onChange={(e) => setPhoneNum(e.target.value)}
            />
            <FormLabel
              display="flex"
              ms="4px"
              fontSize="sm"
              fontWeight="500"
              color={textColor}
              mb="8px"
            >
              Email<Text color={brandStars}>*</Text>
            </FormLabel>
            <Input
              id="emailAddress"
              isRequired={true}
              variant="auth"
              fontSize="sm"
              ms={{ base: "0px", md: "0px" }}
              type="email"
              placeholder="my@email.com"
              mb="24px"
              fontWeight="500"
              size="lg"
              onChange={(e) => setEmail(e.target.value)}
            />
            <FormLabel
              ms="4px"
              fontSize="sm"
              fontWeight="500"
              color={textColor}
              display="flex"
            >
              Password<Text color={brandStars}>*</Text>
            </FormLabel>
            <InputGroup size="md">
              <Input
                id="password"
                isRequired={true}
                fontSize="sm"
                placeholder="Min. 8 characters"
                mb="24px"
                size="lg"
                type={show ? "text" : "password"}
                variant="auth"
                onChange={(e) => setPassword(e.target.value)}
              />
              <InputRightElement display="flex" alignItems="center" mt="4px">
                <Icon
                  color={textColorSecondary}
                  _hover={{ cursor: "pointer" }}
                  as={show ? RiEyeCloseLine : MdOutlineRemoveRedEye}
                  onClick={handleClick}
                />
              </InputRightElement>
            </InputGroup>
            <Button
              fontSize="sm"
              variant="brand"
              fontWeight="500"
              w="100%"
              h="50"
              mb="24px"
              onClick={handleSignUp}
            >
              Sign Up
            </Button>
          </FormControl>
          <Flex
            flexDirection="column"
            justifyContent="center"
            alignItems="start"
            maxW="100%"
            mt="0px"
          >
            <Text color={textColorDetails} fontWeight="400" fontSize="14px">
              Already have an account?
              <NavLink to="/auth/sign-in">
                <Text
                  color={textColorBrand}
                  as="span"
                  ms="5px"
                  fontWeight="500"
                >
                  Login
                </Text>
              </NavLink>
            </Text>
          </Flex>
        </Flex>
      </Flex>
    </DefaultAuth>
  );
}

export default SignUp;
