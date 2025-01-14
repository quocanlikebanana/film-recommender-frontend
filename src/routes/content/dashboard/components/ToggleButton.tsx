import React from "react";
import { ToggleButton, ToggleButtonGroup } from "@mui/material";

interface TrendingSwitchProps {
    timeWindow: "day" | "week";
    onSwitchChanged: (selected: "day" | "week") => void;
}

const TrendingSwitch: React.FC<TrendingSwitchProps> = ({ timeWindow, onSwitchChanged }) => {

    const handleChange = (
        _event: React.MouseEvent<HTMLElement>,
        newSelected: "day" | "week"
        
    ) => {
        if (newSelected !== null) {
            onSwitchChanged(newSelected);
        }
    };

    return (
        <ToggleButtonGroup
            value={timeWindow}
            exclusive
            onChange={handleChange}
            aria-label="Trending switch"
            sx={{
                backgroundColor: "#f5f5f5",
                borderRadius: "25px",
                padding: "5px",
            }}
        >
            <ToggleButton
                value="day"
                sx={{
                    textTransform: "none",
                    fontWeight: timeWindow === "day" ? "bold" : "normal",
                    color: timeWindow === "day" ? "white" : "#000",
                    backgroundColor: timeWindow === "day" ? "#001e3c" : "transparent",
                    borderRadius: "25px",
                    "&:hover": {
                        backgroundColor: "#001e3c",
                        color: "white",
                    },
                }}
            >
                Today
            </ToggleButton>
            <ToggleButton
                value="week"
                sx={{
                    textTransform: "none",
                    fontWeight: timeWindow === "week" ? "bold" : "normal",
                    color: timeWindow === "week" ? "white" : "#000",
                    backgroundColor: timeWindow === "week" ? "#001e3c" : "transparent",
                    borderRadius: "25px",
                    "&:hover": {
                        backgroundColor: "#001e3c",
                        color: "white",
                    },
                }}
            >
                This Week
            </ToggleButton>
        </ToggleButtonGroup>
    );
};

export default TrendingSwitch;
