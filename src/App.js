import './App.css';
import { Upload } from "./components/upload/Upload";
import "antd/dist/antd.css";
import { Layout } from 'antd';
const { Header, Content, Footer } = Layout;

function App() {
  return (
    <>
      <Header/>
        <Content>
          <Upload/>
        </Content>
      <Footer/>
    </>
  );
}

export default App;
