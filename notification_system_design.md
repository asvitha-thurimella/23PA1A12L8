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

# Stage 2 - Database Design

## Database Choice

PostgreSQL is selected for storing notifications.

Reasons:

- Supports structured relational data
- Handles large-scale queries efficiently
- Supports indexing for faster lookups
- Good for sorting and filtering notifications

---

## Notifications Table Schema

Fields:

- id (UUID) → unique notification ID
- student_id (INTEGER) → identifies the student
- notification_type (VARCHAR) → Placement, Result, Event
- message (TEXT) → actual notification content
- is_read (BOOLEAN) → read/unread status
- created_at (TIMESTAMP) → time of notification creation

SQL Schema:

CREATE TABLE notifications (
id UUID PRIMARY KEY,
student_id INT NOT NULL,
notification_type VARCHAR(30) NOT NULL,
message TEXT NOT NULL,
is_read BOOLEAN DEFAULT FALSE,
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

---

## Challenges at Scale

Potential issues:

1. Large unread notification scans
2. Slow sorting on created_at
3. High write frequency during bulk notifications

Solutions:

- Add indexes on student_id and is_read
- Use pagination for loading notifications
- Archive old notifications periodically

---

## Sample Query

Fetch unread notifications for a student:

SELECT \*
FROM notifications
WHERE student_id = 1042
AND is_read = FALSE
ORDER BY created_at DESC
LIMIT 20;
