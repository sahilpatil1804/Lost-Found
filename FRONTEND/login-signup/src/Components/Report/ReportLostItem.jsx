//import React, { useState, useContext } from "react";
//import axios from "axios";
//import "./ReportLostItem.css";
//import AppContext from "../Context/Context";
//const ReportLostItem = () => {
//  const {refreshLostData} = useContext(AppContext)
//  const [lostItem, setLostItem] = useState({
//    itemName: "",
//    category: "",
//    dateLost: "",
//    timeLost: "",
//    locationLost: "",
//    color: "",
//    brandModel: "",
//    specialIdentifiers: "",
//    description: "",
//    fullName: "",
//    phoneNumber: "",
//    email: "",
//  });
//  const [image, setImage] = useState(null);

//  const handleInputChange = (e) => {
//    const { name, value } = e.target;
//    setLostItem({ ...lostItem, [name]: value });
//  };

//  const handleImageChange = (e) => {
//    setImage(e.target.files[0]);
//  };

//  const submitHandler = (event) => {
//    event.preventDefault();
//    const formData = new FormData();
//    formData.append("imageFile", image);
//    formData.append(
//      "lostItem",
//      new Blob([JSON.stringify(lostItem)], { type: "application/json" })
//    );

//    axios
//      .post("http://localhost:8080/api/lost-item", formData, {
//        headers: {
//          "Content-Type": "multipart/form-data",
//        },
//      })
//      .then((response) => {
//        console.log("Lost item reported successfully:", response.data);
//        refreshLostData()
//        alert("Lost item reported successfully");
//      })
//      .catch((error) => {
//        console.error("Error reporting lost item:", error);
//        alert("Error reporting lost item");
//      });
//  };

//  return (
//    <div className="container">
//      <div className="center-container">
//        <form className="row g-3 pt-5" onSubmit={submitHandler}>
//          <div className="col-md-6">
//            <label className="form-label">
//              <h6>Item Name</h6>
//            </label>
//            <input
//              type="text"
//              className="form-control"
//              placeholder="Enter item name"
//              name="itemName"
//              value={lostItem.itemName}
//              onChange={handleInputChange}
//              required
//            />
//          </div>

//          <div className="col-md-6">
//            <label className="form-label">
//              <h6>Category</h6>
//            </label>
//            <select
//              className="form-select"
//              name="category"
//              value={lostItem.category}
//              onChange={handleInputChange}
//              required
//            >
//              <option value="">Select category</option>
//              <option value="Electronics">Electronics</option>
//              <option value="Documents">Documents</option>
//              <option value="Accessories">Accessories</option>
//              <option value="Clothing">Clothing</option>
//              <option value="Others">Others</option>
//            </select>
//          </div>

//          <div className="col-md-4">
//            <label className="form-label">
//              <h6>Date Lost</h6>
//            </label>
//            <input
//              type="date"
//              className="form-control"
//              name="dateLost"
//              value={lostItem.dateLost}
//              onChange={handleInputChange}
//              required
//            />
//          </div>

//          <div className="col-md-4">
//            <label className="form-label">
//              <h6>Time Lost</h6>
//            </label>
//            <input
//              type="time"
//              className="form-control"
//              name="timeLost"
//              value={lostItem.timeLost}
//              onChange={handleInputChange}
//            />
//          </div>

//          <div className="col-md-4">
//            <label className="form-label">
//              <h6>Location Lost</h6>
//            </label>
//            <input
//              type="text"
//              className="form-control"
//              placeholder="Enter location"
//              name="locationLost"
//              value={lostItem.locationLost}
//              onChange={handleInputChange}
//              required
//            />
//          </div>

//          <div className="col-md-4">
//            <label className="form-label">
//              <h6>Color</h6>
//            </label>
//            <input
//              type="text"
//              className="form-control"
//              placeholder="Enter color"
//              name="color"
//              value={lostItem.color}
//              onChange={handleInputChange}
//            />
//          </div>

//          <div className="col-md-4">
//            <label className="form-label">
//              <h6>Brand/Model</h6>
//            </label>
//            <input
//              type="text"
//              className="form-control"
//              placeholder="Enter brand/model"
//              name="brandModel"
//              value={lostItem.brandModel}
//              onChange={handleInputChange}
//            />
//          </div>

//          <div className="col-md-4">
//            <label className="form-label">
//              <h6>Special Identifiers</h6>
//            </label>
//            <input
//              type="text"
//              className="form-control"
//              placeholder="Any unique marks, stickers, etc."
//              name="specialIdentifiers"
//              value={lostItem.specialIdentifiers}
//              onChange={handleInputChange}
//            />
//          </div>

//          <div className="col-12">
//            <label className="form-label">
//              <h6>Description</h6>
//            </label>
//            <textarea
//              className="form-control"
//              placeholder="Provide additional details"
//              name="description"
//              value={lostItem.description}
//              onChange={handleInputChange}
//              required
//            ></textarea>
//          </div>

//          <div className="col-md-4">
//            <label className="form-label">
//              <h6>Upload Image</h6>
//            </label>
//            <input
//              className="form-control"
//              type="file"
//              onChange={handleImageChange}
//            />
//          </div>

//          <div className="col-md-4">
//            <label className="form-label">
//              <h6>Your Name</h6>
//            </label>
//            <input
//              type="text"
//              className="form-control"
//              placeholder="Enter your name"
//              name="fullName"
//              value={lostItem.fullName}
//              onChange={handleInputChange}
//              required
//            />
//          </div>

//          <div className="col-md-4">
//            <label className="form-label">
//              <h6>Phone Number</h6>
//            </label>
//            <input
//              type="tel"
//              className="form-control"
//              placeholder="Enter phone number"
//              name="phoneNumber"
//              value={lostItem.phoneNumber}
//              onChange={handleInputChange}
//              required
//            />
//          </div>

//          <div className="col-md-6">
//            <label className="form-label">
//              <h6>Email</h6>
//            </label>
//            <input
//              type="email"
//              className="form-control"
//              placeholder="Enter email"
//              name="email"
//              value={lostItem.email}
//              onChange={handleInputChange}
//              required
//            />
//          </div>

//          <div className="col-12">
//            <button type="submit" className="btn btn-primary">
//              Submit Report
//            </button>
//          </div>
//        </form>
//      </div>
//    </div>
//  );
//};

//export default ReportLostItem;
import React, { useState, useContext } from "react";
import axios from "axios";
import "./ReportLostItem.css";
import AppContext from "../Context/Context";
import bgImage from "../Assets/lost_home.png";


const ReportLostItem = () => {
  const {refreshLostData} = useContext(AppContext)
  const [lostItem, setLostItem] = useState({
    itemName: "",
    category: "",
    dateLost: "",
    timeLost: "",
    locationLost: "",
    color: "",
    brandModel: "",
    specialIdentifiers: "",
    description: "",
    fullName: "",
    phoneNumber: "",
    email: "",
  });
  const [image, setImage] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLostItem({ ...lostItem, [name]: value });
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("imageFile", image);
    formData.append(
      "lostItem",
      new Blob([JSON.stringify(lostItem)], { type: "application/json" })
    );

    axios
      .post("http://localhost:8080/api/lost-item", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        console.log("Lost item reported successfully:", response.data);
        refreshLostData()
        alert("Lost item reported successfully");
      })
      .catch((error) => {
        console.error("Error reporting lost item:", error);
        alert("Error reporting lost item");
      });
  };

  return (
    <div className="found-page" style={{ backgroundImage: `url(${bgImage})` }}>
      <div className="container">
        <div className="center-container">
          <h1>Lost Item</h1>
          <form className="row g-3 pt-5" onSubmit={submitHandler}>
            <div className="col-md-6">
              <label className="form-label">
                <h6>Item Name</h6>
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter item name"
                name="itemName"
                value={lostItem.itemName}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="col-md-6">
              <label className="form-label">
                <h6>Category</h6>
              </label>
              <select
                className="form-select"
                name="category"
                value={lostItem.category}
                onChange={handleInputChange}
                required
              >
                <option value="">Select category</option>
                <option value="Electronics">Electronics</option>
                <option value="Documents">Documents</option>
                <option value="Accessories">Accessories</option>
                <option value="Clothing">Clothing</option>
                <option value="Others">Others</option>
              </select>
            </div>

            <div className="col-md-4">
              <label className="form-label">
                <h6>Date Lost</h6>
              </label>
              <input
                type="date"
                className="form-control"
                name="dateLost"
                value={lostItem.dateLost}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="col-md-4 time-input">
              <label className="form-label">
                <h6>Time Lost</h6>
              </label>
              <div className="position-relative">
                <input
                  type="time"
                  className="form-control"
                  name="timeLost"
                  value={lostItem.timeLost}
                  onChange={handleInputChange}
                />
                <span className="clock-icon">⏰</span>
              </div>
            </div>


            <div className="col-md-4">
              <label className="form-label">
                <h6>Location Lost</h6>
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter location"
                name="locationLost"
                value={lostItem.locationLost}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="col-md-4">
              <label className="form-label">
                <h6>Color</h6>
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter color"
                name="color"
                value={lostItem.color}
                onChange={handleInputChange}
              />
            </div>

            <div className="col-md-4">
              <label className="form-label">
                <h6>Brand/Model</h6>
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter brand/model"
                name="brandModel"
                value={lostItem.brandModel}
                onChange={handleInputChange}
              />
            </div>

            <div className="col-md-4">
              <label className="form-label">
                <h6>Special Identifiers</h6>
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Any unique marks, stickers, etc."
                name="specialIdentifiers"
                value={lostItem.specialIdentifiers}
                onChange={handleInputChange}
              />
            </div>

            <div className="col-12">
              <label className="form-label">
                <h6>Description</h6>
              </label>
              <textarea
                className="form-control"
                placeholder="Provide additional details"
                name="description"
                value={lostItem.description}
                onChange={handleInputChange}
                required
              ></textarea>
            </div>

            <div className="col-md-4">
              <label className="form-label">
                <h6>Upload Image</h6>
              </label>
              <input
                className="form-control"
                type="file"
                onChange={handleImageChange}
              />
            </div>

            <div className="col-md-4">
              <label className="form-label">
                <h6>Your Name</h6>
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter your name"
                name="fullName"
                value={lostItem.fullName}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="col-md-4">
              <label className="form-label">
                <h6>Phone Number</h6>
              </label>
              <input
                type="tel"
                className="form-control"
                placeholder="Enter phone number"
                name="phoneNumber"
                value={lostItem.phoneNumber}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="col-md-6">
              <label className="form-label">
                <h6>Email</h6>
              </label>
              <input
                type="email"
                className="form-control"
                placeholder="Enter email"
                name="email"
                value={lostItem.email}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="col-12">
              <button type="submit" className="btn btn-primary">
                Submit Report
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ReportLostItem;
