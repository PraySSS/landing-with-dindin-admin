import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
  TableHead,
  TableContainer,
  Paper,
  makeStyles,
  Container,
  Grid,
} from "@material-ui/core";
import { RingLoader } from "react-spinners";
import { ToastContainer, toast } from "react-toastify";
import {
  getFeedbacks,
  getFeedback,
  deleteFeedback,
} from "../data/feedbackData";

const Feedback = () => {
  const classes = useStyles();
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(false);
 /*  const [open, setOpen] = useState(false);
  const [formMode, setFormMode] = useState(true);
  const [feedId, setFeedId] = useState("");
  const [feedback, setFeedback] = useState(""); */


  const override = `
        display: flex;
        alignItems: center;
        justify-content: center;    
        border-color: red;
    `;
  /* const handleClose = () => {
    setOpen(false);
  };
  const handleFeedback = (event) => {
    setFeedback(event.target.value);
  }; */

  const getlist = async () => {
    try {
      setLoading(true);
      const list = await getFeedbacks();
      setFeedbacks(list);
      setLoading(false);
    } catch (error) {
      toast.error(error.message);
      setLoading(false);
    }
  };
  /* const getOneFeedback = async (id) => {
    try {
      setFormMode(false);
      setFeedId(id);
      const response = await getFeedback(id);
      setFeedback(response.feedback);

      setOpen(true);
    } catch (error) {
      toast.error(error.message);
    }
  }; */
  /* const deleteHandler = async (id) => {
    try {
      await deleteFeedback(id);
      getlist();
      toast.success("Feedback Deleted Successfully");
    } catch (error) {
      toast.error(error.message);
    }
  };
 */
  useEffect(() => {
    getlist();
  }, []);
  return (
    <Container className={classes.container}>
      <ToastContainer />
      <TableContainer component={Paper}>
        <Grid container>
          <Grid item xs={10}>
          <div className={classes.title}>
              All Feedbacks
            </div>
          </Grid>
          <Grid item xs={4}></Grid>
        </Grid>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell className={classes.head}>Feedback</TableCell>

            </TableRow>
          </TableHead>
          <TableBody>
            {feedbacks.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7}>
                  <RingLoader
                    css={override}
                    size={60}
                    color={"#77302A"}
                    loading={loading}
                  />
                </TableCell>
              </TableRow>
            ) : (
              <>
                {feedbacks.map((feed) => (
                  <TableRow key={feed.id}>
                    
                    <TableCell>{feed.feedback}</TableCell>

                 
                  </TableRow>
                ))}
              </>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 600,
    alignContent:'center'
  },
  container: {
    marginTop: "40px",
  },
  title: {
    flex: "1 1 100%",
    padding: "20px",
    fontSize: '20px',
  },
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  button: {
    margin: theme.spacing(1),
    float: "right",
  },
}));

export default Feedback;
