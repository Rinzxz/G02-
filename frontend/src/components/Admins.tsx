import React, { useState, useEffect } from "react";
import { Link as RouterLink } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import { AdminInterface } from "../interfaces/IAdmin";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { GetAdmins } from "../services/HttpClientServer";
function Admins() {
  const [admins, setAdmins] = useState<AdminInterface[]>([]);

  const getAdmins = async () => {
    let res = await GetAdmins();
    if (res) {
      setAdmins(res);
    }
  };

  const columns: GridColDef[] = [
    { field: "ID", headerName: "ลำดับ", width: 100 },
    { field: "Name", headerName: "ชื่อ - สกุล", width: 300 },
    { field: "Email", headerName: "อีเมล", width: 400 },
    { field: "Password", headerName: "รหัสผ่าน", width: 400 },

  ];

  useEffect(() => {
    getAdmins();
  }, []);

  return (
    <div>
      <Container maxWidth="md">
        <Box
          display="flex"
          sx={{
            marginTop: 2,
          }}
        >
          <Box flexGrow={1}>
            <Typography
              component="h2"
              variant="h6"
              color="primary"
              gutterBottom
            >
              ข้อมูลสมาชิก
            </Typography>
          </Box>
          <Box>
            <Button
              component={RouterLink}
              to="/user/create"
              variant="contained"
              color="primary"
            >
              สร้างข้อมูล
            </Button>
          </Box>
        </Box>
        <div style={{ height: 400, width: "100%", marginTop: "20px" }}>
          <DataGrid
            rows={admins}
            getRowId={(row) => row.ID}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
          />
        </div>
      </Container>
    </div>
  );
}

export default Admins;