import React, { useEffect, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Snackbar from "@mui/material/Snackbar";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import TextField from "@mui/material/TextField";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

import { StudentlistInterface } from "../interfaces/IStudentlist";
import { PaymentstatusInterface } from "../interfaces/IPaymentstatus";
import { BankingInterface } from "../interfaces/IBanking";
import { SliplistInterface } from "../interfaces/ISliplist";

import {
  GetBanking,
  GetSlipList,
  GetStudentList,
  GetPaymentStatus,
  Sliplist,
} from "../services/HttpClientServer";
const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function SliplistCreate() {
  const [bankings, setBankings] = useState<BankingInterface[]>([]);
  const [studentlists, setStudentlists] = useState<StudentlistInterface[]>([]);
  const [paymentstatuses, setPaymentstatus] = useState<PaymentstatusInterface[]>([]);
  const [total, setTotal] = React.useState<String>("");

  const [slipList, setSliplist] = useState<SliplistInterface>({
    Slipdate: new Date(),Total: "",

  });

  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setSuccess(false);
    setError(false);
  };

  const handleChange = (event: SelectChangeEvent) => {
    const name = event.target.name as keyof typeof slipList;
    setSliplist({
      ...slipList,
      [name]: event.target.value,
    });
  };

  const getBanking = async () => {
    let res = await GetBanking();
    if (res) {
      setBankings(res);
    }
  };

  const getStudentList = async () => {
    let res = await GetStudentList();
    if (res) {
      setStudentlists(res);
    }
  };

  const getPaymentStatus = async () => {
    let res = await GetPaymentStatus();
    slipList.PayID = res.ID;
    if (res) {
      setPaymentstatus(res);
    }
  };

  useEffect(() => {
    getBanking();
    getStudentList();
    getPaymentStatus();
  }, []);

  const convertType = (data: string | number | undefined) => {
    let val = typeof data === "string" ? parseInt(data) : data;
    return val;
  };

  async function submit() {
    let data = {
      StudentListID: convertType(slipList.StudentListID),
      PayID: convertType(slipList.PayID),
      BankingID: convertType(slipList.BankingID),
      Slipdate: slipList.Slipdate,
      Total: slipList.Total,
    };

    let res = await Sliplist(data);
    if (res) {
      setSuccess(true);
    } else {
      setError(true);
    }
  }

  return (
    <Container maxWidth="md" >
      <Snackbar
        open={success}
        autoHideDuration={3000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert onClose={handleClose} severity="success">
          บันทึกข้อมูลสำเร็จ
        </Alert>
      </Snackbar>
      <Snackbar
        open={error}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert onClose={handleClose} severity="error">
          บันทึกข้อมูลไม่สำเร็จ
        </Alert>
      </Snackbar>
      <Paper>
        <Box
          display="flex"
          sx={{
            marginTop: 2,
          }}
        >
          <Box sx={{ paddingX: 2, paddingY: 1 }}>
            <Typography
              component="h2"
              variant="h6"
              color="primary"
              gutterBottom
            >
              บันทึกข้อมูลธุรกรรมการเงินทุนการศึกษา
            </Typography>
          </Box>
        </Box>
        <Divider />
        <Grid container spacing={2} sx={{ padding: 2 }}>
          <Grid item xs={10}>
            <FormControl fullWidth variant="outlined">
              <p>สถานะการโอนเงินทุนการศึกษา</p>
              <Select
                native
                value={slipList.BankingID + ""}
                onChange={handleChange}
                inputProps={{
                  name: "BankingID",
                }}
              >
                <option aria-label="None" value="">
                เลือกบัญชีธนาคาร
                </option>
                {bankings.map((item: BankingInterface) => (
                  <option value={item.ID} key={item.ID}>
                    {item.Name}
                  </option>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={8}>
            <FormControl fullWidth variant="outlined">
              <p>นักศึกษาที่ถูกคัดเลือก</p>
              <Select
                native
                value={slipList.StudentListID + ""}
                onChange={handleChange}
                inputProps={{
                  name: "StudentListID",
                }}
              >
                <option aria-label="None" value="">
                  เลือกนักศึกษาที่ถูกคัดเลือก
                </option>
                {studentlists.map((item: StudentlistInterface) => (
                  <option value={item.ID} key={item.ID}>
                    {item.ID}
                  </option>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={8}>
            <FormControl fullWidth variant="outlined">
              <p>สถานะการโอนเงินทุนการศึกษา</p>
              <Select
                native
                value={slipList.PayID + ""}
                onChange={handleChange}
                inputProps={{
                  name: "PayID",
                }}
              >
                <option aria-label="None" value="">
                  เลือกสถานะการโอนเงินทุนการศึกษา
                </option>
                {paymentstatuses.map((item: PaymentstatusInterface) => (
                  <option value={item.ID} key={item.ID}>
                    {item.ID}
                  </option>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6}>
               <p>จำนวนเงิน</p>
               <TextField 
               fullWidth 
               id="total" 
               type="String" 
               variant="outlined" 
               onChange={(event) => setTotal(event.target.value)}               
               />          
          </Grid>
          <Grid item xs={6}>
            <FormControl fullWidth variant="outlined">
              <p>วันที่และเวลา</p>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  value={slipList.Slipdate}
                  onChange={(newValue) => {
                    setSliplist({
                      ...slipList,
                      Slipdate: newValue,
                    });
                  }}
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <Button
              component={RouterLink}
              to="/sliplist"
              variant="outlined"
              color="primary"
            >
              Back
            </Button>
            <Button
              style={{ float: "right" }}
              onClick={submit}
              variant="contained"
              color="primary"
            >
              Save
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
}

export default SliplistCreate;