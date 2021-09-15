import React, {useState} from "react";
import { Form, Upload as UploadComponent, message } from "antd";
import { InboxOutlined } from '@ant-design/icons';
import { getDetails, uploadToStorage } from "./util";

const formItemLayout = {
  labelCol: { offset: 6, span: 14},
  wrapperCol: { offset: 6, span: 14 },
};

export const Upload = () => {
  const [fileList, setFileList] = useState([]);
  const onFinish = (values) => {
    console.log('Received values of form: ', values);
  };

  const customUpload = ({ file }) => {
    if (file == null) return;
    getDetails(file).then(details => {
      return uploadToStorage(file, details);
    }).then(details => {
      message.success("Uploaded latest binary for " + details.binaryName);
      console.log(details.downloadUrl);
      setFileList([]);
    }).catch(error => {
      message.error("Could not update binary");
      message.error(error);
    });
  }

  return (<>
    <Form
      name="validate_other"
      {...formItemLayout}
      layout="vertical"
      onFinish={onFinish}
      >
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
    </Form>
  </>)
};
