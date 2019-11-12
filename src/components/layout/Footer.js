import React from 'react';
import { Link } from 'react-router-dom' ;
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import RestoreIcon from '@material-ui/icons/Restore';
import FavoriteIcon from '@material-ui/icons/Favorite';
import LocationOnIcon from '@material-ui/icons/LocationOn';

const useStyles = makeStyles({
  root: {
    position: "fixed",
    bottom: 0,
    width: "100%",
  },
});

const Footer = () => {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  return(
    <BottomNavigation
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue);
      }}
      showLabels
      className={classes.root}
    >
      <BottomNavigationAction component={Link} to="/" label="集計" icon={<RestoreIcon />} />
      <BottomNavigationAction component={Link} to="/new"label="記録" icon={<FavoriteIcon />} />
      <BottomNavigationAction component={Link} to="/settings" label="設定" icon={<LocationOnIcon />} />
    </BottomNavigation>
  );
}

export default Footer
