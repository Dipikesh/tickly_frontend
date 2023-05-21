import React, { useState, useEffect } from "react";
import {
  List,
  ListItem,
  Button,
  Typography,
  Grid,
  Card,
  CardContent,
} from "@material-ui/core";
import { BACKEND_BASE_URL } from "../constant";
import { isAuthenticated } from "../auth";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import Menu from "../core/Menu";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@material-ui/core";

const useStyles = makeStyles({
  linkBox: {
    border: "2px solid #ccc",
    borderRadius: "4px",
    padding: "10px",
    transition: "all 0.2s ease-in-out",
    "&:hover": {
      cursor: "pointer",
      boxShadow: "1px 2px 4px rgba(0, 0, 0, 0.6)",
      transform: "scale(1.02)",
      backgroundColor: "#00bfff",
    },
  },
  linkListContainer: {
    height: "200px",
    overflow: "scroll",
  },

  listBox: {
    position: "relative",
    right: "-20px", // Modify this value to adjust the position
  },
  lowercase: {
    textTransform: "lowercase",
  },
  title: {
    fontWeight: "bold",
    fontSize: "1.2rem",
  },
});

const Dashboard = () => {
  const classes = useStyles();
  const [links, setLinks] = useState([]);
  const [selectedLink, setSelectedLink] = useState(null);
  const { _id, username } = isAuthenticated().user;
  const { token } = isAuthenticated();

  useEffect(() => {
    axios
      .get(`${BACKEND_BASE_URL}/urls/${_id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        setLinks(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleCopyClick = () => {
    navigator.clipboard.writeText(selectedLink.shortUrl);
    const button = document.activeElement;
    button.disabled = true;
    button.style.backgroundColor = "green";
    button.innerHTML = "Copied!";
    setTimeout(() => {
      button.disabled = false;
      button.style.backgroundColor = "";
      button.innerHTML = "Copy";
    }, 2000);
  };

  const handleDownloadClick = () => {
    const link = document.createElement("a");
    link.download = "qr-code.png";
    link.href = selectedLink.qr;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleLinkClick = (link) => {
    console.log({ link });
    axios
      .get(`${BACKEND_BASE_URL}/url-detail/${_id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          _id: link._id,
        },
      })
      .then((res) => {
        console.log("data of a link", res.data);

        setSelectedLink(res.data);
        console.log("final", selectedLink);
      })
      .catch((err) => {
        console.log(err);
      });

    console.log("selctioned", { selectedLink });
  };

  return (
    <>
      <Menu />
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h5" component="h2" gutterBottom>
                Link List
              </Typography>
              <List className={classes.listBox}>
                {links.map((link) => (
                  <ListItem key={link._id}>
                    <Button
                      className={classes.linkBox}
                      variant="contained"
                      onClick={() => handleLinkClick(link)}
                      style={{ textTransform: "lowercase" }}
                    >
                      {link.shortUrl.toLowerCase()}
                    </Button>
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>
        {selectedLink && (
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Grid container spacing={2} alignItems="center">
                  <Grid item xs>
                    <Typography variant="h5" component="h2" gutterBottom>
                      {selectedLink.shortUrl}
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Button variant="contained" onClick={handleCopyClick}>
                      Copy
                    </Button>
                  </Grid>
                </Grid>
                <Typography variant="body1" gutterBottom>
                  Click count: {selectedLink.analytics.length}
                </Typography>
                {/* <Typography variant="body1" gutterBottom>
                  Device type:{" "}
                  {selectedLink.analytics && selectedLink.analytics.length > 0
                    ? selectedLink.analytics.map((data,index)=>{
                      <b>{{data.device.os.name}}</b>
                    })
                    : "No device Found"}
                </Typography> */}

                {selectedLink.analytics && selectedLink.analytics.length > 0 ? (
                  <>
                    <Typography
                      variant="body1"
                      gutterBottom
                      className={classes.title}
                    >
                      Device type:
                    </Typography>
                    {Object.entries(
                      selectedLink.analytics.reduce((acc, curr) => {
                        const deviceType = curr.device.device.type;
                        const brandName = curr.device.device.brand;
                        const modelName = curr.device.device.model;
                        acc[deviceType] = (acc[deviceType] || 0) + 1;
                        acc[brandName] = (acc[brandName] || 0) + 1;
                        acc[modelName] = (acc[modelName] || 0) + 1;
                        return acc;
                      }, {})
                    ).map(([device, count]) => (
                      <Typography variant="body1" key={device}>
                        {`${device}: ${count}`}
                      </Typography>
                    ))}

                    {Object.entries(
                      selectedLink.analytics.reduce((acc, curr) => {
                        const deviceType = curr.device.os.name;
                        acc[deviceType] = (acc[deviceType] || 0) + 1;
                        return acc;
                      }, {})
                    ).map(([device, count]) => (
                      <Typography variant="body1" key={device}>
                        {`${device}: ${count}`}
                      </Typography>
                    ))}
                  </>
                ) : (
                  <Typography variant="body1" gutterBottom>
                    No device found
                  </Typography>
                )}

                {selectedLink.analytics && selectedLink.analytics.length > 0 ? (
                  <>
                    <Typography
                      variant="body1"
                      gutterBottom
                      className={classes.title}
                    >
                      Location :
                    </Typography>
                    {Object.entries(
                      selectedLink.analytics.reduce((acc, curr) => {
                        const city = curr.location.city
                          ? curr.location.city
                          : "";

                        acc[city] = (acc[city] || 0) + 1;

                        return acc;
                      }, {})
                    ).map(([location, count]) => (
                      <Typography variant="body1" key={location}>
                        {`${location ? location : "Kolkata"}: ${count}`}
                        
                      </Typography>
                    ))}

                    {Object.entries(
                      selectedLink.analytics.reduce((acc, curr) => {
                        const language = curr.location.location.language
                          ? curr.location.location.language
                          : "Hindi";

                        acc[language] = (acc[language] || 0) + 1;

                        return acc;
                      }, {})
                    ).map(([location, count]) => (
                      <Typography variant="body1" key={location}>
                        {`${location ? location : "hIndi"}: ${count}`}
                      </Typography>
                    ))}
                  </>
                ) : (
                  <Typography variant="body1" gutterBottom>
                    No location found
                  </Typography>
                )}

                {/* <TableContainer component={Paper}> */}
                {/* <Table>
        <TableHead>
          <TableRow>
            <TableCell>City Name</TableCell>
            <TableCell>Language</TableCell>
            <TableCell>Zip Code</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {selectedLink.analytics.map((location, index) => (
            // console.log(location)
            <TableRow key={index}>
              <TableCell>{location.city}</TableCell>
              <TableCell>{location.location.language}</TableCell>
              <TableCell>{location.zip}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer> */}
                <Typography variant="body1" gutterBottom>
                  Location:{" "}
                  {selectedLink.analytics && selectedLink.analytics.length > 0
                    ? selectedLink.analytics[0].location.ip
                    : "No Location Found"}
                </Typography>
                {selectedLink.qr && (<div>
                <div className="qr-code">
                  <img
                    src={selectedLink.qr ? selectedLink.qr : "no image found"}
                    alt="QR code"
                  />
                </div>
                <Button variant="contained" onClick={handleDownloadClick}>
                  Download QR Code
                </Button>
                </div>
                )}
                
              </CardContent>
            </Card>
          </Grid>
        )}
      </Grid>
    </>
  );
};

export default Dashboard;
