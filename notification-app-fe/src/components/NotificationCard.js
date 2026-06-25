import { Card, CardContent, Typography, Chip, Box } from "@mui/material";

function NotificationCard({ notification }) {
  const getColor = () => {
    if (notification.Type === "Placement") return "success";
    if (notification.Type === "Result") return "primary";
    return "warning";
  };

  return (
    <Card
      sx={{
        borderRadius: 3,
        marginBottom: 2,
        boxShadow: 4
      }}
    >
      <CardContent>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography variant="h6" fontWeight="bold">
            {notification.Message}
          </Typography>

          <Chip
            label={notification.Type}
            color={getColor()}
          />
        </Box>

        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ marginTop: 2 }}
        >
          {notification.Timestamp}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default NotificationCard;