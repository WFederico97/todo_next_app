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
import { getCountries } from '@/store/countries/countriesSlice';
import { getLanguages } from '@/store/languages/languagesSlice';

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
  usr_email: "",
  usr_password: "",
  usr_name: "",
  usr_role: "",
  usr_country: "",
  usr_language: "",
  usr_company: "",
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
  const countries = useSelector((state) => state.countries.data)
  const languages = useSelector((state) => state.languages.data)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getCompanies())
    dispatch(getCountries())
    dispatch(getLanguages())
  }, [])

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
    
    console.log("llegue")
    
    auth.register(data);
  };

  const handleChange = prop => event => {
    setValues({ ...values, [prop]: event.target.value })
  }

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword })
  }



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
              name='usr_name'
              control={control}
              render={({ field }) => (
                <TextField
                  fullWidth
                  label='Nombre'
                  placeholder='Juan Roman'
                  {...field} />
              )}
              />
              {errors.usr_name && (
                <Grid>
                  <Typography
                    variant="subtitle1"
                    sx={{ pt: '0.256em' }}
                  >
                    <ErrorChip /> {errors.usr_name.message}
                  </Typography>
                </Grid>
              )}
            </Grid>
            <Grid item xs={12}>
              <Controller
                name="usr_email"
                control={control}
                render={({ field }) => (
                  <TextField
                    fullWidth
                    label="Email"
                    placeholder="user@email.com"
                    {...field}
                  />
                )}
              />
              {errors.usr_email && (
                <Grid>
                  <Typography
                    variant="subtitle1"
                    sx={{ pt: '0.256em' }}
                  >
                    <ErrorChip /> {errors.usr_email.message}
                  </Typography>
                </Grid>
              )}
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth >
                <InputLabel htmlFor='loginForm'>Contraseña</InputLabel>
                <Controller
                  name='usr_password'
                  control={control}
                  render={({ field }) => (
                    <OutlinedInput
                      label='Contraseña'
                      value={values.usr_password}
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
                {errors.usr_password && (
                  <Grid >
                    <Typography sx={{ pt: '0.256em' }} variant="subtitle1">
                      <ErrorChip /> {errors.usr_password.message}
                    </Typography>
                  </Grid>
                )}
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl required fullWidth>
                <InputLabel id='companySelector'>Company</InputLabel>
                <Controller
                  name='usr_company'
                  control={control}
                  render={({ field }) => (
                    <Select label='Company' labelId='companySelector' fullWidth {...field} >
                      {companies.map((company, index) => (
                        <MenuItem key={index} value={company.name}>
                          {company.name}
                        </MenuItem>
                      ))}
                    </Select>
                  )}
                />
                {errors.usr_company && (
                  <Grid  >
                    <Typography sx={{ pt: '0.256em' }} variant="subtitle1">
                      <ErrorChip /> {errors.usr_company.message}
                    </Typography>
                  </Grid>
                )}
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl required fullWidth>
                <InputLabel id='languageSelector'>Language</InputLabel>
                <Controller
                  name='usr_language'
                  control={control}
                  render={({ field }) => (
                    <Select label='Languages' labelId='languageSelector' fullWidth {...field} >
                      {languages.map((language, index) => (
                        <MenuItem key={index} value={language.name}>
                          {language.name}
                        </MenuItem>
                      ))}
                    </Select>
                  )}
                />
                {errors.usr_language && (
                  <Grid  >
                    <Typography sx={{ pt: '0.256em' }} variant="subtitle1">
                      <ErrorChip /> {errors.usr_language.message}
                    </Typography>
                  </Grid>
                )}
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl required fullWidth>
                <InputLabel id='countrySelector'>Country</InputLabel>
                <Controller
                  name='usr_country'
                  control={control}
                  render={({ field }) => (
                    <Select label='Country' labelId='countrySelector' fullWidth {...field} >
                      {countries.map((country, index) => (
                        <MenuItem key={index} value={country.name}>
                          {country.name}
                        </MenuItem>
                      ))}
                    </Select>
                  )}
                />
                {errors.usr_country && (
                  <Grid  >
                    <Typography sx={{ pt: '0.256em' }} variant="subtitle1">
                      <ErrorChip /> {errors.usr_country.message}
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
                  <Link href='/login'>
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
