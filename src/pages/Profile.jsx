import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { FaPencilAlt } from "react-icons/fa";
import Cropper from "react-easy-crop";
import Slider from "@mui/material/Slider";
import axios from "../utils/axiosConfig";
import "../styles/Profile.css";

const Profile = ({ user, setUser }) => {
  const [form, setForm] = useState(user || {});
  const [imagePreview, setImagePreview] = useState(user?.profileImage || "");
  const [selectedFile, setSelectedFile] = useState(null);
  const [cropping, setCropping] = useState(false);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

  useEffect(() => {
    if (form.profileImage) {
      setImagePreview(form.profileImage);
    }
  }, [form.profileImage]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setImagePreview(URL.createObjectURL(file));
      setCropping(true);
    }
  };

  const getCroppedImage = async () => {
    const image = new Image();
    image.src = imagePreview;
    await new Promise((resolve) => (image.onload = resolve));

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const { width, height, x, y } = croppedAreaPixels;

    canvas.width = width;
    canvas.height = height;
    ctx.drawImage(image, x, y, width, height, 0, 0, width, height);

    return new Promise((resolve) => {
      canvas.toBlob((blob) => {
        const croppedFile = new File([blob], "cropped.jpg", {
          type: "image/jpeg",
        });
        resolve({ blob, croppedFile, url: URL.createObjectURL(blob) });
      }, "image/jpeg");
    });
  };

  const handleCropComplete = (croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  };

  const handleConfirmCrop = async () => {
    const { croppedFile, url } = await getCroppedImage();
    setSelectedFile(croppedFile);
    setImagePreview(url);
    setCropping(false);
    toast.success("✅ Image cropped successfully!", { autoClose: 1500 });
  };

  const handleCancel = () => {
    setForm(user);
    setImagePreview(user?.profileImage || "");
    setSelectedFile(null);
    toast.info("Profile changes discarded!", { autoClose: 1500 });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("email", form.email);
    if (selectedFile) {
      formData.append("profileImage", selectedFile);
    }

    try {
      const { data } = await axios.put("/users/update", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${user.token}`,
        },
      });

      setUser(data);
      localStorage.setItem("userInfo", JSON.stringify(data));
      toast.success("✅ Profile updated!", { autoClose: 2000 });
    } catch (error) {
      toast.error("❌ Failed to update profile", { autoClose: 2000 });
    }
  };

  if (!user) return <p className="login-warning">⚠️ Please login first.</p>;

  const fallbackLetter = form.name?.[0]?.toUpperCase() || "U";

  return (
    <div className="profile-container">
      <div className="profile-card">
        <div className="profile-avatar-container">
          <label htmlFor="profile-image" className="image-upload-label">
            {imagePreview ? (
              <img
                src={imagePreview}
                alt="User Avatar"
                className="profile-avatar"
              />
            ) : (
              <div className="fallback-avatar">{fallbackLetter}</div>
            )}
            <span className="edit-icon">
              <FaPencilAlt />
            </span>
          </label>
          <input
            type="file"
            id="profile-image"
            accept="image/*"
            onChange={handleImageUpload}
            style={{ display: "none" }}
          />
        </div>

        <h2>{form.name || "Your Name"}</h2>
        <p className="profile-email">{form.email || "you@example.com"}</p>

        <form onSubmit={handleUpdate} className="profile-form">
          <div className="form-group">
            <label className="label_profile_form">Name: </label>
            <input
              type="text"
              name="name"
              value={form.name || ""}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label className="label_profile_form">Email: </label>
            <input
              type="email"
              name="email"
              value={form.email || ""}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="update_btn_profile">
            Update Profile
          </button>

          <button
            type="button"
            className="cancel_btn_profile"
            onClick={handleCancel}
          >
            Cancel Update
          </button>
        </form>
      </div>

      {cropping && (
        <div className="cropper-container">
          <div className="cropper-wrapper">
            <Cropper
              image={imagePreview}
              crop={crop}
              zoom={zoom}
              aspect={1}
              onCropChange={setCrop}
              onCropComplete={handleCropComplete}
              onZoomChange={setZoom}
            />
            <div className="crop-controls">
              <Slider
                min={1}
                max={3}
                step={0.1}
                value={zoom}
                onChange={(e, zoom) => setZoom(zoom)}
              />
              <button
                onClick={handleConfirmCrop}
                className="confirm_btn_profile"
              >
                Confirm
              </button>
              <button
                onClick={() => setCropping(false)}
                className="cancel_btn_profile2"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
