import React, { useState, useEffect } from "react";
import Stars from "./Stars";

const defaultImageSrc = "/img/placeholder2.png";

// let defaultRating = "3";

const initialFieldValues = {
  employeeID: 0,
  employeeName: "",
  occupation: "",
  comment: "",
  rating: 0,
  imageName: "",
  imageSrc: defaultImageSrc,
  imageFile: null,
};
// {console.log("From Emp Default" + initialFieldValues.rating)}
export default function Employee(props) {
  const { addOrEdit, recordForEdit } = props;
  const [values, setValues] = useState(initialFieldValues);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (recordForEdit != null) setValues(recordForEdit);

    // console.log(recordForEdit);
  }, [recordForEdit]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const showPreview = (e) => {
    if (e.target.files && e.target.files[0]) {
      let imageFile = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (x) => {
        setValues({
          ...values,
          imageFile,
          imageSrc: x.target.result,
        });
      };
      reader.readAsDataURL(imageFile);
    } else {
      setValues({
        ...values,
        imageFile: null,
        imageSrc: defaultImageSrc,
      });
    }
  };

  const validate = () => {
    let temp = {};
    temp.employeeName = values.employeeName === "" ? false : true;
    temp.imageSrc = values.imageSrc === defaultImageSrc ? false : true;
    setErrors(temp);
    return Object.values(temp).every((x) => x === true);
  };

  const resetForm = () => {
    setValues(initialFieldValues);
    document.getElementById("image-uploader").value = null;
    setErrors({});
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      const formData = new FormData();
      formData.append("employeeID", values.employeeID);
      formData.append("employeeName", values.employeeName);
      formData.append("comment", values.comment);
      formData.append("occupation", values.occupation);
      formData.append("rating", localStorage.getItem("starRatingTemp"));
      formData.append("imageName", values.imageName);
      formData.append("imageFile", values.imageFile);
      addOrEdit(formData, resetForm);
      // localStorage.setItem("starRating", 0);
      setValues(initialFieldValues);
    }
  };

  const applyErrorClass = (field) =>
    field in errors && errors[field] === false ? " invalid-field" : "";

  return (
    <>
      <div className="container text-center">
        <p className="lead">Add/Edit Blog Below</p>
      

      <form autoComplete="off" noValidate onSubmit={handleFormSubmit}>
        
        <div className="card">
          
          <div className="card-body">
            
            <div className="">
            <img src={values.imageSrc} alt="" width="120" className="card-img-top2 rounded-circle"
        />
              <div className="mycontainer2">               
                
                <div className="mycontainer3"><Stars iconSize={35} defaultRating={values.rating} /></div>
                <div className="mycontainer3">Rate</div>
              </div>
             
            </div>

            <div className="form-group">
              <input
                type="file"
                accept="image/*"
                className={"form-control-file" + applyErrorClass("imageSrc")}
                onChange={showPreview}
                id="image-uploader"
              />
            </div>
            <div className="form-group">
              <input
                className={"form-control" + applyErrorClass("employeeName")}
                placeholder="Restaurant Name"
                name="employeeName"
                value={values.employeeName}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <input
                className="form-control"
                placeholder="What did you have?"
                name="occupation"
                value={values.occupation}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <textarea
                className="form-control"
                placeholder="Describe your experience..."
                name="comment"
                value={values.comment}
                onChange={handleInputChange}
                rows={7}
              />
            </div>

            <div className="form-group text-center">
              <button type="submit" className="btn btn-light">
                Submit
              </button>
              <button
                type="submit"
                className="btn btn-light"
                onClick={resetForm}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </form>
      </div>
    </>
  );
}
