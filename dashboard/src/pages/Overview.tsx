import { useState } from "react";
import { FormControl, MenuItem, InputLabel, Box, Select } from "@mui/material";
import BackButton from "@/components/BackButton";
import SectionTitle from "@/components/SectionTitle";
import OverviewChart from "@/components/OverviewChart";

const Overview = () => {
  const [view, setView] = useState<"ventas" | "viajes">("viajes");
  return (
    <Box m="1.5rem 0">
      <SectionTitle>Resumen general</SectionTitle>
      <p>Resumen de los ingresos y beneficios generales</p>
      <Box height="75vh">
        <FormControl sx={{ mt: "1rem" }}>
          <InputLabel>Vista</InputLabel>
          <Select
            className=""
            value={view}
            label="View"
            onChange={(e) => setView(e.target.value as "ventas" | "viajes")}
          >
            <MenuItem value="ventas">Ventas</MenuItem>
            <MenuItem value="viajes">Viajes</MenuItem>
          </Select>
        </FormControl>
        {/* <OverviewChart view={view} /> */}
      </Box>
    </Box>
  );
};

export default Overview;
