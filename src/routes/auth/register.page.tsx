import React, { useEffect } from "react";
import {
  TextField,
  Button,
  Box,
  Typography,
  Alert,
  CircularProgress,
  Slide,
  Fade,
  Divider,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRegisterMutation } from "./services/authApi";
import { useAppSelector } from "../../app/hooks";
import { toErrorMessage } from "../../error/fetchBaseQuery.error";
import { selectIsAuth } from "../../stores/authSlice";
import GoogleLogin from "./components/GoogleLogin";

const formSchema = z.object({
  firstName: z.string().regex(/^[A-Za-z]+$/, 'First name must contain only letters'),
  lastName: z.string().regex(/^[A-Za-z]+$/, 'Last name must contain only letters'),
  email: z.string().email('Invalid email provided'),
  password: z.string().min(6, 'Password must be at least 6 characters long'),
  avatarPath: z.string().optional(),
});

type FormFields = z.infer<typeof formSchema>;

const RegisterPage: React.FC = () => {
  const [register, { isLoading, error }] = useRegisterMutation();
  const isAuth = useAppSelector(selectIsAuth);
  const navigate = useNavigate();
  const {
    register: formRegister,
    handleSubmit,
    formState: { errors },
  } = useForm<FormFields>({
    resolver: zodResolver(formSchema),
  });

  const errorMessage = toErrorMessage(error);

  const onSubmit: SubmitHandler<FormFields> = async (data, e) => {
    e?.preventDefault();
    await register({ ...data, avatarPath: data.avatarPath ?? '' });
  }

  function handleLoginNavigate() {
    navigate("/login");
  }

  useEffect(() => {
    if (isAuth) {
      navigate("/");
    }
  }, [isAuth, navigate]);

  return (
    <Fade in>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Box
            sx={{
              width: 400,
              padding: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              boxShadow: 3,
              borderRadius: 2,
              backgroundColor: "#fff",
            }}
          >
            {/* Gradient Title */}
            <Typography
              variant="h4"
              component="h1"
              sx={{
                background: "linear-gradient(45deg, #ff4545 10%, #edaa37 90%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                fontWeight: "bold",
                mb: 5,
              }}
            >
              Create Account
            </Typography>

            {/* Announcement */}
            <Slide in={isLoading} direction="up" mountOnEnter unmountOnExit>
              <CircularProgress sx={{ my: 1 }} color="primary" />
            </Slide>
            {errorMessage && (
              <Alert
                sx={{
                  width: "100%",
                  mt: 1,
                  mb: 3,
                }}
                severity="error"
              >
                {errorMessage}
              </Alert>
            )}

            {/* Form */}
            <TextField
              {...formRegister("firstName")}
              label="First Name"
              size="small"
              variant="outlined"
              name="firstName"
              error={Boolean(errors.firstName != null)}
              helperText={errors.firstName?.message}
              fullWidth
              sx={{ mb: 2 }}
            />
            <TextField
              {...formRegister("lastName")}
              label="Last Name"
              size="small"
              variant="outlined"
              name="lastName"
              error={Boolean(errors.lastName != null)}
              helperText={errors.lastName?.message}
              fullWidth
              sx={{ mb: 2 }}
            />
            <TextField
              {...formRegister("email")}
              label="Email"
              size="small"
              variant="outlined"
              name="email"
              error={Boolean(errors.email != null)}
              helperText={errors.email?.message}
              fullWidth
              sx={{ mb: 2 }}
            />
            <TextField
              {...formRegister("password")}
              label="Password"
              size="small"
              variant="outlined"
              name="password"
              type="password"
              error={Boolean(errors.password != null)}
              helperText={errors.password?.message}
              fullWidth
              sx={{ mb: 2 }}
            />
            <TextField
              {...formRegister("avatarPath")}
              label="Avartar Path"
              size="small"
              variant="outlined"
              name="avatarPath"
              type="text"
              error={Boolean(errors.password != null)}
              helperText={errors.password?.message}
              fullWidth
              sx={{ mb: 2 }}
            />
            {/* Submit Button */}
            <Button
              type='submit'
              variant="contained"
              color="primary"
              disabled={isLoading}
              fullWidth
              sx={{
                mt: 2,
                fontWeight: 'bold',
                py: 1,
              }}>
              Register
            </Button>

            {/*Google Login*/}
            <Divider
              sx={{
                "&::before, &::after": {
                  borderColor: "rgba(0, 0, 0, 0.5)",
                },
                my: 2,
                width: "100%",
                color: "rgba(0, 0, 0, 0.5)",
              }}
            >
              OR
            </Divider>

            <GoogleLogin />

            {/* Login Link */}
            <Box
              textAlign="left"
              sx={{
                mt: 2,
                width: "100%",
              }}
            >
              <Typography variant="body2">
                Already have an account?
                <Button
                  size="small"
                  onClick={handleLoginNavigate}
                  sx={{
                    color: "#1e88e5",
                    "&:hover": {
                      backgroundColor: "transparent",
                      textDecoration: "underline",
                    },
                  }}
                >
                  Login
                </Button>
              </Typography>
            </Box>
          </Box>
        </Box>
      </form>
    </Fade>
  );
};

export default RegisterPage;
