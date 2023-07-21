import React, { useState, useEffect } from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Slider from "@mui/material/Slider";
import IconButton from "@mui/material/IconButton";
import PauseRounded from "@mui/icons-material/PauseRounded";
import PlayArrowRounded from "@mui/icons-material/PlayArrowRounded";
import FastForwardRounded from "@mui/icons-material/FastForwardRounded";
import FastRewindRounded from "@mui/icons-material/FastRewindRounded";

const Widget = styled("div")(({ theme }) => ({
  padding: 16,
  borderRadius: 16,
  width: "70%",
  maxWidth: "100%",
  margin: "auto",
  position: "relative",
  zIndex: 1,
  backgroundColor:
    theme.palette.mode === "dark" ? "rgba(0,0,0,0.6)" : "rgba(255,255,255,0.4)",
  backdropFilter: "blur(40px)",
}));

const TinyText = styled(Typography)({
  fontSize: "0.75rem",
  fontWeight: 500,
  letterSpacing: 0.2,
  color: "black",
});

export default function Audioplayer({ audioFile }) {
  const theme = useTheme();
  const [duration, setDuration] = useState(0);
  const [position, setPosition] = useState(0);
  const [paused, setPaused] = useState(true);
  const [audio] = useState(new Audio(audioFile));
  const rewindDuration = 5; // Rewind duration in seconds
  const forwardDuration = 5; // Fast forward duration in seconds

  useEffect(() => {
    const handleLoadedMetadata = () => {
      const audioDuration = audio.duration;
      setDuration(audioDuration);
    };

    audio.addEventListener("loadedmetadata", handleLoadedMetadata);

    return () => {
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
    };
  }, []);

  useEffect(() => {
    const handleTimeUpdate = () => {
      setPosition(audio.currentTime);
    };

    audio.addEventListener("timeupdate", handleTimeUpdate);

    return () => {
      audio.removeEventListener("timeupdate", handleTimeUpdate);
    };
  }, []);

  useEffect(() => {
    if (!paused) {
      audio.play();
    } else {
      audio.pause();
    }
  }, [paused]);
  
  useEffect(() => {
    return () => {
      // Clean up the audio when the component unmounts
      audio.pause();
      audio.currentTime = 0;
    };
  }, []);
  function formatDuration(value) {
    const absoluteValue = Math.abs(value);
    const minute = Math.floor(absoluteValue / 60);
    const second = Math.floor(absoluteValue % 60);
    return `${minute}:${second < 10 ? `0${second}` : second}`;
  }

  const mainIconColor = theme.palette.mode === "dark" ? "#fff" : "#000";

  const handleSliderChange = (event, value) => {
    setPosition(value);
    audio.currentTime = value;
  };

  const handleRewind = () => {
    const newPosition = position - rewindDuration;
    setPosition(newPosition < 0 ? 0 : newPosition);
    audio.currentTime = newPosition < 0 ? 0 : newPosition;
  };

  const handleFastForward = () => {
    const newPosition = position + forwardDuration;
    setPosition(newPosition > duration ? duration : newPosition);
    audio.currentTime = newPosition > duration ? duration : newPosition;
  };

  return (
    <Box sx={{ width: "100%", overflow: "hidden" }}>
      <Widget>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            mt: -2,
            width: "100%",
          }}
        >
          <Box sx={{ width: "100%", mt: 2 }}>
            <Slider
              aria-label="time-indicator"
              size="medium"
              value={position}
              min={0}
              step={1}
              max={duration}
              onChange={handleSliderChange}
              sx={{
                color:
                  theme.palette.mode === "dark" ? "#fff" : "rgba(0,0,0,0.87)",
                height: 8,
                "& .MuiSlider-thumb": {
                  width: 16,
                  height: 16,
                  transition: "0.3s cubic-bezier(.47,1.64,.41,.8)",
                  "&:before": {
                    boxShadow: "0 2px 12px 0 rgba(0,0,0,0.4)",
                  },
                  "&:hover, &.Mui-focusVisible": {
                    boxShadow: `0px 0px 0px 8px ${
                      theme.palette.mode === "dark"
                        ? "rgb(255 255 255 / 16%)"
                        : "rgb(0 0 0 / 16%)"
                    }`,
                  },
                  "&.Mui-active": {
                    width: 24,
                    height: 24,
                  },
                },
                "& .MuiSlider-rail": {
                  opacity: 0.28,
                },
              }}
            />
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <TinyText>{formatDuration(position)}</TinyText>
            <TinyText>-{formatDuration(duration - position)}</TinyText>
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              mt: -1,
            }}
          >

            <IconButton
              aria-label="rewind"
              onClick={handleRewind}
            >
              <FastRewindRounded
                sx={{ fontSize: "2rem" }}
                htmlColor={mainIconColor}
              />
            </IconButton>
            <IconButton
              aria-label={paused ? "play" : "pause"}
              onClick={() => setPaused(!paused)}
            >
              {paused ? (
                <PlayArrowRounded
                  sx={{ fontSize: "3rem" }}
                  htmlColor={mainIconColor}
                />
              ) : (
                <PauseRounded
                  sx={{ fontSize: "3rem" }}
                  htmlColor={mainIconColor}
                />
              )}
            </IconButton>
            <IconButton
              aria-label="fast-forward"
              onClick={handleFastForward}
            >
              <FastForwardRounded
                sx={{ fontSize: "2rem" }}
                htmlColor={mainIconColor}
              />
            </IconButton>
          </Box>
        </Box>
      </Widget>
    </Box>
  );
}
