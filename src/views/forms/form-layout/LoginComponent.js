// ** React Imports
import { useState } from 'react'

// ** MUI Imports
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import Checkbox from '@mui/material/Checkbox'
import { styled } from '@mui/material/styles'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import InputLabel from '@mui/material/InputLabel'
import IconButton from '@mui/material/IconButton'
import CardContent from '@mui/material/CardContent'
import FormControl from '@mui/material/FormControl'
import OutlinedInput from '@mui/material/OutlinedInput'
import InputAdornment from '@mui/material/InputAdornment'
import FormControlLabel from '@mui/material/FormControlLabel'


// ** Custom Components Imports
import CustomAvatar from 'src/@core/components/mui/avatar'

// ** Icon Imports
import Icon from 'src/@core/components/icon'
import { Box } from '@mui/material'

// ** Hooks
import { useAuth } from "@/hooks/useAuth";

// Styled component for the form
const Form = styled('form')(({ theme }) => ({
  maxWidth: 400,
  padding: theme.spacing(12),
  borderRadius: theme.shape.borderRadius,
  border: `1px solid ${theme.palette.divider}`
}))

// ** YUP imports
import * as yup from "yup";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import ErrorChip from '@/components/chips/ErrorChip'

// ** YUP default Values
const defaultValues = {
  usr_email: "",
  usr_password: "",
};

// ** YUP schemas
const formSchema = yup.object({
  usr_email: yup
    .string()
    .trim()
    .email()
    .required("Campo Obligatorio"),

  usr_password: yup
    .string()
    .trim()
    .min(6, "La contraseña debe ser minimo 6 caracteres")
    .required("Campo Obligatorio"),
});



const LoginComponent = () => {
  // ** State
  const [values, setValues] = useState({
    password: '',
    showPassword: false
  })
  // ** Hooks
  const auth = useAuth();

  // ** Form Validation
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues,
    mode: "all",
    resolver: yupResolver(formSchema),
  });

  // Handle Submit
  const onSubmit = async (data) => {
    auth.login(data);
    
  };
  // Handle Password
  const handleChange = prop => event => {
    setValues({ ...values, [prop]: event.target.value })
  }

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword })
  }

  return (
    <Card>
      <CardContent sx={{ minHeight: 500, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={5}>
            <Grid item xs={12} lg={12} sx={{ display: 'flex' }} >
              <CustomAvatar skin='light' color='success'  >
                <Icon icon="tabler:circle-check-filled" />
              </CustomAvatar>
              <Typography variant='h5' sx={{ pl: '1em' }}>
                Es hora de Turbo Loguearse
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Controller
                name="usr_email"
                control={control}
                render={({ field }) => (
                  <TextField fullWidth label='Email' placeholder='Juan Roman' {...field} />
                )}
              />
              {errors.usr_email && (
                <Grid sx={{ padding: '0.256em' }} >
                  <Typography variant="subtitle1">
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
                {errors.usr_password && (
                  <Grid sx={{ padding: '0.256em' }} >
                    <Typography variant="subtitle1">
                      <ErrorChip /> {errors.usr_password.message}
                    </Typography>
                  </Grid>
                )}
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                label='Recordarme'
                control={<Checkbox name='form-layouts-alignment-checkbox' />}
                sx={{ '& .MuiButtonBase-root': { pt: 0, pb: 0 } }}
              />
            </Grid>
            <Grid item xs={12}>
              <Button size='large' type='submit' variant='contained' sx={{ width: '100%' }}>
                Login
              </Button>
            </Grid>
          </Grid>
        </Form>
      </CardContent>
    </Card>
  )
}

export default LoginComponent
