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

# Stage 3 - Query Optimization

Consider the following query:

SELECT \*
FROM notifications
WHERE student_id = 1042
AND is_read = FALSE
ORDER BY created_at ASC;

This query is logically correct because it filters notifications for a student and only returns unread ones.

But if the table grows to millions of rows, performance may slow down.

Reasons:

- The database may scan many rows before filtering
- Sorting by created_at takes additional time
- Frequent notification inserts increase table size

Time complexity without indexing can be high because filtering and sorting both take time.

To improve this, a composite index can be created:

CREATE INDEX idx_notification_lookup
ON notifications(student_id, is_read, created_at);

This helps because:

- student_id filtering becomes faster
- unread status check is quicker
- created_at sorting is optimized

Should every column be indexed?

No.

Indexing every column increases storage usage and slows insert/update operations. Only frequently queried columns should be indexed.

Example query for placement notifications in the last 7 days:

SELECT student_id
FROM notifications
WHERE notification_type = 'Placement'
AND created_at >= NOW() - INTERVAL '7 days';
