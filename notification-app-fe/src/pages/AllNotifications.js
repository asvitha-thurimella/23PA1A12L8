import { useState } from "react";
import studentImage from "../assets/student.png";

import {
  Container,
  Typography,
  Button,
  Select,
  MenuItem,
  Box
} from "@mui/material";

import NotificationCard from "../components/NotificationCard";

const sampleNotifications = [
  {
    ID: "1",
    Type: "Result",
    Message: "Mid sem results released",
    Timestamp: "2026-04-22 17:51:30"
  },
  {
    ID: "2",
    Type: "Placement",
    Message: "Amazon hiring drive",
    Timestamp: "2026-04-22 17:51:18"
  },
  {
    ID: "3",
    Type: "Event",
    Message: "Annual day event",
    Timestamp: "2026-04-22 17:51:06"
  }
];

function AllNotifications() {
  const [filter, setFilter] = useState("All");

  const filtered =
    filter === "All"
      ? sampleNotifications
      : sampleNotifications.filter((item) => item.Type === filter);

  return (
    <Container maxWidth="lg" sx={{ marginTop: 4 }}>

      {/* Hero Section */}
      <Box
        sx={{
          width: "100%",
          minHeight: "320px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          background: "linear-gradient(to right, #f5f7fa, #e4ecfb)",
          borderRadius: "20px",
          padding: "30px",
          marginBottom: "40px",
          boxShadow: 3
        }}
      >
        <Box sx={{ maxWidth: "50%" }}>
          <Typography variant="h3" fontWeight="bold" gutterBottom>
            Campus Notifications
          </Typography>

          <Typography variant="h6" color="text.secondary">
            Stay updated with placements, results and events in one place.
          </Typography>

          <Button
            variant="contained"
            href="/priority"
            sx={{ marginTop: 3 }}
          >
            Go to Priority Inbox
          </Button>
        </Box>

        <img
          src={studentImage}
          alt="student"
          style={{
            width: "350px",
            height: "350px",
            objectFit: "contain"
          }}
        />
      </Box>

      {/* Filter Section */}
      <Box
        display="flex"
        gap={2}
        alignItems="center"
        marginBottom={4}
      >
        <Typography variant="h6">Filter:</Typography>

        <Select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <MenuItem value="All">All</MenuItem>
          <MenuItem value="Placement">Placement</MenuItem>
          <MenuItem value="Result">Result</MenuItem>
          <MenuItem value="Event">Event</MenuItem>
        </Select>
      </Box>

      {/* Notifications */}
      {filtered.map((notification) => (
        <NotificationCard
          key={notification.ID}
          notification={notification}
        />
      ))}
    </Container>
  );
}

export default AllNotifications;