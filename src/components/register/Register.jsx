import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Button,
  Card,
  CardActions,
  Grid,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/router";


const defaultValues = {
  username: "",
  password: "",
  email:'string',
  first_name: "string",
  last_name: "string",
  role: "string",
};

const formSchema = yup.object({
  username: yup
    .string()
    .trim()
    .min(3, "Ingresar al menos 3 caracteres")
    .required("Campo Obligatorio"),
  password: yup
    .string()
    .trim()
    .min(5, "La contraseña debe ser minimo 5 caracteres")
    .required("Campo Obligatorio"),
});

const Register = () => {
  const [dataCountries, setDataCountries] = useState([]);
  const [dataLanguages, setDataLanguages] = useState([]);
  const [isError, setIsError] = useState(false)
  const auth = useAuth()
  const router = useRouter()

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues,
    mode: "all",
    resolver: yupResolver(formSchema),
  });

  const handleOnSubmit = async (data) => {
    try {
      console.log(data);
    auth.register(data)
    console.log("registro existoso");
    router.push("/login")
    } catch (error) {
      console.log(error.response.data.detail)
    }
  };

  return (
    <>
      <Grid sx={{ textAlign: "center" }}>
        <Typography variant="h3"> Register </Typography>
      </Grid>
      <Grid sx={{ justifyContent: "center", display: "flex", m: 1 }}>
        {isError ? <Typography>Error en Base De datos </Typography> :
          <Card >
            <form onSubmit={handleSubmit(handleOnSubmit)} className="register-form">
              <Grid sx={{ margin: 1 }}>
                <Controller
                  name="email"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      label="Email"
                      type="text"
                      sx={{ margin: 1 }}
                      {...field}
                    />
                  )}
                />
                {errors.email && (
                  <Grid>
                    <Typography variant="caption">
                      {errors.email.message}
                    </Typography>
                  </Grid>
                )}
                <Controller
                  name="username"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      label="Username"
                      type="text"
                      sx={{ margin: 1 }}
                      {...field}
                    />
                  )}
                />
                {errors.username && (
                  <Grid>
                    <Typography variant="caption">
                      {errors.username.message}
                    </Typography>
                  </Grid>
                )}
              </Grid>
              <Grid sx={{ margin: 1 }}>
              </Grid>
              <Grid sx={{ margin: 1, display: "flex" }}>
                <Controller
                  name="password"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      label="Password"
                      sx={{ margin: 1, width: "100%" }}
                      type="password"
                      {...field}
                    />
                  )}
                />
                {errors.password && (
                  <Grid>
                    <Typography variant="caption">
                      {errors.password.message}
                    </Typography>
                  </Grid>
                )}
              </Grid>
              <CardActions sx={{ display: "flex", justifyContent: "center" }}>
                <Button
                  sx={{ margin: 1 }}
                  variant="contained"
                  color="success"
                  type="submit"
                >
                  Register
                </Button>
                <Button
                  sx={{ margin: 1 }}
                  variant="contained"
                  color="warning"
                  onClick={() => reset()}
                >
                  Cancel
                </Button>
              </CardActions>
            </form>
          </Card>
        }
      </Grid>
    </>
  );
};

export default Register;
