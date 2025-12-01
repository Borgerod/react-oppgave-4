"use client";
import { cn } from "@/utils/cn";

import React from "react";
import {
	ThemeProvider,
	createTheme,
	useColorScheme,
} from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import RadioGroup from "@mui/material/RadioGroup";
import { FormControl, FormControlLabel, FormLabel, Radio } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";

const theme = createTheme({
	colorSchemes: {
		dark: true,
	},
});

function ThemeToggle() {
	const { mode, setMode } = useColorScheme();
	const [mounted, setMounted] = React.useState(false);

	React.useEffect(() => {
		setMounted(true);
	}, []);

	if (!mounted || !mode || !setMode) return null;

	const toggle = () => setMode(mode === "dark" ? "light" : "dark");

	return (
		<IconButton
			onClick={toggle}
			aria-label="toggle theme"
			sx={{ position: "fixed", bottom: 16, right: 16 }}>
			{mode === "dark" ? <Brightness7Icon /> : <Brightness4Icon />}
		</IconButton>
	);
}

export default function Providers({ children }: { children: React.ReactNode }) {
	return (
		<ThemeProvider theme={theme} defaultMode="system">
			<CssBaseline />
			{children}
			<ThemeToggle />
		</ThemeProvider>
	);
}
