import React, { useState, useEffect } from "react";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  listAll,
  deleteObject
} from "firebase/storage";
import { storage } from "./useAuth";
import { v4 } from "uuid";
import "./Login.css";
import { useAuth } from "../Authentication/useAuth";
import userPhoto from "../../images/auth/man.png";

const Profile = () => {
  const auth = useAuth();
  const [imageUpload, setImageUpload] = useState(null);
  const [imageUrls, setImageUrls] = useState([]);

  const imagesListRef = ref(storage, "images/");

  const uploadFile = () => {
    if (imageUpload == null) return;
    const imageRef = ref(storage, `images/${imageUpload.name + v4()}`);
    uploadBytes(imageRef, imageUpload).then(snapshot => {
      getDownloadURL(snapshot.ref).then(url => {
        setImageUrls(prev => [...prev, url]);
      });
    });
  };

  useEffect(() => {
    listAll(imagesListRef).then(response => {
      response.items.forEach(item => {
        getDownloadURL(item).then(url => {
          setImageUrls(prev => [...prev, url]);
        });
      });
    });
  }, []);

  // delete from storage
  const deleteFromFirebase = url => {
    let pictureRef = ref(storage, url);
    deleteObject(pictureRef)
      .then(() => {
        setImageUrls(imageUrls.filter(image => image !== url));
        alert("Picture is deleted successfully!");
      })
      .catch(err => {
        console.log(err.message);
      });
  };

  return (
    <>
      <div className="container mt-5 ">
        <div className="row">
          {/* account info */}
          <div className="col-xl-12 order-xl-1">
            <div className="card shadow">
              <div className="card-header bg-white">
                <div className="row">
                  <div className="col-12 col-xs-8 col-md-8 pt-5">
                    <h3 className="all-heading mb-0 ml-4">My account</h3>
                  </div>
                  <div
                    className="card-profile-image mt-3"
                    style={{ height: "30px" }}
                  >
                    {/* {imageUrls.map(url => {
                      return (
                        <img
                          src={auth.user.photoURL ? url : userPhoto}
                          alt="rounded-circle"
                          className="rounded-circle-img"
                        />
                      );
                    })} */}
            
                        <img
                          src={userPhoto}
                          alt="rounded-circle"
                          className="rounded-circle-img"
                        />
                  </div>
                </div>
              </div>

              <div className="card-body mt-5">
                <div className="pl-lg-4">
                  <div className="row">
                    <div className="col-lg-6">
                      <div className="form-group focused">
                        <label
                          className="profile-control-label"
                          htmlFor="input-first-name"
                          >
                          First name
                        </label>
                        <input
                          type="text"
                          id="input-first-name"
                          className="form-control form-control-alternative"
                          placeholder="First name"
                          value = {auth.user.displayName.split(" ")[0]}
                        />
                      </div>
                    </div>
                    <div className="col-lg-6">
                      <div className="form-group focused">
                        <label
                          className="profile-control-label"
                          htmlFor="input-last-name"        
                          >
                          Last name
                        </label>
                        <input
                          type="text"
                          id="input-last-name"
                          className="form-control form-control-alternative"
                          placeholder="Last name"
                          value = {auth.user.displayName.split(" ")[1]}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <hr className="my-4" />

                {/* contact information */}
                {/* <h6 className="heading-small text-muted all-heading mb-4 font-weight-bold">
                  Change Photo
                </h6> */}
                <div className="w-100">
                  <div className="d-flex justify-content-between flex-wrap">
                    {/* <div>
                      <input
                        type="file"
                        onChange={event => {
                          setImageUpload(event.target.files[0]);
                        }}
                      /> */}

                      {/* {imageUrls.length > 0 ? (
                        imageUrls.map(image => {
                          return (
                            <div key={image}>
                              <button
                                onClick={() => {
                                  deleteFromFirebase(image);
                                  uploadFile();
                                }}
                              >
                                Upload Image
                              </button>
                            </div>
                          );
                        })
                      ) : (
                        <button className="btn btn-sm" onClick={uploadFile}>
                          Upload Image
                        </button>
                      )} */}
                    {/* </div> */}
                    {/* <div>
                  <Link
                    to="/dashboard/profile/edit"
                    className="btn btn-sm"
                  >
                    Change Password
                  </Link>
                  </div> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
