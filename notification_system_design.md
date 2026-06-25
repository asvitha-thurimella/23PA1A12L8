# Notification System Design

## Core Features

The notification system provides:

- View all notifications
- View unread notifications
- Mark a notification as read
- Mark all notifications as read
- Create notifications
- Delete notifications
- Real-time delivery of notifications

## API Endpoints

### Fetch all notifications

GET /notifications?page=1&limit=10

Response:

{
"notifications": []
}

---

### Fetch unread notifications

GET /notifications/unread

Response:

{
"count": 4,
"notifications": []
}

---

### Mark a single notification as read

PATCH /notifications/:id/read

Response:

{
"message": "Notification marked as read"
}

---

### Mark all notifications as read

PATCH /notifications/read-all

Response:

{
"message": "All notifications marked as read"
}

---

### Create a notification

POST /notifications

Request:

{
"type": "Placement",
"message": "Amazon hiring drive announced"
}

Response:

{
"message": "Notification created"
}

---

### Delete a notification

DELETE /notifications/:id

Response:

{
"message": "Notification deleted"
}

## Real-Time Notification Strategy

Two possible approaches:

1. Polling
2. WebSockets

WebSockets are preferred because they provide instant delivery and reduce repeated API calls.
