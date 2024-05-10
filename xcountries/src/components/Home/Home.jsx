import React, { useEffect, useState } from "react";
import "./Home.css";
import axios from "axios";
import { Card, CardContent, CardMedia, Typography, Grid } from "@mui/material";

const Home = () => {
  const [contries, setContries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchCountries = async () => {
    try {
      const respose = await axios.get("https://restcountries.com/v3.1/all");
      console.log(respose.data);
      setContries(respose.data);
      setLoading(true);
    } catch (e) {
      console.error("Error fetching countries", e);
      setError("Error fetching data, please try again");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCountries();
  }, []);

  return (
    <div>
      {error && <p>Error: {error}</p>}
      <Grid container spacing={3}>
        {contries.map((country) => (
          <Grid item xs={12} sm={3} md={2} key={country.name.common}>
            <Card>
              <CardMedia
                component="img"
                height="140"
                image={country.flags.svg}
                alt={`Flag of ${country.name.common}`}
              />
              <CardContent>
                <Typography variant="h7" style={{ fontWeight: "bold" }}>
                  {country.name.common}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default Home;
