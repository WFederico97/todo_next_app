// ** React Imports
import { useContext, useState } from 'react'

// ** Next Js Imports
import { Router, useRouter } from 'next/router'

// ** MUI Components
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import InputLabel from '@mui/material/InputLabel'
import IconButton from '@mui/material/IconButton'
import FormControl from '@mui/material/FormControl'
import OutlinedInput from '@mui/material/OutlinedInput'
import InputAdornment from '@mui/material/InputAdornment'
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Alert from '@mui/material/Alert';


// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** React-hook-form imports
import * as yup from 'yup'

import { useForm, Controller } from 'react-hook-form'

import { yupResolver } from '@hookform/resolvers/yup'
import { useAuth } from '@/hooks/useAuth'

const schema = yup.object().shape({

  email: yup
    .string()
    .trim()
    .email("Email no válido")
    .required("Campo Obligatorio"),

  password: yup
    .string()
    .trim()
    .min(5, "Ingrese al menos 5 Caracteres")
    .required("Campo Obligatorio"),

  username: yup
    .string()
    .trim()
    .min(5, "Ingrese al menos 5 Caracteres")
    .required("Campo Obligatorio"),

  first_name: yup
    .string()
    .trim()
    .min(5, "Ingrese al menos 5 Caracteres")
    .required("Campo Obligatorio"),

  last_name: yup
    .string()
    .trim()
    .min(5, "Ingrese al menos 5 Caracteres")
    .required("Campo Obligatorio"),

  role: yup
    .string()
    .required("Campo Obligatorio"),

})

const StepAccountDetails = ({ handleNext }) => {
  // ** States
  const [values, setValues] = useState({
    showPassword: false,
    showConfirmPassword: false
  })
  const [isLoading, setIsLoading] = useState(false)
  
  

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword })
  }


  const { control, reset, handleSubmit, formState: { errors } } = useForm({
    defaultValues:
    {
      username: "",
      email: "",
      first_name: "",
      last_name: "",
      password: "",
      role: "",
    },
    mode: "onChange",
    resolver: yupResolver(schema)
  })

  const { register, error, loading, show } = useAuth()
  const router = useRouter()

  const onSubmit = (data) => {

    setTimeout(() => {
      setIsLoading(loading)
    }, 3000)

    register(data)
    reset();

  }

  const handleAlertClose = () => {
    reset();
    router.reload()
  }


  return (
    <>


      <Box sx={{ mb: 6 }}>
        <Typography variant='h5' sx={{ mb: 1.5 }}>
          Account Information
        </Typography>
        <Typography sx={{ color: 'text.secondary' }}>Enter Your Account Details</Typography>
      </Box>

      {error ? <Alert fullWidth sx={{ margin: 3 }} variant="filled" severity="error" onClose={handleAlertClose} >Something went wrong {" :( "}</Alert> :

        <form onSubmit={handleSubmit(onSubmit)} >
          <Grid container spacing={5}>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <Controller name='username' control={control} render={({ field: { value, onChange } }) => (
                  <TextField type='text' label='Username' placeholder='johndoe' value={value} onChange={onChange} />
                )}
                />
                {errors.username && (
                  <Grid>
                    <Typography variant='caption'>
                      {errors.username.message}
                    </Typography>
                  </Grid>)}
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <Controller name='email' control={control} render={({ field }) => (
                  <TextField type='email' label='Email' placeholder='john.doe@email.com' {...field} />
                )}
                />
                {errors.email && (
                  <Grid>
                    <Typography variant='caption'>
                      {errors.email.message}
                    </Typography>
                  </Grid>)}
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <Controller name='first_name' control={control} render={({ field: { value, onChange } }) => (
                  <TextField type='text' label='First Name' placeholder='johndoe' value={value} onChange={onChange} />
                )} />
                {errors.first_name && (
                  <Grid>
                    <Typography variant='caption'>
                      {errors.first_name.message}
                    </Typography>
                  </Grid>)}
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <Controller name='last_name' control={control} render={({ field: { value, onChange } }) => (
                  <TextField type="text" label='Last Name' placeholder='johndoe' value={value} onChange={onChange} />
                )} />
                {errors.last_name && (
                  <Grid>
                    <Typography variant='caption'>
                      {errors.last_name.message}
                    </Typography>
                  </Grid>)}
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={12}>
              <FormControl fullWidth>
                <InputLabel htmlFor='input-password'>Password</InputLabel>

                <Controller name='password' control={control} render={({ field }) => (
                  <OutlinedInput
                    label='Password'
                    id='input-password'
                    type={values.showPassword ? 'text' : 'password'}
                    endAdornment={
                      <InputAdornment position='end'>
                        <IconButton edge='end' onClick={handleClickShowPassword} onMouseDown={e => e.preventDefault()}>
                          <Icon icon={values.showPassword ? 'tabler:eye' : 'tabler:eye-off'} />
                        </IconButton>
                      </InputAdornment>
                    }
                    {...field}
                  />
                )} />
                {errors.password && (
                  <Grid>
                    <Typography variant='caption'>
                      {errors.password.message}
                    </Typography>
                  </Grid>)}

              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth >
                <InputLabel id="demo-simple-select-label">Role</InputLabel>
                <Controller name='role' control={control} render={({ field: { value, onChange } }) => (
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={value}
                    label="role"
                    onChange={onChange}
                  >
                    <MenuItem value={"admin"}>ADMIN</MenuItem>
                    <MenuItem value={"user"}>USER</MenuItem>
                  </Select>
                )} />
                {errors.role && (
                  <Grid>
                    <Typography variant='caption'>
                      {errors.role.message}
                    </Typography>
                  </Grid>)}
              </FormControl>
            </Grid>
            <Grid item xs={12} sx={{ pt: theme => `${theme.spacing(6)} !important` }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Button variant='contained' type='submit' sx={{ '& svg': { ml: 2 } }}>
                  Submit
                  <Icon fontSize='1.125rem' icon='tabler:arrow-right' />
                </Button>
              </Box>
            </Grid>
          </Grid >
        </form>
      }

    </>
  )
}

export default StepAccountDetails
