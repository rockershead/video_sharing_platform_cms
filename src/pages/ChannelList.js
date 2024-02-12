import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuthContext } from "../hooks/useAuthContext";
import {
  Button,
  Typography,
  styles,
  Container,
  TextField,
  makeStyles,
  Avatar,
  CssBaseline,
  FormControlLabel,
  Checkbox,
  Link,
  Grid,
  Box,
} from "@material-ui/core";
const pageSize = 10;

const useStyles = makeStyles((theme) => ({
  channelsPage: {
    padding: "20px",
  },
  pageTitle: {
    fontSize: "24px",
    marginBottom: "20px",
  },
  channelsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    gridGap: "20px",
  },
  channelCard: {
    border: "1px solid #ddd",
    padding: "10px",
    textAlign: "center",
  },
  channelThumbnail: {
    width: "100%",
    height: "150px",
    objectFit: "cover",
  },
  channelName: {
    marginTop: "10px",
    fontSize: "18px",
  },
  viewVideosButton: {
    marginTop: "10px",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    padding: "8px 16px",
    borderRadius: "4px",
    cursor: "pointer",
    "&:hover": {
      backgroundColor: "#0056b3",
    },
  },
}));

const ChannelList = () => {
  const classes = useStyles();
  const [channels, setChannels] = useState([]);
  const [selectedChannel, setSelectedChannel] = useState(null);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const { user } = useAuthContext();
  let params;
  if (search !== "") {
    params = { page: page, pageSize: pageSize, search: search };
  } else {
    params = { page: page, pageSize: pageSize };
  }

  console.log(process.env.REACT_APP_API_URL);
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/channels`, {
        params: params,
        headers: { Authorization: `Bearer ${user.idToken}` },
      })
      .then((response) => {
        setChannels(response.data);
      })
      .catch((error) => {
        console.error("Error fetching channels:", error);
      });
  }, []);

  /*const handleViewVideos = (channelId) => {
    // Fetch videos for the selected channel
    axios.get(`your-api-url/channels/${channelId}/videos`)
      .then(response => {
        setVideos(response.data);
      })
      .catch(error => {
        console.error('Error fetching videos:', error);
      });
  };*/

  return (
    <div className="channels-page">
      <h1 className={classes.pageTitle}>Channels</h1>
      <div className={classes.channelsGrid}>
        {channels.map((channel) => (
          <div key={channel._id} className={classes.channelCard}>
            <h2 className={classes.channelName}>{channel.name}</h2>
            <button
              className={classes.viewVideosButton}
              onClick={() => console.log("click")}
            >
              View Videos
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChannelList;
