import React, { useState } from "react";
import Rating from "@mui/material/Rating";

const FormBuilder = () => {
  const [showAddSec, setShowAddSec] = useState(false);
  const [sections, setSections] = useState([]);
  const [sectionInput, setSectionInput] = useState({});
  const [formFields, setFormFields] = useState([]);
  const [jsonResult, setJsonResult] = useState(null);
  const [optionInput, setOptionInput] = useState("");

  const handleSectionSave = () => {
    setSections([...sections, sectionInput]);
    setShowAddSec(false);
    const formData = [...sections, sectionInput].map((section) => ({
      sectionName: section.sectionName,
      sectionDesc: section.sectionDesc,
      fields: formFields
        .filter((field) => field.section === section.sectionName)
        .map((field) => ({
          label: field.label,
          type: field.type,
          options: field.options || [],
          required: field.required,
          includeComment: field.includeComment || false,
          comment: field.comment || "",
          maxLength: field.maxLength || null,
          maxUploadSize: field.maxUploadSize || null,
          allowedTypes: field.allowedTypes || [],
        })),
    }));
    setJsonResult(JSON.stringify(formData, null, 2));
    localStorage.setItem("data", JSON.stringify(formData, null, 2));
  };

  const handleSectionChange = (event) => {
    const { name, value } = event.target;
    setSectionInput((prevInputs) => ({
      ...prevInputs,
      [name]: value,
    }));
  };

  const handleAddField = (section) => {
    setFormFields([
      ...formFields,
      {
        label: "",
        type: "short-text",
        required: false,
        section,
        options: [],
        includeComment: false,
        comment: "",
        maxLength: null,
        maxUploadSize: null,
        allowedTypes: [],
      },
    ]);
  };

  const handleRemoveField = (index) => {
    const updatedFields = [...formFields];
    updatedFields.splice(index, 1);
    setFormFields(updatedFields);

    const formData = sections.map((section) => ({
      [section.sectionName]: updatedFields
        .filter((field) => field.section === section.sectionName)
        .map((field) => ({
          label: field.label,
          type: field.type,
          options: field.options || [],
          required: field.required,
          includeComment: field.includeComment || false,
          comment: field.comment || "",
          maxLength: field.maxLength || null,
          maxUploadSize: field.maxUploadSize || null,
          allowedTypes: field.allowedTypes || [],
        })),
    }));
    setJsonResult(JSON.stringify(formData, null, 2));
    localStorage.setItem("data", JSON.stringify(formData, null, 2));
  };

  const handleFieldChange = (index, name, value, optionIndex) => {
    const updatedFields = [...formFields];
    if (name === "options") {
      updatedFields[index].options[optionIndex] = value;
    } else if (name === "allowedTypes") {
      const updatedTypes = formFields[index].allowedTypes || [];
      if (value === true) {
        if (!updatedTypes.includes(optionIndex)) {
          updatedTypes.push(optionIndex);
        }
      } else if (value === false) {
        const indexToRemove = updatedTypes.indexOf(optionIndex);
        if (indexToRemove !== -1) {
          updatedTypes.splice(indexToRemove, 1);
        }
      }
      updatedFields[index].allowedTypes = updatedTypes;
    } else {
      updatedFields[index][name] = value;
    }
    setFormFields(updatedFields);

    const formData = sections.map((section) => ({
      sectionName: section.sectionName,
      sectionDesc: section.sectionDesc,
      fields: updatedFields
        .filter((field) => field.section === section.sectionName)
        .map((field) => ({
          label: field.label,
          type: field.type,
          options: field.options || [],
          required: field.required,
          includeComment: field.includeComment || false,
          comment: field.comment || "",
          maxLength: field.maxLength || null,
          maxUploadSize: field.maxUploadSize || null,
          allowedTypes: field.allowedTypes || [],
        })),
    }));
    setJsonResult(JSON.stringify(formData, null, 2));
    localStorage.setItem("data", JSON.stringify(formData, null, 2));
  };

  const handleAddOption = (fieldIndex) => {
    const updatedFields = [...formFields];
    updatedFields[fieldIndex].options.push(optionInput);
    setFormFields(updatedFields);
    setOptionInput("");

    const formData = sections.map((section) => ({
      sectionName: section.sectionName,
      sectionDesc: section.sectionDesc,
      fields: updatedFields
        .filter((field) => field.section === section.sectionName)
        .map((field) => ({
          label: field.label,
          type: field.type,
          options: field.options || [],
          required: field.required,
          includeComment: field.includeComment || false,
          comment: field.comment || "",
          maxLength: field.maxLength || null,
          maxUploadSize: field.maxUploadSize || null,
          allowedTypes: field.allowedTypes || [],
        })),
    }));
    setJsonResult(JSON.stringify(formData, null, 2));
    localStorage.setItem("data", JSON.stringify(formData, null, 2));
  };

  const handleRemoveOption = (fieldIndex, optionIndex) => {
    const updatedFields = [...formFields];
    updatedFields[fieldIndex].options.splice(optionIndex, 1);
    setFormFields(updatedFields);

    const formData = sections.map((section) => ({
      sectionName: section.sectionName,
      sectionDesc: section.sectionDesc,
      fields: updatedFields
        .filter((field) => field.section === section.sectionName)
        .map((field) => ({
          label: field.label,
          type: field.type,
          options: field.options || [],
          required: field.required,
          includeComment: field.includeComment || false,
          comment: field.comment || "",
          maxLength: field.maxLength || null,
          maxUploadSize: field.maxUploadSize || null,
          allowedTypes: field.allowedTypes || [],
        })),
    }));
    setJsonResult(JSON.stringify(formData, null, 2));
    localStorage.setItem("data", JSON.stringify(formData, null, 2));
  };

  const handleDuplicateField = (index) => {
    const updatedFields = [...formFields];
    const fieldToDuplicate = updatedFields[index];
    const duplicatedField = JSON.parse(JSON.stringify(fieldToDuplicate));
    updatedFields.splice(index + 1, 0, duplicatedField);
    setFormFields(updatedFields);

    const formData = sections.map((section) => ({
      sectionName: section.sectionName,
      sectionDesc: section.sectionDesc,
      fields: updatedFields
        .filter((field) => field.section === section.sectionName)
        .map((field) => ({
          label: field.label,
          type: field.type,
          options: field.options || [],
          required: field.required,
          includeComment: field.includeComment || false,
          comment: field.comment || "",
          maxLength: field.maxLength || null,
          maxUploadSize: field.maxUploadSize || null,
          allowedTypes: field.allowedTypes || [],
        })),
    }));
    setJsonResult(JSON.stringify(formData, null, 2));
    localStorage.setItem("data", JSON.stringify(formData, null, 2));
  };

  return (
    <div>
      <h1>New Form</h1>

      {sections.map((section, index) => (
        <div key={index}>
          <h2>{section.sectionName}</h2>

          <form>
            {formFields.map((field, fieldIndex) => {
              if (field.section !== section.sectionName) {
                return null;
              }
              return (
                <div key={fieldIndex}>
                  <label>
                    Question:
                    <input
                      type="text"
                      name="label"
                      value={field.label}
                      onChange={(e) =>
                        handleFieldChange(
                          fieldIndex,
                          e.target.name,
                          e.target.value,
                        )
                      }
                    />
                  </label>
                  <label>
                    Question Type:
                    <select
                      name="type"
                      value={field.type}
                      onChange={(e) =>
                        handleFieldChange(
                          fieldIndex,
                          e.target.name,
                          e.target.value,
                        )
                      }
                    >
                      <option value="short-text">Short Text</option>
                      <option value="long-text">Long Text</option>
                      <option value="select">Select</option>
                      <option value="checkbox">Checkbox</option>
                      <option value="file">File</option>
                      <option value="rating">Rating</option>
                      <option value="date">Date</option>
                      <option value="time">Time</option>
                    </select>
                  </label>
                  <label>
                    Required:
                    <input
                      type="checkbox"
                      name="required"
                      checked={field.required}
                      onChange={(e) =>
                        handleFieldChange(
                          fieldIndex,
                          e.target.name,
                          e.target.checked,
                        )
                      }
                    />
                  </label>
                  <label>
                    Include Comment:
                    <input
                      type="checkbox"
                      name="includeComment"
                      checked={field.includeComment}
                      onChange={(e) =>
                        handleFieldChange(
                          fieldIndex,
                          e.target.name,
                          e.target.checked,
                        )
                      }
                    />
                  </label>
                  {field.includeComment && (
                    <textarea
                      name="comment"
                      value={field.comment}
                      onChange={(e) =>
                        handleFieldChange(
                          fieldIndex,
                          e.target.name,
                          e.target.value,
                        )
                      }
                      placeholder="Add comment"
                    />
                  )}
                  {field.type === "short-text" && (
                    <>
                      <label>Answer</label>
                      <input disabled /> <br />
                    </>
                  )}
                  {field.type === "long-text" && (
                    <>
                      <label>Answer</label>
                      <textarea disabled></textarea>
                      <br />
                      <label>
                        Max Length:
                        <input
                          type="number"
                          name="maxLength"
                          value={field.maxLength || ""}
                          onChange={(e) =>
                            handleFieldChange(
                              fieldIndex,
                              e.target.name,
                              e.target.value,
                            )
                          }
                        />
                      </label>
                    </>
                  )}
                  {field.type === "select" && (
                    <>
                      <h4>Options:</h4>
                      {field.options?.map((option, optionIndex) => (
                        <div key={optionIndex}>
                          <input
                            type="text"
                            value={option}
                            onChange={(e) =>
                              handleFieldChange(
                                fieldIndex,
                                "options",
                                e.target.value,
                                optionIndex,
                              )
                            }
                          />
                          <button
                            onClick={() =>
                              handleRemoveOption(fieldIndex, optionIndex)
                            }
                          >
                            X
                          </button>
                        </div>
                      ))}
                      <input
                        type="text"
                        value={optionInput}
                        onChange={(e) => setOptionInput(e.target.value)}
                      />
                      <button
                        type="button"
                        onClick={() => handleAddOption(fieldIndex)}
                      >
                        Add Option
                      </button>
                    </>
                  )}
                  {field.type === "checkbox" && (
                    <>
                      <h4>Options:</h4>
                      {field.options?.map((option, optionIndex) => (
                        <div key={optionIndex}>
                          <input
                            type="text"
                            value={option}
                            onChange={(e) =>
                              handleFieldChange(
                                fieldIndex,
                                "options",
                                e.target.value,
                                optionIndex,
                              )
                            }
                          />
                          <button
                            onClick={() =>
                              handleRemoveOption(fieldIndex, optionIndex)
                            }
                          >
                            X
                          </button>
                        </div>
                      ))}
                      <input
                        type="text"
                        value={optionInput}
                        onChange={(e) => setOptionInput(e.target.value)}
                      />
                      <button
                        type="button"
                        onClick={() => handleAddOption(fieldIndex)}
                      >
                        Add Option
                      </button>
                    </>
                  )}
                  {field.type === "file" && (
                    <>
                      <label>
                        Max Upload File Size (MB):
                        <input
                          type="number"
                          name="maxUploadSize"
                          value={field.maxUploadSize || ""}
                          onChange={(e) =>
                            handleFieldChange(
                              fieldIndex,
                              e.target.name,
                              e.target.value,
                            )
                          }
                        />
                      </label>
                      Allowed file types:
                      <label>
                        <input
                          type="checkbox"
                          value=".doc"
                          checked={field.allowedTypes?.includes(".doc")}
                          onChange={(e) =>
                            handleFieldChange(
                              fieldIndex,
                              "allowedTypes",
                              e.target.checked,
                              ".doc",
                            )
                          }
                        />
                        Document (DOC/DOCX)
                      </label>
                      <label>
                        <input
                          type="checkbox"
                          value=".pdf"
                          checked={field.allowedTypes?.includes(".pdf")}
                          onChange={(e) =>
                            handleFieldChange(
                              fieldIndex,
                              "allowedTypes",
                              e.target.checked,
                              ".pdf",
                            )
                          }
                        />
                        PDF
                      </label>
                      <label>
                        <input
                          type="checkbox"
                          value=".txt"
                          checked={field.allowedTypes?.includes(".txt")}
                          onChange={(e) =>
                            handleFieldChange(
                              fieldIndex,
                              "allowedTypes",
                              e.target.checked,
                              ".txt",
                            )
                          }
                        />
                        Text
                      </label>
                      <label>
                        <input
                          type="checkbox"
                          value=".jpg"
                          checked={field.allowedTypes?.includes(".jpg")}
                          onChange={(e) =>
                            handleFieldChange(
                              fieldIndex,
                              "allowedTypes",
                              e.target.checked,
                              ".jpg",
                            )
                          }
                        />
                        Image (JPG, JPEG, PNG, GIF)
                      </label>
                      <input type="file" disabled />
                    </>
                  )}
                  {field.type === "rating" && (
                    <>
                      <Rating value={field.value} readOnly />
                    </>
                  )}
                  {field.type === "date" && (
                    <>
                      <input type="date" disabled /> <br />
                    </>
                  )}
                  {field.type === "time" && (
                    <>
                      <input type="time" disabled /> <br />
                    </>
                  )}
                  <br />
                  <button onClick={() => handleRemoveField(fieldIndex)}>
                    Remove Field
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDuplicateField(fieldIndex)}
                  >
                    Duplicate
                  </button>
                </div>
              );
            })}
          </form>
          <button onClick={() => handleAddField(section.sectionName)}>
            Add Field
          </button>
          <hr />
        </div>
      ))}
      <button onClick={() => setShowAddSec(true)}>Add new section</button>

      {showAddSec && (
        <div>
          Add Section
          <div>
            Section Name:
            <input name="sectionName" onChange={handleSectionChange} />
          </div>
          <div>
            Section Description:
            <input name="sectionDesc" onChange={handleSectionChange} />
          </div>
          <button onClick={handleSectionSave}>Save</button>
          <br />
          <br />
        </div>
      )}
      {/* 
      <h2>JSON Result</h2>
      <pre>{jsonResult}</pre> */}
    </div>
  );
};

export default FormBuilder;
