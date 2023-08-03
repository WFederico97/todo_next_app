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
  const { settings } = useSettings();

  // ** Vars
  const { skin } = settings;

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
      </Box>
    </>
  );
};
Register.getLayout = (page) => <BlankLayout>{page}</BlankLayout>;
Register.guestGuard = true;

export default Register;
