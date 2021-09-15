import config from "../common/config";
import { storage, database, auth, provider } from "../common/firebase";
 
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

export const updateRtdb = async (details) => {
  const dbRef = database.ref(details.binaryName + config.firmware.firmwarePath);
  return new Promise((res) => {
    dbRef.set({
      binaryVersion: config.firmware.binaryName + details.binaryName + config.firmware.binaryVersion + details.binaryVersion + "__",
      lastUpdate: new Date().toISOString(),
      downloadUrl: details.downloadUrl
    });
    res(details);
  });
};

export const uploadToStorage = async (file, details) => {
  const email = await login();
  console.log(email);
  if (!details.binaryName || !details.binaryVersion) {
    return Promise.reject("No name or version found in binary");
  }
  const uploadPath = (config.binaryRef + details.binaryName + "/" + details.binaryVersion).replaceAll("\u0000", "");
  const uploadRef = storage.ref().child(uploadPath);
  return uploadRef.put(file).then(() => {
    return uploadRef.getDownloadURL();
  }).then(downloadUrl => {
    details.downloadUrl = downloadUrl;
    return updateRtdb(details);
  });
};

export const login = async () => {
  if (auth.currentUser) {
    return Promise.resolve(auth.currentUser.email);
  }
  return auth
  .signInWithPopup(provider)
  .then((result) => {
    // var credential = result.credential;
    // var token = credential.accessToken;
    var user = result.user;
    return user.email;
  }).catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    var email = error.email;
    console.error(errorCode, errorMessage, email);
  });

};
