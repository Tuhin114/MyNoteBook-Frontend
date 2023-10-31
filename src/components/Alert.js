import React, { useState } from "react";

function Alert(props) {
  const [showAlert, setShowAlert] = useState(true);

  const capitalize = (word) => {
    return word.charAt(0).toUpperCase() + word.slice(1);
  };

  const handleClose = () => {
    setShowAlert(false);
  };

  return (
    showAlert &&
    props.Alert && (
      <div
        className={`alert alert-${props.Alert.type} alert-dismissible fade show`}
        role="alert"
      >
        <strong>{capitalize(props.Alert.type)}</strong>: {props.Alert.msg}
        <button
          type="button"
          className="btn-close"
          onClick={handleClose}
          aria-label="Close"
        ></button>
      </div>
    )
  );
}

export default Alert;
