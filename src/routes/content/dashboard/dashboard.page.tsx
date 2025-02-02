import TrendingMovies from "./components/TrendingMovies";
import HeroSection from "./components/HeroSection";
import axios from "axios";
import React from "react";
import { Button, CircularProgress } from "@mui/material";
import LocalStorageService from "../../../services/localstorage.service";
import PopularMovies from "./components/PopularMovies";
import ChatButton from "../../components/ChatButton";
import Trailers from "./components/Trailers";
import { backendURL } from "../../../app/env";
import { useSelector } from "react-redux";
import { RootState } from "../../../app/store";

const Dashboard = () => {
  const [isVerify, setIsVerify] = React.useState(false);
  const [loading, setLoading] = React.useState(true);

  const isAuthenticated = useSelector((state: RootState) => state.auth.user !== null);

  async function isVerified() {
    try {
      const res = await axios.get(backendURL + "/auth/isVerify", {
        headers: {
          Authorization: `Bearer ${LocalStorageService.getAccessToken()}`,
        },
      });
      if (res.status === 200) {
        setIsVerify(true);
      }
    } catch (error) {
      console.error("Error verifying user:", error);
    } finally {
      setLoading(false);
    }
  }

  React.useEffect(() => {
    isVerified();
  }, []);

  async function resendVerifyEmail() {
    await axios.get(backendURL + "/auth/verify", {
      headers: {
        Authorization: `Bearer ${LocalStorageService.getAccessToken()}`,
      },
    });
  }

  if (loading) {
    return (
      <div style={{ textAlign: "center", marginTop: "100px" }}>
        <CircularProgress />
      </div>
    );
  }

  console.log("isVerify", isVerify);
  console.log("isAuthenticated", isAuthenticated);

  return (
    <>
      {isVerify || !isAuthenticated ? (
        <div className="flex flex-col">
          <HeroSection />
          <TrendingMovies />
          <PopularMovies />
          <Trailers />
          <ChatButton />
        </div>
      ) : (
        <div style={{ textAlign: "center", marginTop: "100px" }}>
          "Please verify your email"
          <Button onClick={resendVerifyEmail}>Resend verify email</Button>
        </div>
      )}
    </>
  );
};

export default Dashboard;
