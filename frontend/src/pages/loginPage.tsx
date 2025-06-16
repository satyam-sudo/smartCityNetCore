// "use client";
// import { useState } from "react";
// import Link from "next/link";
// import { useRouter } from "next/navigation";
// import {
//   Box,
//   Button,
//   Container,
//   TextField,
//   Typography,
//   Paper,
// } from "@mui/material";

// const LoginPage = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const [success, setSuccess] = useState("");
//   const router = useRouter();

//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     setError("");
//     setSuccess("");

//     if (!email || !password) {
//       setError("Please fill in all fields.");
//       return;
//     }

//     try {
//       const response = await fetch("https://localhost:44346/api/Login/login", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ email, password }),
//       });

//       if (!response.ok) {
//         const errorData = await response.json();
//         setError(
//           errorData.message || "Login failed. Please check your credentials."
//         );
//         return;
//       }

//       const data = await response.json();
//       console.log("Login response:", data);
//       setSuccess("Login successful!");

//       // Optional: Store token
//       // localStorage.setItem("token", data.token);

//       // Redirect to dashboard
//       router.push("/dashboardPage");
//     } catch (err: any) {
//       console.error("Error:", err);
//       setError("Something went wrong. Please try again.");
//     }
//   };

//   return (
//     <Container maxWidth="sm">
//       <Paper elevation={3} sx={{ p: 4, mt: 8 }}>
//         <Typography variant="h5" component="h1" gutterBottom>
//           Login
//         </Typography>
//         <form onSubmit={handleSubmit}>
//           <Box display="flex" flexDirection="column" gap={2}>
//             <TextField
//               label="Email"
//               variant="outlined"
//               type="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               required
//             />
//             <TextField
//               label="Password"
//               variant="outlined"
//               type="password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//             />
//             {error && <Typography color="error">{error}</Typography>}
//             {success && <Typography color="primary">{success}</Typography>}
//             <Button type="submit" variant="contained" color="primary">
//               Login
//             </Button>
//             <Typography sx={{ textAlign: "center", mt: 2 }}>
//               <Link href="/registerPage" style={{ textDecoration: "none" }}>
//                 Don't have an account? <u>Register here</u>
//               </Link>
//             </Typography>
//           </Box>
//         </form>
//       </Paper>
//     </Container>
//   );
// };

// export default LoginPage;

"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Paper,
  Alert,
  CircularProgress,
} from "@mui/material";
import { useAuth } from "../hooks/useAuth";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);

  const { isLoading, error, isAuthenticated, user, login, clearAuthError } =
    useAuth();
  const router = useRouter();

  useEffect(() => {
    if (error) {
      clearAuthError();
    }
  }, [email, password, clearAuthError]);

  useEffect(() => {
    if (isAuthenticated && user) {
      setShowSuccess(true);
      const timer = setTimeout(() => {
        router.push("/dashboardPage");
      }, 1500);

      return () => clearTimeout(timer);
    }
  }, [isAuthenticated, user, router]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email || !password) {
      return;
    }

    const result = await login({ email, password });

    if (result.success) {
      console.log("Login successful:", result.data);
      setShowSuccess(true);
    } else {
      console.error("Login failed:", result.error);
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ p: 4, mt: 8 }}>
        <Typography variant="h5" component="h1" gutterBottom>
          Login
        </Typography>

        <form onSubmit={handleSubmit}>
          <Box display="flex" flexDirection="column" gap={2}>
            <TextField
              label="Email"
              variant="outlined"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={isLoading}
            />

            <TextField
              label="Password"
              variant="outlined"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={isLoading}
            />

            {error && (
              <Alert severity="error" onClose={clearAuthError}>
                {error}
              </Alert>
            )}

            {showSuccess && isAuthenticated && (
              <Alert severity="success">
                Login successful! Redirecting to dashboard...
              </Alert>
            )}

            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={isLoading || !email || !password}
              sx={{ mt: 1 }}
            >
              {isLoading ? (
                <Box display="flex" alignItems="center" gap={1}>
                  <CircularProgress size={20} color="inherit" />
                  Logging in...
                </Box>
              ) : (
                "Login"
              )}
            </Button>

            <Typography sx={{ textAlign: "center", mt: 2 }}>
              <Link href="/registerPage" style={{ textDecoration: "none" }}>
                Don't have an account? <u>Register here</u>
              </Link>
            </Typography>
          </Box>
        </form>
      </Paper>
    </Container>
  );
};

export default LoginPage;
