import React, {useState} from "react";
import { Form, Button, Upload as UploadComponent } from "antd";
import { InboxOutlined } from '@ant-design/icons';
import { getDetails } from "./util";

const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 14 },
};

export const Upload = () => {
  const [fileList, setFileList] = useState([])

  const onFinish = (values) => {
    console.log('Received values of form: ', values);
  };

  const customUpload = ({ onSuccess, onError, file }) => {
    getDetails(file).then(details => {
      console.log(details);
      setFileList([file])
    });
  }

  return (<>
    <Form
      name="validate_other"
      {...formItemLayout}
      onFinish={onFinish}
      initialValues={{
        'input-number': 3,
        'checkbox-group': ['A', 'B'],
        rate: 3.5,
      }}
    >
      <Form.Item label="Binary">
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
      <Form.Item wrapperCol={{ span: 12, offset: 6 }}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  </>)
};
