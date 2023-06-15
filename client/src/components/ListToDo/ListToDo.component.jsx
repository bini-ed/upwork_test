import { Button, Checkbox } from "antd";
import DeleteIcon from "../../assets/Delete.png";
import React from "react";
import Remove from "../../assets/remove.png";

const ListToDo = ({
  data,
  handleCompleted,
  handleDelete,
  handleClearCompleted,
}) => {
  const newData = [...data];

  return (
    <div className="list-todo-container">
      {newData.length ? (
        <>
          {newData?.map((items) => (
            <div style={{ display: "flex", justifyContent: "center" }}>
              <div key={items.id} className="list-todo">
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    textDecoration: items.completed ? "line-through" : "",
                    color: items.completed ? "#C2C2C2" : "",
                  }}
                >
                  <Checkbox
                    checked={items?.completed ? true : false}
                    className="round-checkbox"
                    style={{ marginRight: 10, fontSize: "24px" }}
                    onChange={(e) => handleCompleted(e.target.checked, items)}
                  ></Checkbox>
                  <p className="todo-message">{items.message}</p>
                </div>
                <div>
                  <Button
                    onClick={() => handleDelete(items.id)}
                    className="custom-btn"
                    icon={<img style={{ width: 15 }} src={DeleteIcon} />}
                  />
                </div>
              </div>
            </div>
          ))}
          <div className="mark-completed">
            <Button
              onClick={() => handleClearCompleted(newData[0].type)}
              className="custom-btn"
              icon={<img src={Remove} width={20} />}
            >
              Clear completed
            </Button>
          </div>
        </>
      ) : (
        <p>No To Do list</p>
      )}
    </div>
  );
};

export default ListToDo;
