import React, { useEffect, useState } from "react";
import { users } from "../api/fakeprofiles";

const inputfields = [
  { label: "First Name", value: "" },
  { label: "Last Name", value: "" },
  { label: "Pronouns", value: "" },
  { label: "Contact", value: "" },
  { label: "Contact2", value: ["ginger", "arrow", "car"] },
];
const personfield = [
  { first_name: "fiona", last_name: "", pronouns: "she", contact: [] },
  { first_name: "dude", last_name: "", pronouns: "he", contact: [] },
];
export default function InputInfo() {
  const [contactInfo, setContactInfo] = useState(
    Array(inputfields)[0][inputfields.length - 1].value.length
  );
  const [personInfo, setPersonInfo] = useState(users);
  const [countInputs, setCountInputs] = useState(1);

  const [inputValues2, setInputValues2] = useState({
    first_name: "",
    last_name: "",
    pronouns: "",
    contact: [],
  });

  const addMore = (e) => {
    e.preventDefault();
    setCountInputs(countInputs + 1);
  };

  const addContact = (e) => {
    e.preventDefault();
    setContactInfo(contactInfo + 1);
  };

  const addPerson = (e) => {
    e.preventDefault();
    if (inputValues2 === "") return alert("task name is cool");
    console.log("person info", personInfo);
    console.log("inputval", inputValues2);
    const newArr = personInfo.slice();
    //     newArr.splice(0, 0, { first_name: inputValues2 });
    newArr.splice(0, 0, inputValues2);

    setPersonInfo(newArr);
    setInputValues2("");
  };
  const changeHandler = (e) => {
    e.preventDefault();
    // setInputValues([e.target.name]:e.target.value)
    setInputValues2({ ...inputValues2, [e.target.name]: e.target.value });
  };

  console.log("ponsole", inputValues2);
  return (
    <div style={{ minHeight: "40vh" }}>
      <section>Put your info here</section>
      <section>
        <form>
          <div className="profile-input">
            {/* <div style={{ padding: "0 5%" }}>
              <label>Name</label>
              <input />
            </div>
            <div style={{ padding: "0 5%" }}>
              <label>Last Name</label>
              <input />
            </div>
            <div style={{ padding: "0 5%" }}>
              <label>Pronouns</label>
              <input />
            </div> */}
            {/* {inputfields.map((r, i) => (
              <div style={{ padding: "0 5%" }}>
                <label key={i}>{r}</label>
                <input />
              </div>
            ))} */}

            {inputfields?.map((r, i) => (
              <div key={i} style={{ padding: "0 5%" }}>
                {r.label === "Contact2" ? (
                  <div>
                    {Array.from(Array(contactInfo)).map((c, index) => (
                      <div
                        key={index}
                        style={{ padding: "0 5%", display: "inline-flex" }}
                      >
                        <label>{c}</label>
                        <input />
                        <button>🗑️</button>
                      </div>
                    ))}
                    <button onClick={addContact}>add more</button>
                  </div>
                ) : (
                  <>
                    <label>{r.label}</label>
                    <input />
                  </>
                )}
              </div>
            ))}

            {/* reference: https://codesandbox.io/s/elastic-wave-36ous?fontsize=14&hidenavigation=1&theme=dark&file=/src/App.js:847-854 */}
            <div>
              {/* {Array.from(Array(countInputs)).map((c, index) => (
                <div
                  key={index}
                  style={{ padding: "0 5%", display: "inline-flex" }}
                >
                  <label>Last Name</label>
                  <input />
                  <button>🗑️</button>
                </div>
              ))} */}

              {/* {inputfields.map((c, index) => {
                index === inputfields.length - 1 &&
                  c.field.map((c, index) => (
                    <div
                      key={index}
                      style={{ padding: "0 5%", display: "inline-flex" }}
                    >
                      <label>Last Name</label>
                      <input />
                      <button>🗑️</button>
                    </div>
                  ));
              })} */}

              {Array.from(Array(countInputs)).map((c, index) => (
                <div
                  key={index}
                  style={{ padding: "0 5%", display: "inline-flex" }}
                >
                  <label>Last Name</label>
                  <input />
                  <button>🗑️</button>
                </div>
              ))}
              <button onClick={addMore}>add more</button>
            </div>
          </div>
          {/* add ability to add multiple inputs sets */}

          <div>
            <button style={{ width: "100%", padding: "1%" }}>Send</button>
          </div>
        </form>
      </section>
      {/* <div>
        {inputfields?.map((r, i) => (
          <div key={i} style={{ padding: "0 5%" }}>
            {r.label === "Contact2" ? (
              <div>
                {Array.from(Array(contactInfo)).map((c, index) => (
                  <div
                    key={index}
                    style={{ padding: "0 5%", display: "inline-flex" }}
                  >
                    <label>{c}</label>
                    <input />
                    <button>🗑️</button>
                  </div>
                ))}
                <button onClick={addContact}>add more</button>
              </div>
            ) : (
              <>
                <label>{r.label}</label>
                <input />
              </>
            )}
          </div>
        ))}
      </div> */}
      <div>
        <form onSubmit={addPerson}>
          <input
            type="text"
            name="first_name"
            value={inputValues2.first_name}
            onChange={changeHandler}
          />
          <input
            type="text"
            name="pronouns"
            value={inputValues2.pronouns}
            onChange={changeHandler}
          />
          <button type="submit">submit</button>
        </form>
      </div>
      put input results here
      {personInfo?.map((item) => (
        <div>
          <div>
            {item.first_name} ({item.pronouns})
          </div>
          <div>
            {item.contact.map((stuff) => (
              <span>🍌 {stuff}</span>
            ))}
          </div>
        </div>
      ))}
      {/* {console.log("person info", personInfo)} */}
    </div>
  );
}
