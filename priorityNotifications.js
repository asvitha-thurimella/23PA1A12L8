const notifications = [
  {
    ID: "1",
    Type: "Result",
    Message: "mid-sem",
    Timestamp: "2026-04-22 17:51:30"
  },
  {
    ID: "2",
    Type: "Placement",
    Message: "CSX Corporation hiring",
    Timestamp: "2026-04-22 17:51:18"
  },
  {
    ID: "3",
    Type: "Event",
    Message: "farewell",
    Timestamp: "2026-04-22 17:51:06"
  },
  {
    ID: "4",
    Type: "Placement",
    Message: "AMD hiring",
    Timestamp: "2026-04-22 17:49:42"
  }
];

const priorityMap = {
  Placement: 3,
  Result: 2,
  Event: 1
};

function getPriorityNotifications(data, limit = 10) {
  const sorted = data.sort((a, b) => {
    const priorityA = priorityMap[a.Type];
    const priorityB = priorityMap[b.Type];

    if (priorityA === priorityB) {
      return new Date(b.Timestamp) - new Date(a.Timestamp);
    }

    return priorityB - priorityA;
  });

  return sorted.slice(0, limit);
}

const result = getPriorityNotifications(notifications);

process.stdout.write(JSON.stringify(result, null, 2));