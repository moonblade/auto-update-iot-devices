import config from "./config";

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
}
