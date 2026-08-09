import { useEffect, useState } from "react";

import {
  getNotifications,
  markAsRead,
  markAllAsRead,
  clearNotifications,
} from "../utils/notificationStorage";

import {
  FaStethoscope,
  FaUserPlus,
  FaCheckCircle,
  FaExclamationTriangle,
  FaBell,
  FaBellSlash,
  FaClock,
} from "react-icons/fa";

const getNotificationStyle = (title) => {
  if (title.includes("Consultation Started")) {
    return {
      icon: <FaStethoscope />,
      colorClass: "icon-sky",
    };
  }

  if (title.includes("Appointment Confirmed")) {
    return {
      icon: <FaUserPlus />,
      colorClass: "icon-blue",
    };
  }

  if (title.includes("Consultation Completed")) {
    return {
      icon: <FaCheckCircle />,
      colorClass: "icon-green",
    };
  }

  if (title.includes("Queue Alert")) {
    return {
      icon: <FaExclamationTriangle />,
      colorClass: "icon-orange",
    };
  }

  if (title.includes("Queue Cleared")) {
    return {
      icon: <FaCheckCircle />,
      colorClass: "icon-green",
    };
  }

  return {
    icon: <FaBell />,
    colorClass: "icon-blue",
  };
};

function Notifications() {
  const [notifications, setNotifications] =
    useState([]);

  const loadNotifications = () => {
    setNotifications(
      getNotifications()
    );
  };

  useEffect(() => {
    loadNotifications();
  }, []);

  const handleRead = (id) => {
    markAsRead(id);
    loadNotifications();
  };

  const handleReadAll = () => {
    markAllAsRead();
    loadNotifications();
  };

  const handleClearAll = () => {
    const confirmDelete =
      window.confirm(
        "Are you sure you want to delete all notifications?"
      );

    if (confirmDelete) {
      clearNotifications();
      loadNotifications();
    }
  };

  return (
    <div className="page-container">

      <h1>Notifications</h1>
      <p>
        Recent activity across your clinic
        queue.
      </p>

      <div className="notification-actions">

        <button
          className="read-all-btn"
          onClick={handleReadAll}
        >
          Mark All Read
        </button>

        <button
          className="clear-all-btn"
          onClick={handleClearAll}
        >
          Clear All
        </button>

      </div>

      <div className="notifications-list">

        {notifications.length === 0 ? (

          <div className="empty-state notif-empty">
            <FaBellSlash className="empty-icon" />

            <h3>
              No Notifications
            </h3>

            <p>
              You're all caught up.
            </p>
          </div>

        ) : (

          notifications.map(
            (notification) => {

              const style =
                getNotificationStyle(
                  notification.title
                );

              return (
                <div
                  key={notification.id}
                  className={`notification-card ${
                    !notification.read
                      ? "unread"
                      : ""
                  }`}
                >

                  <span
                    className={`notif-icon ${style.colorClass}`}
                  >
                    {style.icon}
                  </span>

                  <div className="notif-content">

                    <div className="notif-top">
                      <h3>
                        {notification.title}
                      </h3>

                      {!notification.read && (
                        <span className="unread-dot"></span>
                      )}
                    </div>

                    <p>
                      {notification.message}
                    </p>

                    <small>
                      <FaClock className="notif-time-icon" />
                      {notification.time}
                    </small>

                  </div>

                  {!notification.read && (
                    <button
                      className="mark-read-btn"
                      onClick={() =>
                        handleRead(
                          notification.id
                        )
                      }
                    >
                      Mark Read
                    </button>
                  )}

                </div>
              );
            }
          )

        )}

      </div>

    </div>
  );
}

export default Notifications;