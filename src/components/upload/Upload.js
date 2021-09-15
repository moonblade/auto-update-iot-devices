import React, {useState} from "react";
import { Form, Upload as UploadComponent, message, Spin } from "antd";
import { InboxOutlined } from '@ant-design/icons';
import { getDetails, uploadToStorage } from "./util";
import { LoadingOutlined } from '@ant-design/icons';

const formItemLayout = {
  labelCol: { offset: 6, span: 14},
  wrapperCol: { offset: 6, span: 14 },
};


const loadingIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
export const Upload = () => {
  const [fileList, setFileList] = useState([]);
  const [loading, setLoading] = useState(false);
  const onFinish = (values) => {
    console.log('Received values of form: ', values);
  };

  const customUpload = ({ file }) => {
    if (file == null) return;
    setLoading(true);
    getDetails(file).then(details => {
      return uploadToStorage(file, details);
    }).then(details => {
      message.success("Uploaded latest binary for " + details.binaryName);
      console.log(details.downloadUrl);
      setFileList([]);
    }).catch(error => {
      message.error("Could not update binary");
      message.error(error);
    }).finally(() => {
      setLoading(false);
    });
  }

  return (<>
    <Form
      name="validate_other"
      {...formItemLayout}
      layout="vertical"
      onFinish={onFinish}
      >
      <Spin indicator={loadingIcon} spinning={loading}>
        <Form.Item label="">
          <Form.Item name="dragger">
            <UploadComponent.Dragger fileList={fileList} accept=".bin" name="binary" customRequest={customUpload}>
              <p className="ant-upload-drag-icon">
                <InboxOutlined />
              </p>
              <p className="ant-upload-text">Click or drag binary to this area to upload</p>
              <p className="ant-upload-hint">Ensure that binary has name and version prefilled.</p>
            </UploadComponent.Dragger>
          </Form.Item>
        </Form.Item>
      </Spin>
    </Form>
  </>)
};
