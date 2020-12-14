import './App.css';
import { BrowserRouter as Router, Switch, Route, Link, BrowserRouter } from 'react-router-dom';
import CustomerList from './components/CustomerList';
import TrainingsList from './components/TrainingsList';
import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

function App() {
  const [anchorEl, setAnchorEl] = useState(null);
  const classes = useStyles();
  const [title, setTitle] = useState('Trainings list')

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <BrowserRouter>
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu" aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
              <MenuIcon />
            </IconButton>
            <Menu
              id="simple-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={() => {setTitle('Customer list'); handleClose()}}>
                <Link to='/customerlist' style={{ textDecoration: 'none' }}>Customer list</Link>
              </MenuItem>
              <MenuItem onClick={() => {setTitle('Trainings list'); handleClose()}}>
                <Link to='/trainingslist' style={{ textDecoration: 'none' }}>Trainings list</Link>
              </MenuItem>
            </Menu>
            <Typography variant="h6" className={classes.title}>
              {title}
            </Typography>
          </Toolbar>
        </AppBar>
        <Switch>
          <Route exact path='/customerlist' component={CustomerList}/>
          <Route exact path='/trainingslist' component={TrainingsList}/>
          <Route render={() => <h1> Page not found</h1>}/>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
