import { Container, Typography, Button } from "@mui/material";
import NotificationCard from "../components/NotificationCard";

const priorityNotifications = [
  {
    ID: "2",
    Type: "Placement",
    Message: "Amazon hiring drive",
    Timestamp: "2026-04-22 17:51:18"
  },
  {
    ID: "1",
    Type: "Result",
    Message: "Mid sem results released",
    Timestamp: "2026-04-22 17:51:30"
  }
];

function PriorityNotifications() {
  return (
    <Container maxWidth="md" sx={{ marginTop: 4 }}>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        Priority Inbox
      </Typography>

      <Button
        variant="outlined"
        href="/"
        sx={{ marginBottom: 3 }}
      >
        Back
      </Button>

      {priorityNotifications.map((notification) => (
        <NotificationCard
          key={notification.ID}
          notification={notification}
        />
      ))}
    </Container>
  );
}

export default PriorityNotifications;