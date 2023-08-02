// ** React Imports
import { useEffect, useState } from 'react'
import { useForm, Controller } from "react-hook-form";

// ** Redux Imports
import { useDispatch, useSelector } from 'react-redux';

// ** Next Import
import Link from 'next/link'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import InputLabel from '@mui/material/InputLabel'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import FormControl from '@mui/material/FormControl'
import OutlinedInput from '@mui/material/OutlinedInput'
import InputAdornment from '@mui/material/InputAdornment'

import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Store Imports
import { getCompanies } from '@/store/companies/companiesSlice';

// ** Hooks
import { useAuth } from "@/hooks/useAuth";

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
  // confirmPassword: yup
  //   .string()
  //   .oneOf([yup.ref('password'), null], 'Las contraseñas deben coincidir'),
  email: yup
    .string()
    .email()
    .required("Mail Obligatorio"),
  company: yup
    .string()
    .trim()
    .required("Debes seleccionar una companía"),
  language: yup
    .string()
    .trim()
    .required("Debes seleccionar un lenguaje"),
  country: yup
    .string()
    .trim()
    .required("Debes seleccionar un país"),
});

// ** Yup
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import ErrorChip from '@/components/chips/ErrorChip';

// ** Default Form Values
const defaultValues = {
  email: "",
  password: "",
  username: "",
  role: "",
  country: "",
  language: "",
  company: "",
};
const RegisterComponent = () => {
  // ** States
  const [values, setValues] = useState({
    password: '',
    showPassword: false
  })

  // const [confirmPassValues, setConfirmPassValues] = useState({
  //   password: '',
  //   showPassword: false
  // })

  // ** Hooks
  const auth = useAuth();
  const companies = useSelector((state) => state.companies.data)
  const dispatch = useDispatch()

  // ** Form Validations
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues,
    mode: "all",
    resolver: yupResolver(formSchema),
  });

  // ** Form Functions
  const handleOnSubmit = async (data) => {
    auth.register(data);
  };

  const handleChange = prop => event => {
    setValues({ ...values, [prop]: event.target.value })
  }

  const handleConfirmPassChange = prop => event => {
    setConfirmPassValues({ ...confirmPassValues, [prop]: event.target.value })
  }

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword })
  }

  // const handleClickConfirmPassShow = () => {
  //   setConfirmPassValues({ ...confirmPassValues, showPassword: !confirmPassValues.showPassword })
  // }

  useEffect(()=>{
    dispatch(getCompanies({page: 1 , limit: 10}))
  }, [])

  return (
    <Card>
      <Box sx={{ my: 6, display: 'flex', justifyContent: 'center' }}>
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
      <CardContent sx={{ minHeight: 500, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <form onSubmit={handleSubmit(handleOnSubmit)}>
          <Grid container spacing={5}>
            <Grid item xs={12} >
              <Controller
                name='username'
                control={control}
                render={({ field }) => (
                  <TextField
                    fullWidth
                    label='Nombre'
                    sx={{ mb: 4 }}
                    placeholder='Juan Roman'
                    {...field} />
                )}
              />
              {errors.username && (
                <Grid>
                  <Typography
                    variant="subtitle1"
                  >
                    <ErrorChip /> {errors.username.message}
                  </Typography>
                </Grid>
              )}
            </Grid>
            <Grid item xs={12}>
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
                    variant="subtitle1"
                  >
                    <ErrorChip /> {errors.email.message}
                  </Typography>
                </Grid>
              )}
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth >
                <InputLabel htmlFor='loginForm'>Contraseña</InputLabel>
                <Controller
                  name='password'
                  control={control}
                  render={({ field }) => (
                    <OutlinedInput
                      label='Contraseña'
                      value={values.password}
                      onChange={handleChange('password')}
                      id='loginForm'
                      type={values.showPassword ? 'text' : 'password'}
                      endAdornment={
                        <InputAdornment position='end'>
                          <IconButton
                            edge='end'
                            onClick={handleClickShowPassword}
                            onMouseDown={e => e.preventDefault()}
                            aria-label='toggle password visibility'
                          >
                            <Icon icon={values.showPassword ? 'tabler:eye' : 'tabler:eye-off'} />
                          </IconButton>
                        </InputAdornment>
                      }
                      {...field}
                    />
                  )}
                />
                {errors.password && (
                  <Grid sx={{ padding: '0.256em' }} >
                    <Typography variant="subtitle1">
                      <ErrorChip /> {errors.password.message}
                    </Typography>
                  </Grid>
                )}
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              {/* <FormControl fullWidth>
                <InputLabel htmlFor='confirm-password'>Confirmar Contraseña</InputLabel>
                <Controller
                  name='confirmPassword'
                  control={control}
                  render={({ field }) => (
                    <OutlinedInput
                      label='Confirmar Contraseña'
                      value={confirmPassValues.password}
                      id='confirm-password'
                      onChange={handleConfirmPassChange('password')}
                      type={confirmPassValues.showPassword ? 'text' : 'password'}
                      endAdornment={
                        <InputAdornment position='end'>
                          <IconButton
                            edge='end'
                            onClick={handleClickConfirmPassShow}
                            onMouseDown={e => e.preventDefault()}
                            aria-label='toggle password visibility'
                          >
                            <Icon icon={confirmPassValues.showPassword ? 'tabler:eye' : 'tabler:eye-off'} />
                          </IconButton>
                        </InputAdornment>
                      }
                      {...field}
                    />

                  )}
                />
                {errors.confirmPassword && (
                  <Grid sx={{ padding: '0.256em' }} >
                    <Typography variant="subtitle1">
                      <ErrorChip /> {errors.confirmPassword.message}
                    </Typography>
                  </Grid>
                )}
              </FormControl> */}
              <FormControl required fullWidth>
                <InputLabel id='companySelector'>Company</InputLabel>
                <Controller
                  name='company'
                  control={control}
                  render={({ field }) => (
                    <Select label='Company' labelId='companySelector' fullWidth {...field} />
                  )}
                />
                {errors.company && (
                  <Grid  >
                    <Typography variant="subtitle1">
                      <ErrorChip /> {errors.company.message}
                    </Typography>
                  </Grid>
                )}
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl required fullWidth>
                <InputLabel id='languageSelector'>Language</InputLabel>
                <Controller
                  name='language'
                  control={control}
                  render={({ field }) => (
                    <Select label='Language' labelId='languageSelector' fullWidth {...field} />
                  )}
                />
                {errors.language && (
                  <Grid  >
                    <Typography variant="subtitle1">
                      <ErrorChip /> {errors.language.message}
                    </Typography>
                  </Grid>
                )}
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl required fullWidth>
                <InputLabel id='countrySelector'>Country</InputLabel>
                <Controller
                  name='country'
                  control={control}
                  render={({ field }) => (
                    <Select label='Country' labelId='countrySelector' fullWidth {...field} />
                  )}
                />
                {errors.country && (
                  <Grid  >
                    <Typography variant="subtitle1">
                      <ErrorChip /> {errors.country.message}
                    </Typography>
                  </Grid>
                )}
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <Box
                sx={{
                  gap: 5,
                  display: 'flex',
                  flexWrap: 'wrap',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}
              >
                <Button type='submit' variant='contained' size='large'>
                  Get Started!
                </Button>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    '& a': { color: 'primary.main', textDecoration: 'none' }
                  }}
                >
                  <Typography sx={{ mr: 2 }}>Already have an account?</Typography>
                  <Link href='/login' onClick={e => e.preventDefault()}>
                    Log in
                  </Link>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </form>
      </CardContent>
    </Card>
  )
}

export default RegisterComponent
