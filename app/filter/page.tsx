"use client";

import { useEffect, useState } from "react";
import { getNotifications } from "../services/api";
import {
  Container,
  Typography,
  Card,
  CardContent,
  MenuItem,
  Select,
  Box,
  Button,
  Chip,
} from "@mui/material";

export default function FilterPage() {
  const [data, setData] = useState<any[]>([]);
  const [type, setType] = useState("All");

  useEffect(() => {
    getNotifications().then((res) => {
      console.log("DATA:", res.data);

      // ✅ CORRECT LINE (THIS FIXES EVERYTHING)
      setData(res.data.notifications);
    });
  }, []);

  // ✅ FILTER LOGIC (ALREADY CORRECT)
  const filtered =
    type === "All"
      ? data
      : data.filter(
          (item) =>
            item.Type?.toLowerCase().trim() ===
            type.toLowerCase().trim()
        );

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        🔎 Filter Notifications
      </Typography>

      <Button variant="outlined" sx={{ mb: 2 }} href="/">
        Back to Home
      </Button>

      <Box sx={{ mb: 3 }}>
        <Select
          value={type}
          onChange={(e) => setType(e.target.value)}
          fullWidth
        >
          <MenuItem value="All">All</MenuItem>
          <MenuItem value="Placement">Placement</MenuItem>
          <MenuItem value="Result">Result</MenuItem>
          <MenuItem value="Event">Event</MenuItem>
        </Select>
      </Box>

      <Typography variant="body2" sx={{ mb: 2 }}>
        Total: {filtered.length}
      </Typography>

      {filtered.length === 0 ? (
        <Typography>No notifications found</Typography>
      ) : (
        filtered.map((item) => (
          <Card key={item.ID} sx={{ mb: 2 }}>
            <CardContent>
              <Typography variant="h6">{item.Message}</Typography>

              <Box sx={{ mt: 1 }}>
                <Chip label={item.Type} size="small" />
              </Box>

              <Typography variant="body2" sx={{ mt: 1 }}>
                {new Date(item.Timestamp).toLocaleString()}
              </Typography>
            </CardContent>
          </Card>
        ))
      )}
    </Container>
  );
}