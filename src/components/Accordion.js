import React, { useState, useRef } from "react";
import "./Accordion.css";
import Chevron from "./Chevron";
import ActionBtn from "./ActionBtn";

const Accordion = (props) => {
  const [setActive, setActiveState] = useState("");
  const [setHeight, SetHeightState] = useState("0px");
  const [setRotate, SetRotateState] = useState("accordion_icon");
  const content = useRef(null);

  const toggleAccordion = () => {
    setActiveState(setActive === "" ? "active" : "");
    SetHeightState(
      setActive === "active" ? "0px" : `${content.current.scrollHeight}px`
    );
    SetRotateState(
      setActive === "active" ? "accordion_icon" : "accordion_icon rotate"
    );
  };

  return (
    <div className="accordion_section">
      <button  className={`accordion ${setActive}`} onClick={() => {toggleAccordion(); props.ratingId() }}>
        <p className="accordion_title">{props.title}</p>
        <Chevron className={`${setRotate}`} width={10} fill={"#777"} />
      </button>
      <div
        className="accordion_content"
        ref={content}
        style={{ maxHeight: `${setHeight}` }}
      >
        <p>Released: {props.release}</p>
        <p>Directed By: {props.directors}</p>
        <p>Rated: {props.rated}</p>
        <ActionBtn onClick={props.edit} label="Edit" />
        <ActionBtn onClick={props.onClick} label="Delete" />
        <div
          className="accordion_text"
          dangerouslySetInnerHTML={{ __html: props.content }}
        />
      </div>
    </div>
  );
};

export default Accordion;
