import React, { useState } from "react";
import RichTextEditor from "react-rte";

const MyStatefulEditor = ({ onChange }) => {
  const [value, setValue] = useState(RichTextEditor.createEmptyValue());
  const [parsedData, setParsedData] = useState("");

  function handleChange(value) {
    let markdown = value.toString("html");
    handleRegex(markdown);
    setValue(value);

    if (onChange) {
      onChange(markdown);
    }
  }

  function handleRegex(markdown) {
    let dataArray = markdown.match(/^.*<li>.*/gm);

    let parsedArray = findParentAndChildren(dataArray);
    console.log(parsedArray);
    setParsedData(JSON.stringify(parsedArray));
  }

  function findParentAndChildren(array) {
    let parsed = [];
    let children = [];

    array.forEach((each) => {
      let parent = each.split("<")[0].length === 2;
      let child = each.split("<")[0].length === 6;
      let cleanedData = pullValue(each);

      if (parent) {
        if (children.length > 0) {
          parsed.push(children);
        }
        children = [];

        parsed.push(cleanedData);
      } else if (child) {
        children.push(cleanedData);
      }
    });

    return parsed;
  }

  function pullValue(string) {
    return string.replace(/^.*<li>(.[\w\d .]*).*/gm, "$1");
  }

  return (
    <div>
      <RichTextEditor value={value} onChange={handleChange} />
      <br />
      <br />
      <br />
      <textarea
        name="textarea"
        className="textarea"
        value={value.toString("html")}
      />
      {parsedData}
    </div>
  );
};

export default MyStatefulEditor;
