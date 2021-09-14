import config from "../common/config";
import { storage } from "../common/firebase";
 
export const getFileContent = async (file) => {
  return new Promise((res) => {
    const reader = new FileReader();
    reader.onload = () => {
      const enc = new TextDecoder("utf-8");
      res(enc.decode(reader.result));
    }
    reader.readAsArrayBuffer(file);
  });
}


export const getDetails = async (file) => {
  return getFileContent(file).then(fileContent => {
    const result = {};
    for (let property in config.detailsRegex) {
      const regexp = new RegExp(config.detailsRegex[property]);
      const searchResult = regexp.exec(fileContent);
      if (searchResult) {
        result[property] = searchResult[1];
      }
    }
    return result;
  });
};

export const uploadToStorage = async (file, details) => {
  if (!details.binaryName || !details.binaryVersion) {
    return Promise.reject("No name or version found in binary");
  }
  const uploadPath = (config.binaryRef + details.binaryName + "/" + details.binaryVersion).replaceAll("\u0000", "");
  const uploadRef = storage.ref().child(uploadPath);
  return uploadRef.put(file).then(() => {
    return uploadRef.getDownloadURL();
  });
};
