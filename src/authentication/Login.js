import React, { useState } from "react";
import {
  Container,
  CssBaseline,
  Avatar,
  Button,
  makeStyles,
  Card,
  CardContent,
} from "@material-ui/core";
import { LockRounded } from "@material-ui/icons";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import firebase from "../helpers/fireAd";
import { ToastContainer, toast } from "react-toastify";
import { RingLoader } from "react-spinners";

const Login = (props) => {
  const classes = useStyles();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const override = `
  display: flex;
  align-items: center;
  justify-content: center;    
  border-color: red;
    `;
  const handleEmail = (event) => {
    setEmail(event.target.value);
  };
  const handlePassword = (event) => {
    setPassword(event.target.value);
  };

  const handlerLogin = () => {
    setLoading(true);

    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((response) => {
        const { user } = response;
        const data = {
          userId: user.uid,
          email: user.email,
        };
        localStorage.setItem("user", JSON.stringify(data));
        const storage = localStorage.getItem("user");
        const loggedInUser = storage !== null ? JSON.parse(storage) : null;
        props.loggedIn(loggedInUser);
        setLoading(false);
      })
      .catch((error) => {
        toast.error(error.message);
        setLoading(false);
      });
  };
  return (
    <div className={classes.main}>
      <Container component="main" maxWidth="xs">
        <Card className={classes.card}>
          <CardContent>
            <ToastContainer />
            <CssBaseline />
            <div className={classes.paper}>
              <Avatar className={classes.avatar}>
                <LockRounded />
              </Avatar>
              <div className={classes.logo}>Welcome to My admin</div>
              <ValidatorForm
                onSubmit={handlerLogin}
                onError={(errors) => {
                  for (const err of errors) {
                    console.log(err.props.errorMessages[0]);
                  }
                }}
                className={classes.form}
              >
                <TextValidator
                  variant="standard"
                  margin="normal"
                  fullWidth
                  label="Email"
                  onChange={handleEmail}
                  name="email"
                  value={email}
                  validators={["required", "isEmail"]}
                  errorMessages={[
                    "this field is required",
                    "email is not valid",
                  ]}
                  autoComplete="off"
                />
                <TextValidator
                  variant="standard"
                  fullWidth
                  label="Password"
                  onChange={handlePassword}
                  name="password"
                  type="password"
                  value={password}
                  validators={["required"]}
                  errorMessages={["this field is required"]}
                  autoComplete="off"
                />
                {loading ? (
                  <RingLoader
                    css={override}
                    size={50}
                    color={"#77302A"}
                    loading={loading}
                  />
                ) : (
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    className={classes.submit}
                  >
                    Sign In
                  </Button>
                )}
              </ValidatorForm>
            </div>
          </CardContent>
        </Card>
      </Container>
    </div>
  );
};

const useStyles = makeStyles((theme) => ({
  main: {
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
    alignItems: "center",
    justifyContent: "flex-start",
    background:
      "url(https://en.mfu.ac.th/fileadmin/_processed_/d/0/csm_05_c9be468c31.jpg)",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
  },
  paper: {
    marginTop: 10,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 500,
    display: "flex",
    flexDirection: "Column",
  },
  avatar: {
    backgroundColor: "#77302A",
    height: 50,
    width: 50,
    marginTop: 10,
    marginBottom: 30,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: 30,
  },
  submit: {
    background: "#77302A",
    margin: theme.spacing(3, 0, 2),
    color: "#fff",
  },
  card: {
    marginTop: 60,
    padding: "0 16px 16px 16px",
  },
  pointer: {
    cursor: "pointer",
    color: "red",
  },
  logo: {
    fontWeight: "bold",
    fontSize: "24px",
    color: "#77302A",
    cursor: "pointer",
  },
}));
export default Login;
