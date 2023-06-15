import React from "react";
import { Button, Form, Input } from "antd";

const CustomForm = ({ onSubmit, loading, form }) => {
  return (
    <div style={{ width: "70%" }}>
      <Form onFinish={onSubmit} form={form}>
        <Form.Item
          rules={[{ required: true, message: "To Do Field is required" }]}
          name="message"
        >
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              width: "100%",
            }}
          >
            <Input
              className="custom-input"
              placeholder="What do you need to add?"
            />
            <Button
              loading={loading}
              onClick={() => form.submit()}
              style={{
                backgroundColor: " #76B7CD",
                border: "none",
                borderTopRightRadius: 20,
                borderBottomRightRadius: 20,
                borderTopLeftRadius: 0,
                borderBottomLeftRadius: 0,
                color: "white",
                height: 40,
                width: 80,
              }}
              name="submit"
            >
              Add
            </Button>
          </div>
        </Form.Item>
      </Form>
    </div>
  );
};

export default CustomForm;
