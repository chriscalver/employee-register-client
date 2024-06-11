import React, { useState, useEffect } from "react";
import Employee from "./Employee";
import axios from "axios";
import Stars from "./Stars2";

//  const defaultImageSrc = "/img/image_placeholder.png";

export default function EmployeeList() {
  const [employeeList, setEmployeeList] = useState([]);
 // const [rating, setRating] = useState(1);

  const [recordForEdit, setRecordForEdit] = useState(null);

  useEffect(() => {
    refreshEmployeeList();
    // eslint-disable-next-line
  }, []);

  function refreshEmployeeList() {
    employeeAPI()
      .fetchAll()
      .then((res) => {
        setEmployeeList(res.data);
        // console.log(res.data);
         //setRating(rating);
      })
      .catch((err) => console.log(err));
  }
  const employeeAPI = (
    url = "https://www.chriscalver.com/employeeregisterapibk/api/Employee/"
  ) => {
    return {
      fetchAll: () => axios.get(url),
      create: (newRecord) => axios.post(url, newRecord),
      update: (id, updatedRecord) => axios.put(url + id, updatedRecord),
      delete: (id) => axios.delete(url + id),
    };
  };

  const addOrEdit = (formData, onSuccess) => {
    if (formData.get("employeeID") === "0")
      employeeAPI()
        .create(formData)
        .then((res) => {
          onSuccess();
          refreshEmployeeList();
        })
        .catch((err) => console.log(err));
    

    employeeAPI()
      .update(formData.get("employeeID"), formData)
      .then((res) => {
        onSuccess();
        refreshEmployeeList();
        // console.log(formData.get("rating"));
      })
      .catch((err) => console.log(err));
  };

  const showRecordDetails = (data) => {
    setRecordForEdit(data);
  };

  const onDelete = (e, id) => {
    e.stopPropagation();
    if (window.confirm("Are you sure you want to delete?"))
      employeeAPI()
        .delete(id)
        .then((res) => refreshEmployeeList())
        .catch((err) => console.log(err));
  };

  const imageCard = (data) => (
    <div
      className="card"
      onClick={() => {
        showRecordDetails(data);
         //setRating(data.rating);
        //console.log("From Emplist" + data.rating);
        localStorage.setItem("starRating", data.rating);
        // console.log("Original Rating " + localStorage.getItem("starRating"));
      }}
    >

      <img src={data.imageSrc} alt="" className="card-img-top rounded-circle" />
      <div className="card-body">
        <h5>{data.employeeName}</h5>
        <span>{data.occupation}</span> <br />
        <span>
          
          <Stars iconSize={35} defaultRating={data.rating} />
          {data.rating} Stars
        </span>
        <br />
        <button
          className="btn btn-light delete-button"
          onClick={(e) => onDelete(e, parseInt(data.employeeID))}
        >
          <i className="far fa-trash-alt"></i>
        </button>
      </div>
    </div>
  );

  return (
    <div className="row">
      <div className="col-md-12">
        <div className="jumbotron jumbotron-fluid py-4">
          <div className="container text-center">
            <h1 className="display-4">The Hot-Meat Blog</h1>
          </div>
        </div>
      </div>

      <div className="col-md-6" align="center">
        <table>
          <tbody>
            {             
              [...Array(employeeList.length)].map((e, i) => (
                <tr key={i}>
                  <td>
                    {/* {console.log(i)} */}
                    {imageCard(employeeList[i])}
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>

      <div className="col-md-4">
        <Employee addOrEdit={addOrEdit} recordForEdit={recordForEdit} />
      </div>
    </div>
  );
}
