import React from "react";

const DetailedInfo = (props) => {
  const { state } = props.location;

  const renderDetailedInfo = Object.keys(state).map((item) => (
    <pre>
      <strong>
        {item.replace(item.charAt(0), item.charAt(0).toUpperCase())}:{" "}
      </strong>{" "}
      {state[item]}
    </pre>
  ));
  return (
    <div style={{ padding: "20px", marginLeft: "40px" }}>
      {renderDetailedInfo}
    </div>
  );
};

export default DetailedInfo;
