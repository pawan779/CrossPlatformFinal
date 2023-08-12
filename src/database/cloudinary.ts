import axios from "axios";

const cloudName = "pawan779"; // Replace with your Cloudinary cloud name
const apiKey = "197711719233572";
const apiSecret = "EOGW2x-EjfTFPmbLSqM0zrXTB70";

const uploadImageToCloudinary = async (imageUri) => {
  try {
    let base64Img = `data:image/jpg;base64,${imageUri}`;

    //Add your cloud name
    let apiUrl = "https://api.cloudinary.com/v1_1/pawan779/image/upload";

    let data = {
      file: base64Img,
      upload_preset: "nxzpekhl",
    };

    const res = await fetch(apiUrl, {
      body: JSON.stringify(data),
      headers: {
        "content-type": "application/json",
      },
      method: "POST",
    });

    let url = await res.json();
    return url.secure_url;
  } catch (err) {
    console.log(err);
  }
};

export default uploadImageToCloudinary;
