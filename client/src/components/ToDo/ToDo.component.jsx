import React, { useEffect, useState } from "react";
import { Button, Form, Input, Tabs } from "antd";

import {
  AddToDoService,
  ClearCompletedToDoService,
  DeleteToDoService,
  EditToDoService,
  GetAllToDoService,
} from "../../services/ToDo.service";
import ListToDo from "../ListToDo/ListToDo.component";
import { OpenNotification } from "../../utilities/Notification";
import AddToDo from "./AddToDo.component";
import CustomForm from "../CustomForm/CustomForm.components";

const ToDo = () => {
  const [key, setKey] = useState(1);
  const [loading, setLoading] = useState(false);
  const [todo, setToDo] = useState([]);
  const [form] = Form.useForm();
  const { Search } = Input;
  const onChange = (key) => {
    setKey(key);
  };

  useEffect(() => {
    fetchAllToDo();
  }, [key]);

  const fetchAllToDo = async () => {
    await GetAllToDoService({ type: key == 1 ? "personal" : "professional" })
      .then(({ data }) => {
        setToDo(data);
      })
      .catch((error) => OpenNotification("error", "Error occurred"));
  };

  const addToDo = async (value) => {
    setLoading(true);
    value.type = key == 1 ? "personal" : "professional";
    await AddToDoService(value)
      .then(() => {
        fetchAllToDo();
        form.resetFields();
        OpenNotification("success", "To Do Added successfully!", "");
      })
      .catch((error) => {
        OpenNotification("error", error?.response?.data?.errors ?? error);
      });
    setLoading(false);
  };

  const handleCompleted = async (checked, item) => {
    setLoading(true);
    item.completed = checked;
    await EditToDoService(item)
      .then(() => {
        fetchAllToDo();
        OpenNotification("success", "To Do Completed!", "");
      })
      .catch((error) => {
        OpenNotification("error", error?.response?.data?.errors ?? error);
      });
    setLoading(false);
  };

  const handleClearCompleted = async (item) => {
    setLoading(true);
    await ClearCompletedToDoService(item)
      .then(() => {
        fetchAllToDo();
        OpenNotification("success", "Completed ToDo cleared!", "");
      })
      .catch((error) => {
        OpenNotification(
          "error",
          error?.response?.data?.errors ?? "Error occurred please try again!"
        );
      });
    setLoading(false);
  };

  const handleDelete = async (id) => {
    setLoading(true);
    await DeleteToDoService(id)
      .then(() => {
        fetchAllToDo();
        OpenNotification("success", "To Do Deleted successfully!", "");
      })
      .catch((error) => {
        OpenNotification("error", error?.response?.data?.errors ?? error);
      });
    setLoading(false);
  };
  const handleSearch = async (value) => {
    setLoading(true);
    // const filteredArray = todo.filter((items) =>
    //   items?.message?.match(new RegExp(value, "i"))
    // );
    // setToDo(filteredArray);
    await GetAllToDoService({ message: value })
      .then((res) => {
        setToDo(res.data);
      })
      .catch((error) => {
        OpenNotification("error", error?.response?.data?.errors ?? error);
      });

    setLoading(false);
  };

  return (
    <div>
      <div>
        <Search
          placeholder="Search your to do list"
          onSearch={handleSearch}
          style={{
            width: "50%",
            marginTop: 5,
          }}
        />
      </div>
      <Tabs
        tabBarStyle={{ color: "black" }}
        tabPosition="top"
        defaultActiveKey="1"
        onChange={onChange}
      >
        <Tabs.TabPane tab="Personal" key="1">
          <AddToDo form={form} loading={loading} addToDo={addToDo} />
        </Tabs.TabPane>
        <Tabs.TabPane tab="Professional" key="2">
          <AddToDo loading={loading} addToDo={addToDo} />
        </Tabs.TabPane>
      </Tabs>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <ListToDo
          handleCompleted={handleCompleted}
          data={todo}
          handleDelete={handleDelete}
          handleClearCompleted={handleClearCompleted}
        />
      </div>
    </div>
  );
};

export default ToDo;
