const firebaseConfig = {
  apiKey: "AIzaSyCh9FHA-2gNBKQ_sUnujVLEzYfmWmXS05k",
  authDomain: "water-level-indicator-a555e.firebaseapp.com",
  databaseURL: "https://water-level-indicator-a555e-default-rtdb.firebaseio.com",
  projectId: "water-level-indicator-a555e",
  storageBucket: "water-level-indicator-a555e.appspot.com",
  messagingSenderId: "997534152135",
  appId: "1:997534152135:web:56bed15fb1b26de4cad5e2",
  measurementId: "G-LEXSPCGQF9"
};

const binaryName = "__BINARY_NAME:";
const binaryVersion = "__BINARY_VERSION:";
export const config = {
  binaryRef: "/binary/",
  detailsRegex: {
    binaryName: binaryName + "([^_]+)__",
    binaryVersion: binaryVersion + "([^_]+)__",
  },
  firmware: {
    firmwarePath: "/firmware/",
    binaryName,
    binaryVersion
  },
  firebaseConfig
};
export default config;
