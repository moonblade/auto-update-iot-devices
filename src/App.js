import './App.css';
import { Upload } from "./components/upload/Upload";
import { Link, BrowserRouter as Router, Route } from "react-router-dom";
import "antd/dist/antd.css";
import { Layout, Menu } from 'antd';
const { Header, Content, Footer } = Layout;

function App() {
  return (
    <>
        <Router>
          <Header className="header">
            <div className="logo" >
            </div>
            <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
              <Menu.Item key="1">
                <Link to="/home">
                  Home
                </Link>
              </Menu.Item>
              <Menu.Item key="2">
                <Link to="/upload">
                  Upload
                </Link>
              </Menu.Item>
            </Menu>
          </Header>
          <Content>
            <Route exact path="/upload" component={Upload}/>
          </Content>
          <Footer style={{ textAlign: 'center' }}>
            IOT Auto Updater. Created by MoonBlade
          </Footer>
        </Router>
    </>
  );
}

export default App;
