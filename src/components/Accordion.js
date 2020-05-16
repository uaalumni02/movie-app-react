import React, { useState, useRef } from "react";
import "./Accordion.css";
// import Chevron from "./Chevron";

const Accordion = (props) => {
  const [setActive, setActiveState] = useState("");
  const [setHeight, SetHeightState] = useState("0px");

  const content = useRef(null);

  const toggleAccordion = () => {
    setActiveState(setActive === "" ? "active" : "");
    SetHeightState(
      setActive === "active" ? "0px" : `${content.current.scrollHeight}px`
    );
  };

  return (
    <div className="accordion_section">
      <button className={`accordion ${setActive}`} onClick={toggleAccordion}>
        <p className="accordion_title">{props.title}</p>
        {/* <Chevron width={10} fill={"#777"} /> */}
      </button>
      <div
        className="accordion_content"
        ref={content}
        style={{ maxHeight: `${setHeight}` }}
      >
        <p>Released: {props.release}</p>
        <p>Directed By: {props.directors}</p>
        <p>Rated: {props.rated}</p>
        <div
          className="accordion_text"
          dangerouslySetInnerHTML={{ __html: props.content }}
        />
      </div>
    </div>
  );
};

export default Accordion;