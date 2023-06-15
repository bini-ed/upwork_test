import notification from "antd/lib/notification";
export const OpenNotification = (type, message, description) => {
  notification.config({
    duration: 5,
  });

  switch (type) {
    case "success":
      return notification.success({
        message: message,
        description: description,
      });
    case "error":
      return notification.error({
        message: message,
        description: description,
      });
    case "warning":
      return notification.warn({
        message: message,
        description: description,
      });
    case "info":
      return notification.info({
        message: message,
        description: description,
      });
  }
};
