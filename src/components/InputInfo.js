import React, { useState, useEffect } from "react";
import { addDoc, collection, doc, setDoc } from "firebase/firestore";
import { db, storage } from "../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
export default function InputInfo({ personInfo, setPersonInfo, wordContain2 }) {
  const [initialValues, setInitialValues] = useState({
    first_name: "",
    username: "",
    pronouns: "",
    img: "",
    isHosting: false,
    contact: [],
  });

  const [inputValue, setInputValue] = useState("");
  const [contactData, setContacData] = useState([]);
  const [selectOption, setSelectOption] = useState(false);
  const [submissionSucces, setSubmissionSuccess] = useState(false);
  const [errorUser, setErrorUser] = useState(false);
  const [areInputsEmpty, setAreImputsEmpty] = useState(null);

  useEffect(() => {
    const uploadFile = () => {
      const name = new Date().getTime() + initialValues.first_name;
      console.log(name);
      const sotrageRef = ref(storage, initialValues.first_name);
    };
  }, []);

  const addPerson = async (e) => {
    e.preventDefault();
    try {
      const res = await setDoc(doc(db, "users", res.user.uid), {
        ...personInfo,
      });
      console.log("res", res);
    } catch (err) {
      console.log(err);
    }
  };
  // const addPerson = async (e) => {
  //   e.preventDefault();
  //   console.log("printed");
  //   try {
  //     const res = await addDoc(collection(db, "cities"), {
  //       name: "Los Angeles",
  //       state: "CA",
  //       country: "USA",
  //     });
  //     console.log("res", res);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  // const addPerson = () => {
  //   setSubmissionSuccess(true);
  // };
  // const addPerson = async (e) => {
  //   e.preventDefault();

  //   if (initialValues === "" || (!contactData.length > 0 && inputValue === ""))
  //     return alert("please make sure all fields are filled");

  //   const newArr = personInfo.slice();

  //   newArr.splice(0, 0, {
  //     ...initialValues,
  //     isHosting: selectOption,
  //     contact:
  //       contactData.length > 1 ? contactData : [...contactData, inputValue],
  //   });

  //   setPersonInfo(newArr);

  //   setInitialValues({
  //     first_name: "",
  //     username: "",
  //     pronouns: "",
  //     isHosting: false,
  //     isMatched: false,
  //     contact: [],
  //   });
  //   setInputValue("");
  // };

  const addContact = (e) => {
    e.preventDefault();
    if (inputValue === "")
      return alert("please dont forget to add a way to reach you");
    setContacData([...contactData, inputValue]);
    setInputValue("");
  };

  const changeHandler = (e) => {
    e.preventDefault();
    let isExisting =
      e.target.name === "username"
        ? personInfo.some((prs) => prs.username === e.target.value)
        : "";
    setErrorUser(isExisting);
    console.log("initial val", [e.target.name]);
    setAreImputsEmpty(initialValues[e.target.name] === "");
    setInitialValues({ ...initialValues, [e.target.name]: e.target.value });
  };

  const contactChangeHandler = (e) => {
    e.preventDefault();
    setInputValue(e.target.value);
  };

  const removeContact = (e, id) => {
    e.preventDefault();
    const removeId = contactData.indexOf(contactData[id]);
    const filteredItems = contactData.filter(function (rem, l) {
      return l !== removeId;
    });
    setContacData(filteredItems);
  };

  const wordContain = (str) => {
    console.log("sttt", str);
    if (str == "twitter") return;
    var newstr = str.split("twitter.com/")[1].split("/")[0];
    return newstr;
  };

  // const wordContain2 = (str) => {
  //   switch (true) {
  //     case str.includes("twitter"):
  //       return (
  //         <>
  //           <i className="fa fa-twitter" style={{ padding: "5px" }}></i>
  //           {str == "twitter" || str == "twitter.com"
  //             ? ""
  //             : str.split("twitter.com/")[1].split("/")[0]}
  //         </>
  //       );
  //     case str.includes("instagram"):
  //       return (
  //         <>
  //           <i className="fa fa-instagram" style={{ padding: "5px" }}></i>
  //           {str == "instagram" || str == "instagram.com"
  //             ? ""
  //             : str.split("instagram.com/")[1].split("/")[0]}
  //         </>
  //       );
  //     case str.includes("@"):
  //       return (
  //         <>
  //           <i className="fa fa-envelope" style={{ padding: "5px" }}></i>
  //           {str}
  //         </>
  //       );
  //     default:
  //       return str;
  //   }
  // };

  return (
    <div
      style={{
        minHeight: "40vh",
        textAlign: submissionSucces ? "-webkit-center" : "unset",
      }}
    >
      {submissionSucces ? (
        <div className="successSubmission">Success</div>
      ) : (
        <section>
          <h2>Put your info here</h2>
          <form onSubmit={addPerson} className="hero-form-container">
            <div className="profile-input">
              {/* <div className="input-container"> */}
              {Object.keys(initialValues)?.map((r, i) => {
                return (
                  <React.Fragment key={i}>
                    {r === "contact" ? (
                      <div style={{ gridColumn: "1 / 4" }}>
                        <div
                          className="contact_style"
                          style={{
                            gridTemplateColumns: "1fr 1fr",
                            display: "grid",
                            gap: "20px",
                          }}
                        >
                          <div
                            className="contact-grid"
                            style={{
                              display: "grid",
                              gridTemplateColumns: "4fr 1fr",
                              // gridTemplateColumns: " 5fr 1fr",
                              gap: "20px",
                              // margin: "20px auto",
                            }}
                          >
                            <div>
                              <label>{r}</label>
                              <input
                                placeholder="any social media link or email "
                                type="text"
                                value={inputValue}
                                onChange={contactChangeHandler}
                              />
                            </div>

                            <button
                              onClick={addContact}
                              style={{
                                borderRadius: "10px",
                                height: "50px",
                                border: "none",
                                background: "rgb(32, 231, 92)",
                                position: "relative",
                                top: "20px",
                              }}
                            >
                              Add
                            </button>
                          </div>
                          <div
                            style={{
                              display: "inline-flex",
                              flexFlow: "wrap",
                              // display: "grid",
                              // gridTemplateColumns: "repeat(3, 1fr)",
                            }}
                          >
                            {contactData?.map((item, j) => (
                              <div
                                key={j}
                                style={{
                                  display: "inline-flex",
                                  height: "fit-content",
                                }}
                              >
                                <div style={{ padding: "0 10px" }}>
                                  {/* {item.includes("twitter") ? (
                                    <>
                                      <i className="fa fa-twitter"></i>
                                      {wordContain(item)}
                                    </>
                                  ) : (
                                    "heh"
                                  )} */}
                                  {wordContain2(item)}
                                </div>

                                {/* <span> */}
                                <a
                                  href="#"
                                  aria-label="Close"
                                  className="close"
                                  onClick={(e) => removeContact(e, j)}
                                />
                                {/* </span> */}
                              </div>
                            ))}
                          </div>
                        </div>
                        {/* <div>
                          {contactData?.map((item, j) => (
                            <div key={j}>
                              <div>{item}</div>
                              <span>
                                <button>🗑️</button>
                              </span>
                            </div>
                          ))}
                        </div> */}
                      </div>
                    ) : r === "isHosting" ? (
                      <div>
                        <label>Are You Hosting or Looking</label>

                        <select
                          style={{ height: "50px" }}
                          onChange={(e) =>
                            setSelectOption(Boolean(e.target.value))
                          }
                        >
                          <option value={false}>looking</option>
                          <option value={true}>hosting</option>
                        </select>
                      </div>
                    ) : r === "img" ? (
                      <div>
                        <label>Upload your profile pic</label>
                        <input
                          type="file"
                          id="img"
                          name="img"
                          accept="image/*"
                        />
                      </div>
                    ) : (
                      <div>
                        <label>{r}</label>
                        {r === "username" && errorUser && (
                          <span
                            style={{
                              padding: "5px",
                              color: "#ff7c7c",
                              fontSize: ".8rem",
                            }}
                          >
                            already exists, try again
                          </span>
                        )}
                        <input
                          placeholder={r}
                          type="text"
                          name={r}
                          value={initialValues.r}
                          onChange={changeHandler}
                        />
                      </div>
                    )}
                  </React.Fragment>
                );
              })}

              {/* reference: https://codesandbox.io/s/elastic-wave-36ous?fontsize=14&hidenavigation=1&theme=dark&file=/src/App.js:847-854 */}
              {/* </div>// */}
            </div>
            {/* add ability to add multiple inputs sets */}

            <div>
              <button
                className="form-btn"
                type="submit"
                style={{ width: "100%", padding: "1%" }}
                disabled={errorUser}
              >
                Send
              </button>
            </div>
          </form>
        </section>
      )}
    </div>
  );
}
