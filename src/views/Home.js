import React from "react";
import InputInfo from "../components/InputInfo";
import ListedProfiles from "../components/ListedProfiles";

export default function Home({ personInfo, setPersonInfo }) {
  const wordContain2 = (str) => {
    switch (true) {
      case str.includes("twitter"):
        return (
          <>
            <i className="fa fa-twitter" style={{ padding: "5px" }}></i>
            {str == "twitter" || str == "twitter.com"
              ? ""
              : str.split("twitter.com/")[1].split("/")[0]}
          </>
        );
      case str.includes("instagram"):
        return (
          <>
            <i className="fa fa-instagram" style={{ padding: "5px" }}></i>
            {str == "instagram" || str == "instagram.com"
              ? ""
              : str.split("instagram.com/")[1].split("/")[0]}
          </>
        );
      case str.includes("@"):
        return (
          <>
            <i className="fa fa-envelope" style={{ padding: "5px" }}></i>
            {str}
          </>
        );
      default:
        return <>{str}</>;
    }
  };
  return (
    <>
      <h1>Roomie-Finder</h1>
      <InputInfo
        personInfo={personInfo}
        setPersonInfo={setPersonInfo}
        wordContain2={wordContain2}
      />
      <ListedProfiles
        personInfo={personInfo}
        setPersonInfo={setPersonInfo}
        wordContain2={wordContain2}
      />
    </>
  );
}
