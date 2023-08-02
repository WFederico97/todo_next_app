// ** React Imports
import { useState } from "react";
import { useForm, Controller } from "react-hook-form";

// ** Next Import
import Link from "next/link";
import { useRouter } from "next/router";

// ** MUI Components
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Checkbox from "@mui/material/Checkbox";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import InputLabel from "@mui/material/InputLabel";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
import { styled, useTheme } from "@mui/material/styles";
import InputAdornment from "@mui/material/InputAdornment";
import MuiFormControlLabel from "@mui/material/FormControlLabel";
import { Grid } from "@mui/material";

// ** Icon Imports
import Icon from "src/@core/components/icon";

// ** Layout Import
import BlankLayout from "src/@core/layouts/BlankLayout";

// ** Hooks
import { useSettings } from "src/@core/hooks/useSettings";
import { useAuth } from "@/hooks/useAuth";

// ** Styled Components

const RightWrapper = styled(Box)(({ theme }) => ({
  width: "100%",
  [theme.breakpoints.up("md")]: {
    maxWidth: 450,
  },
  [theme.breakpoints.up("lg")]: {
    maxWidth: 600,
  },
  [theme.breakpoints.up("xl")]: {
    maxWidth: 750,
  },
}));

const LinkStyled = styled(Link)(({ theme }) => ({
  fontSize: "0.875rem",
  textDecoration: "none",
  color: theme.palette.primary.main,
}));

const FormControlLabel = styled(MuiFormControlLabel)(({ theme }) => ({
  marginTop: theme.spacing(1.5),
  marginBottom: theme.spacing(1.75),
  "& .MuiFormControlLabel-label": {
    fontSize: "0.875rem",
    color: theme.palette.text.secondary,
  },
}));

// ** Form Schema

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
  email: yup.string().email().required("Mail Obligatorio"),
  company: yup
    .string()
    .trim()
    .min(3, "Ingresar al menos 3 caracteres")
    .required(),
  languages: yup
    .string()
    .trim()
    .min(3, "Ingresar al menos 3 caracteres")
    .required(),
  country: yup
    .string()
    .trim()
    .min(3, "Ingresar al menos 3 caracteres")
    .required(),
});

// ** Yup
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import ErrorChip from "../chips/ErrorChip";
import RegisterComponent from "@/views/forms/form-layout/RegisterComponent";

// ** Default Form Values
const defaultValues = {
  username: "",
  password: "",
  email: "",
  first_name: "",
  last_name: "",
  role: "",
};

const Register = () => {
  // ** States
  const [showPassword, setShowPassword] = useState(false);

  // ** Hooks
  const theme = useTheme();
  const { settings } = useSettings();
  const auth = useAuth();
  const router = useRouter();

  // ** Vars
  const { skin } = settings;

  // ** Form Validations
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

  // ** Form Functions
  const handleOnSubmit = async (data) => {
    auth.register(data);
  };

  return (
    <>
      <Box
        className="content-right"
        sx={{
          backgroundColor: "background.paper",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <RegisterComponent />
        {/* <RightWrapper>
        <Box
          sx={{
            p: [6, 12],
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Box sx={{ width: "100%", maxWidth: 400 }}>
            <svg
              width={34}
              height={23.375}
              viewBox="0 0 32 22"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                fill={theme.palette.primary.main}
                d="M0.00172773 0V6.85398C0.00172773 6.85398 -0.133178 9.01207 1.98092 10.8388L13.6912 21.9964L19.7809 21.9181L18.8042 9.88248L16.4951 7.17289L9.23799 0H0.00172773Z"
              />
              <path
                fill="#161616"
                opacity={0.06}
                fillRule="evenodd"
                clipRule="evenodd"
                d="M7.69824 16.4364L12.5199 3.23696L16.5541 7.25596L7.69824 16.4364Z"
              />
              <path
                fill="#161616"
                opacity={0.06}
                fillRule="evenodd"
                clipRule="evenodd"
                d="M8.07751 15.9175L13.9419 4.63989L16.5849 7.28475L8.07751 15.9175Z"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                fill={theme.palette.primary.main}
                d="M7.77295 16.3566L23.6563 0H32V6.88383C32 6.88383 31.8262 9.17836 30.6591 10.4057L19.7824 22H13.6938L7.77295 16.3566Z"
              />
            </svg>
            <Box sx={{ my: 6 }}>
              <Typography
                sx={{
                  mb: 1.5,
                  fontWeight: 500,
                  fontSize: "1.625rem",
                  lineHeight: 1.385,
                }}
              >
                Acá te transformas en un nuevo Turbo Usuario
              </Typography>
            </Box>
            <form
              noValidate
              autoComplete="off"
              onSubmit={handleSubmit(handleOnSubmit)}
            >
              <Controller
                name="email"
                control={control}
                render={({ field }) => (
                  <TextField
                    fullWidth
                    label="Email"
                    sx={{ mb: 4 }}
                    placeholder="user@email.com"
                    {...field}
                  />
                )}
              />
              {errors.email && (
                <Grid>
                  <Typography
                    sx={{
                      mb: 1.5,
                      fontWeight: 200,
                      fontSize: "1.230rem",
                      lineHeight: 1.5,
                    }}
                  >
                    <ErrorChip/> {errors.email.message}
                  </Typography>
                </Grid>
              )}
              <FormControl fullWidth sx={{ mb: 4 }}>
                <InputLabel htmlFor="auth-login-v2-password">
                  Password
                </InputLabel>
                <OutlinedInput
                  label="Password"
                  id="auth-login-v2-password"
                  type={showPassword ? "text" : "password"}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        edge="end"
                        onMouseDown={(e) => e.preventDefault()}
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        <Icon
                          icon={showPassword ? "tabler:eye" : "tabler:eye-off"}
                          fontSize={20}
                        />
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </FormControl>
              <Controller
                name="username"
                control={control}
                render={({ field }) => {
                  <TextField
                    autoFocus
                    fullWidth
                    sx={{ mb: 4 }}
                    label="Username"
                    placeholder="johndoe"
                    {...field}
                  />;
                }}
              />
              {errors.username && (
                <Grid>
                  <Typography
                    sx={{
                      mb: 1.5,
                      fontWeight: 200,
                      fontSize: "1.230rem",
                      lineHeight: 1.5,
                    }}
                  >
                    {errors.username.message}
                  </Typography>
                </Grid>
              )}
              <TextField
                autoFocus
                fullWidth
                sx={{ mb: 4 }}
                label="Role"
                placeholder="Admin"
              />
              <TextField
                autoFocus
                fullWidth
                sx={{ mb: 4 }}
                label="Country"
                placeholder="Argentina"
              />
              <TextField
                autoFocus
                fullWidth
                sx={{ mb: 4 }}
                label="Language"
                placeholder="Español"
              />
              <TextField
                autoFocus
                fullWidth
                sx={{ mb: 4 }}
                label="Company"
                placeholder="Arcor"
              />

              <FormControlLabel
                control={<Checkbox />}
                sx={{
                  mb: 4,
                  mt: 1.5,
                  "& .MuiFormControlLabel-label": { fontSize: "0.875rem" },
                }}
                label={
                  <>
                    <Typography variant="body2" component="span">
                      Acepto los{" "}
                    </Typography>
                    <LinkStyled href="/" onClick={(e) => e.preventDefault()}>
                      terminos y condiciones de privacidad
                    </LinkStyled>
                  </>
                }
              />
              <Button
                fullWidth
                size="large"
                type="submit"
                variant="contained"
                sx={{ mb: 4 }}
              >
                Registrarse
              </Button>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  flexWrap: "wrap",
                  justifyContent: "center",
                }}
              >
                <Typography sx={{ color: "text.secondary", mr: 2 }}>
                  ¿Ya estás turboregistrado?
                </Typography>
                <Typography variant="body2">
                  <LinkStyled href="/login" sx={{ fontSize: "1rem" }}>
                    ¡Turbologueate!
                  </LinkStyled>
                </Typography>
              </Box>
              <Divider
                sx={{
                  fontSize: "0.875rem",
                  color: "text.disabled",
                  "& .MuiDivider-wrapper": { px: 6 },
                  my: (theme) => `${theme.spacing(6)} !important`,
                }}
              >
                or
              </Divider>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <IconButton
                  href="/"
                  component={Link}
                  sx={{ color: "#497ce2" }}
                  onClick={(e) => e.preventDefault()}
                >
                  <Icon icon="mdi:facebook" />
                </IconButton>
                <IconButton
                  href="/"
                  component={Link}
                  sx={{ color: "#1da1f2" }}
                  onClick={(e) => e.preventDefault()}
                >
                  <Icon icon="mdi:twitter" />
                </IconButton>
                <IconButton
                  href="/"
                  component={Link}
                  onClick={(e) => e.preventDefault()}
                  sx={{
                    color: (theme) =>
                      theme.palette.mode === "light" ? "#272727" : "grey.300",
                  }}
                >
                  <Icon icon="mdi:github" />
                </IconButton>
                <IconButton
                  href="/"
                  component={Link}
                  sx={{ color: "#db4437" }}
                  onClick={(e) => e.preventDefault()}
                >
                  <Icon icon="mdi:google" />
                </IconButton>
              </Box>
            </form>
          </Box>
        </Box>
      </RightWrapper> */}
      </Box>
    </>
  );
};
Register.getLayout = (page) => <BlankLayout>{page}</BlankLayout>;
Register.guestGuard = true;

export default Register;
