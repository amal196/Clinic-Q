export const getNotifications = () => {
  return JSON.parse(
    localStorage.getItem("notifications")
  ) || [];
};

export const saveNotification = (
  notification
) => {
  const notifications =
    getNotifications();

  notifications.unshift(
    notification
  );

  localStorage.setItem(
    "notifications",
    JSON.stringify(notifications)
  );
};

export const markAsRead = (id) => {
  const notifications =
    getNotifications();

  const updatedNotifications =
    notifications.map(
      (notification) =>
        notification.id === id
          ? {
              ...notification,
              read: true,
            }
          : notification
    );

  localStorage.setItem(
    "notifications",
    JSON.stringify(
      updatedNotifications
    )
  );
};

export const markAllAsRead = () => {
  const notifications =
    getNotifications();

  const updatedNotifications =
    notifications.map(
      (notification) => ({
        ...notification,
        read: true,
      })
    );

  localStorage.setItem(
    "notifications",
    JSON.stringify(
      updatedNotifications
    )
  );
};

export const clearNotifications = () => {
  localStorage.removeItem(
    "notifications"
  );
};