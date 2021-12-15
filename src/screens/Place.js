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

  Button,
  Grid,
  IconButton,
} from "@material-ui/core";
import { AddCircle, Edit, Delete } from "@material-ui/icons";
import { RingLoader } from "react-spinners";
import { ToastContainer, toast } from "react-toastify";
import {
  getMaps,
  addMap,
  getMap,
  updateMap,
  deleteMap,
} from "../data/placeData";
import PlaceDialog from "./PlaceDialog";
import "react-toastify/dist/ReactToastify.css";
const Place = () => {
  const classes = useStyles();
  const [maps, setMaps] = useState([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [formMode, setFormMode] = useState(true);
  const [mapId, setMapId] = useState("");
  const [title, setTitle] = useState("");
  const [detail, setDetail] = useState("");
  const [imageurl, setImageurl] = useState("");

  const override = `
        display: flex;
        align-items: center;
        justify-content: center;    
        border-color: red;
    `;
  const handleClose = () => {
    setOpen(false);
  };
  const handleTitle = (event) => {
    setTitle(event.target.value);
  };

  const handleDetail = (event) => {
    setDetail(event.target.value);
  };
  const handleImageurl = (event) => {
    setImageurl(event.target.value);
  };

  const getlist = async () => {
    try {
      setLoading(true);
      const list = await getMaps();
      setMaps(list);
      setLoading(false);
    } catch (error) {
      toast.error(error.message);
      setLoading(false);
    }
  };
  const getOneMap = async (id) => {
    try {
      setFormMode(false);
      setMapId(id);
      const response = await getMap(id);
      setTitle(response.title);
      setDetail(response.detail);
      setImageurl(response.imageurl);

      setOpen(true);
    } catch (error) {
      toast.error(error.message);
    }
  };
  const deleteHandler = async (id) => {
    try {
      await deleteMap(id);
      getlist();
      toast.success("Map Deleted Successfully");
    } catch (error) {
      toast.error(error.message);
    }
  };
  const handleAdd = () => {
    setOpen(true);
    setFormMode(true);
    setTitle("");
    setDetail("");
    setImageurl("");
  };

  const addMapHandler = async () => {
    try {
      const map = {
        title,
        detail,
        imageurl,
      };
      if (formMode) {
        await addMap(map);
        toast.success("Map Added Successfully");
        getlist();
        setOpen(false);
        setTitle("");
        setDetail("");
        setImageurl("");
      } else {
        await updateMap(mapId, map);
        toast.success("Map Updated Successfully");
        getlist();
        setOpen(false);
        setTitle("");
        setDetail("");
        setImageurl("");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    getlist();
  }, []);
  return (
    <Container className={classes.container}>
      <ToastContainer />
      <TableContainer component={Paper}>
        <Grid container>
          <Grid item xs={8}>
          <div className={classes.title}>
              All Places
            </div>
          </Grid>
          <Grid item xs={4}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleAdd}
              className={classes.button}
              startIcon={<AddCircle />}
            >
              Add
            </Button>
          </Grid>
        </Grid>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell className={classes.head}>Title</TableCell>
              <TableCell className={classes.head}>Detail</TableCell>
              <TableCell className={classes.head}>ImageURL</TableCell>

              <TableCell className={classes.head}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {maps.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7}>
                  <RingLoader
                    css={override}
                    size={60}
                    color={"#eb4034"}
                    loading={loading}
                  />
                </TableCell>
              </TableRow>
            ) : (
              <>
                {maps.map((maps) => (
                  <TableRow key={maps.id}>
                    <TableCell>{maps.title}</TableCell>
                    <TableCell>{maps.detail} </TableCell>
                    <TableCell>{maps.imageurl}</TableCell>

                    <TableCell>
                      <IconButton
                        onClick={() => getOneMap(maps.id)}
                        color="primary"
                        aria-label="update map"
                      >
                        <Edit />
                      </IconButton>
                      <IconButton
                        onClick={() => deleteHandler(maps.id)}
                        color="secondary"
                        aria-label="delete map"
                      >
                        <Delete />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <PlaceDialog
        open={open}
        close={handleClose}
        formmode={formMode}
        detail={detail}
        imageurl={imageurl}
        title={title}
        changedetail={handleDetail}
        changeimageurl={handleImageurl}
        changetitle={handleTitle}
        addMap={addMapHandler}
      />
    </Container>
  );
};

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 650,
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

export default Place;
