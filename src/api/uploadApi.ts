import { baseApi, type DataResponse } from "./baseApi";

export interface UploadImageResult {
  secureUrl: string;
  publicId: string;
}

const uploadApi = {
  uploadImage: (file: File) => {
    const formData = new FormData();
    formData.append("file", file);

    return baseApi
      .post<DataResponse<UploadImageResult>>("/cloudinary/image", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => res.data);
  },
};

export default uploadApi;

