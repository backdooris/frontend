/* SPDX-FileCopyrightText: 2014-present Kriasoft */
/* SPDX-License-Identifier: MIT */

import {
  Box,
  Card,
  CardContent,
  Container,
  Dropdown,
  Grid,
  Menu,
  MenuButton,
  MenuItem,
  Sheet,
  Table,
  Textarea,
  Typography,
} from "@mui/joy";

import { useEffect } from "react";
import { usePageEffect } from "../core/page";
import instance from "../utils/axios";

export const Component = function Dashboard(): JSX.Element {
  usePageEffect({ title: "Dashboard" });

  const getLists = async () => {
    instance
      .get("/api/v1/users/1")
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getLists();
  }, []);

  return (
    <Container sx={{ py: 2 }}>
      <Typography sx={{ mb: 2 }} level="h2">
        LOGO
      </Typography>

      <Dropdown>
        <MenuButton css={{ width: "100%" }}>drop down menu</MenuButton>
        <Menu css={{ width: "90%" }}>
          <MenuItem>Add item</MenuItem>
        </Menu>
      </Dropdown>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { sm: "1fr", md: "1fr 1fr" },
          gap: 2,
          mt: 3,
        }}
      >
        <Sheet>
          <Table borderAxis="xBetween" color="neutral" variant="outlined">
            <thead>
              <tr>
                <th style={{ width: "100%" }}>Column 1</th>
                <th style={{ width: "100%" }}>Column 1</th>
                <th style={{ width: "100%" }}>Column 1</th>
              </tr>
            </thead>
            <tbody>
              <div style={{ width: "100%" }}>
                <Dropdown>
                  <MenuButton css={{ width: "100%" }}>
                    drop down menu
                  </MenuButton>
                  <Menu css={{ width: "90%" }}>
                    <MenuItem>Add item</MenuItem>
                  </Menu>
                </Dropdown>
              </div>
            </tbody>
            <tbody>
              <tr>
                <th style={{ width: "100%" }}>Column 1</th>
              </tr>
            </tbody>
            <tbody>
              <tr>
                <th style={{ width: "40%" }}>Column 1</th>
                <th style={{ width: "64px" }}>Column 2</th>
              </tr>
            </tbody>
            <tbody>
              <tr>
                <th style={{ width: "40%" }}>Column 1</th>
                <th style={{ width: "64px" }}>Column 2</th>
              </tr>
            </tbody>
          </Table>
        </Sheet>

        <Card>
          <CardContent sx={{ minHeight: 150 }}>
            <Typography level="h3">Card title</Typography>
            <Typography>Card content</Typography>
          </CardContent>
        </Card>

        <Card>
          <CardContent sx={{ minHeight: 150 }}>
            <Typography level="h3">Card title</Typography>
            <Typography>Card content</Typography>
          </CardContent>
        </Card>
      </Box>

      <Typography sx={{ mb: 2, mt: 5 }} level="h2">
        자격증 찾기
      </Typography>

      <Grid container spacing={2} sx={{ flexGrow: 1 }}>
        <Grid xs={2}>
          <Typography level="h4">자격증명</Typography>
        </Grid>
        <Grid xs={10}>
          <Textarea
            sx={{ paddingLeft: 4 }}
            placeholder="사회"
            size="md"
            variant="soft"
          />
        </Grid>
      </Grid>

      <Sheet>
        <Table borderAxis="xBetween" color="neutral" variant="outlined">
          <thead>
            <tr>
              <th style={{ width: "100%" }}>Column 1</th>
              <th style={{ width: "100%" }}>Column 1</th>
              <th style={{ width: "100%" }}>Column 1</th>
            </tr>
          </thead>
          <tbody>
            <div style={{ width: "100%" }}>
              <Dropdown>
                <MenuButton css={{ width: "100%" }}>drop down menu</MenuButton>
                <Menu css={{ width: "90%" }}>
                  <MenuItem>Add item</MenuItem>
                </Menu>
              </Dropdown>
            </div>
          </tbody>
          <tbody>
            <tr>
              <th style={{ width: "100%" }}>Column 1</th>
            </tr>
          </tbody>
          <tbody>
            <tr>
              <th style={{ width: "40%" }}>Column 1</th>
              <th style={{ width: "64px" }}>Column 2</th>
            </tr>
          </tbody>
          <tbody>
            <tr>
              <th style={{ width: "40%" }}>Column 1</th>
              <th style={{ width: "64px" }}>Column 2</th>
            </tr>
          </tbody>
        </Table>
      </Sheet>
    </Container>
  );
};
