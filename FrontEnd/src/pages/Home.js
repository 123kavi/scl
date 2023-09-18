import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions, Stack } from "@mui/material";
import { useHistory } from "react-router-dom";

export default function Home() {
  let history = useHistory();
  const handleClick = (path) => {
    history.push(path);
  };

  return (
    <form>
      <div className="parent">
        <div className="child">
          <Card sx={{ width: 345, height: 304 }}>
            <CardActionArea>
              <CardMedia component="img" height="140" className="cardMedia" />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Subject
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Courses can be add, delete, update
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions>
              <Button
                onClick={() => handleClick("/AddSubject")}
                size="small"
                color="primary"
              >
                Show
              </Button>
            </CardActions>
          </Card>
        </div>
        <div className="child">
          <Card sx={{ maxWidth: 345 }}>
            <CardActionArea>
              <CardMedia
                component="img"
                height="140"
                className="cardMediaStu"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Students
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  You can now Add Student and Get Student report details
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions>
              <Button
                onClick={() => handleClick("/StudentCreate")}
                size="small"
                color="primary"
              >
                Show
              </Button>
            </CardActions>
          </Card>
        </div>
        <div className="child">
          <Card sx={{ maxWidth: 345 }}>
            <CardActionArea>
              <CardMedia
                component="img"
                height="140"
                className="cardMediaDept"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Class Room
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Subject Can be in here | Click add And view details
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions>
              <Button
                onClick={() => handleClick("/AddClassRoom")}
                size="small"
                color="primary"
              >
                Show
              </Button>
            </CardActions>
          </Card>
        </div>
        <div className="child">
          <Card sx={{ maxWidth: 345 }}>
            <CardActionArea>
              <CardMedia
                component="img"
                height="140"
                className="cardMediaTeacher"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Teachers
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Teachers Can be in here | Click add And view details
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions>
              <Button
                onClick={() => handleClick("/AddTeacher")}
                size="small"
                color="primary"
              >
                Show
              </Button>
            </CardActions>
          </Card>
        </div>

        <div className="child">
          <Card sx={{ maxWidth: 345 }}>
            <CardActionArea>
              <CardMedia
                component="img"
                height="140"
                className="cardMediaAlocation1"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Subject Alocation
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Allocate Teachers to subjects using here | dealocate also
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions>
              <Button
                onClick={() => handleClick("/AllocateCourse")}
                size="small"
                color="primary"
              >
                Show
              </Button>
            </CardActions>
          </Card>
        </div>

        <div className="child">
          <Card sx={{ maxWidth: 345 }}>
            <CardActionArea>
              <CardMedia
                component="img"
                height="140"
                className="cardMediaAlocation2"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  ClassRoom Alocation
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Allocate Classrom to Teacher using here | dealocate also
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions>
              <Button
                onClick={() => handleClick("/AllocateClassRoom")}
                size="small"
                color="primary"
              >
                Show
              </Button>
            </CardActions>
          </Card>
        </div>
      </div>
    </form>
  );
}
