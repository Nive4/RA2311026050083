"use client";

import { useEffect, useState } from "react";
import { getNotifications } from "./services/api";
import { sendLog } from "./services/log"; // ✅ ADD THIS
import {
  Container,
  Typography,
  Card,
  CardContent,
  Chip,
  Box,
  Button,
} from "@mui/material";

export default function Home() {
  const [data, setData] = useState<any[]>([]);
  const [seen, setSeen] = useState<string[]>([]);

  useEffect(() => {
    getNotifications().then((res) => {
      setData(res.data);

      // ✅ LOG PAGE LOAD
      sendLog({
        action: "PAGE_LOAD",
        page: "HOME",
      });
    });
  }, []);

  const weight: any = {
    Placement: 3,
    Result: 2,
    Event: 1,
  };

  const sorted = [...data].sort((a, b) => {
    if (weight[b.Type] !== weight[a.Type]) {
      return weight[b.Type] - weight[a.Type];
    }
    return new Date(b.Timestamp).getTime() - new Date(a.Timestamp).getTime();
  });

  const top10 = sorted.slice(0, 10);

  // ✅ UPDATED CLICK FUNCTION WITH LOG
  const markSeen = (id: string) => {
    if (!seen.includes(id)) {
      setSeen([...seen, id]);

      sendLog({
        action: "CLICK_NOTIFICATION",
        id: id,
      });
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        📩 Priority Inbox
      </Typography>

      <Button variant="contained" sx={{ mb: 2 }} href="/filter">
        Go to Filter Page
      </Button>

      <Typography variant="subtitle1" gutterBottom>
        Showing Top 10 Important Notifications
      </Typography>

      {top10.map((item) => (
        <Card
          key={item.ID}
          sx={{ mb: 2, cursor: "pointer" }}
          onClick={() => markSeen(item.ID)}
        >
          <CardContent>
            <Typography variant="h6">{item.Message}</Typography>

            <Box sx={{ display: "flex", gap: 1, mt: 1 }}>
              <Chip label={item.Type} color="primary" size="small" />

              {!seen.includes(item.ID) && (
                <Chip label="NEW" color="success" size="small" />
              )}
            </Box>

            <Typography variant="body2" sx={{ mt: 1 }}>
              {new Date(item.Timestamp).toLocaleString()}
            </Typography>
          </CardContent>
        </Card>
      ))}
    </Container>
  );
}