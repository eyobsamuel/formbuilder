import React, { useState } from "react";
import FormBuilder from "./FormBuilder";
import FormPreview from "./FormPreview";
import "./styles.css";

const App = () => {
  return (
    <div>
      <FormBuilder />
      <hr />
      <hr />
      <hr />
      <FormPreview />
    </div>
  );
};

export default App;
