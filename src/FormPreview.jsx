import React, { useState } from "react";
import Rating from "@mui/material/Rating";

const FormPreview = () => {
  const [jsonInput, setJsonInput] = useState("");
  const [formFields, setFormFields] = useState([]);
  const [formValues, setFormValues] = useState({});

  const handleJsonInputChange = (event) => {
    setJsonInput(event.target.value);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    try {
      const parsedJson = JSON.parse(jsonInput);
      setFormFields(parsedJson);
      setFormValues({});
    } catch (error) {
      console.error("Invalid JSON input:", error);
    }
    console.log("Form Values:", formValues);
  };

  const handleFormInputChange = (event) => {
    const { name, value, type, files, checked } = event.target;
    if (type === "file") {
      const file = files[0];
      const maxUploadSizeInMB = formFields
        .flatMap((section) => section.fields)
        .find((field) => field.label === name)?.maxUploadSize;

      const allowedTypes = formFields
        .flatMap((section) => section.fields)
        .find((field) => field.label === name)?.allowedTypes;

      if (
        maxUploadSizeInMB &&
        file &&
        file.size > maxUploadSizeInMB * 1024 * 1024
      ) {
        console.log("File size exceeds the maximum upload size.");
      } else if (
        allowedTypes &&
        file &&
        !allowedTypes.some((type) => file.name.toLowerCase().endsWith(type))
      ) {
        console.log("File type not allowed.");
      } else {
        setFormValues((prevState) => ({
          ...prevState,
          [name]: file,
        }));
      }
    } else if (type === "checkbox") {
      const checkboxName = name;
      const checkboxValue = event.target.value;
      setFormValues((prevState) => {
        if (prevState[checkboxName]) {
          const updatedValues = prevState[checkboxName].includes(checkboxValue)
            ? prevState[checkboxName].filter((value) => value !== checkboxValue)
            : [...prevState[checkboxName], checkboxValue];
          return {
            ...prevState,
            [checkboxName]: updatedValues,
          };
        } else {
          return {
            ...prevState,
            [checkboxName]: [checkboxValue],
          };
        }
      });
    } else {
      setFormValues((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  return (
    <div>
      <h1>Form Preview</h1>
      <button
        onClick={() => {
          try {
            const parsedJson = JSON.parse(localStorage.getItem("data"));
            setFormFields(parsedJson);
            setFormValues({});
          } catch (error) {
            console.error("Invalid JSON input:", error);
          }
          console.log("Form Values:", formValues);
        }}
      >
        Preview Form
      </button>
      <hr />
      <form onSubmit={handleFormSubmit}>
        {formFields.map((section) => (
          <div key={section.sectionName}>
            <h3>{section.sectionName}</h3>
            <h4>{section.sectionDesc}</h4>
            {section.fields.map((field, index) => (
              <div key={index}>
                <label>{field.label}:</label>
                {field.type === "select" ? (
                  <select
                    name={field.label}
                    value={formValues[field.label] || ""}
                    onChange={handleFormInputChange}
                  >
                    <option value="">Select an option</option>
                    {field.options.map((option, optionIndex) => (
                      <option key={optionIndex} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                ) : field.type === "file" ? (
                  <div>
                    {formValues[field.label] ? (
                      <div>
                        {formValues[field.label].type.startsWith("image/") ? (
                          <img
                            src={URL.createObjectURL(formValues[field.label])}
                            alt="Preview"
                            style={{ height: "200px" }}
                          />
                        ) : (
                          <span>{formValues[field.label].name}</span>
                        )}
                      </div>
                    ) : (
                      <input
                        type="file"
                        name={field.label}
                        onChange={handleFormInputChange}
                        accept={field.allowedTypes?.join(",")}
                      />
                    )}
                  </div>
                ) : field.type === "rating" ? (
                  <div>
                    <Rating
                      name={field.label}
                      value={formValues[field.label] || 0}
                      onChange={(_, value) =>
                        handleFormInputChange({
                          target: { name: field.label, value },
                        })
                      }
                    />
                  </div>
                ) : field.type === "short-text" ? (
                  <input
                    required={field.required}
                    type="text"
                    name={field.label}
                    value={formValues[field.label] || ""}
                    onChange={handleFormInputChange}
                  />
                ) : field.type === "long-text" ? (
                  <div>
                    <textarea
                      required={field.required}
                      name={field.label}
                      value={formValues[field.label] || ""}
                      onChange={handleFormInputChange}
                      maxLength={field.maxLength}
                    />
                    {field.maxLength && (
                      <span>
                        {formValues[field.label]?.length || 0}/{field.maxLength}
                      </span>
                    )}
                  </div>
                ) : field.type === "checkbox" ? (
                  <>
                    {field.options.map((option, optionIndex) => (
                      <div key={optionIndex}>
                        <label>
                          <input
                            type="checkbox"
                            name={field.label}
                            value={option}
                            checked={
                              formValues[field.label]?.includes(option) || false
                            }
                            onChange={handleFormInputChange}
                          />
                          {option}
                        </label>
                      </div>
                    ))}
                  </>
                ) : field.type === "date" ? (
                  <input
                    required={field.required}
                    type="date"
                    name={field.label}
                    value={formValues[field.label] || ""}
                    onChange={handleFormInputChange}
                  />
                ) : field.type === "time" ? (
                  <input
                    required={field.required}
                    type="time"
                    name={field.label}
                    value={formValues[field.label] || ""}
                    onChange={handleFormInputChange}
                  />
                ) : (
                  <input
                    required={field.required}
                    type={field.type}
                    name={field.label}
                    value={formValues[field.label] || ""}
                    onChange={handleFormInputChange}
                  />
                )}
                {field.includeComment === true && <div> {field.comment}</div>}
              </div>
            ))}
            <hr />
          </div>
        ))}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default FormPreview;
