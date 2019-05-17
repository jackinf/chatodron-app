import React from 'react';
import { WithStyles } from '@material-ui/core/es';
import withStyles from '@material-ui/core/styles/withStyles';

import Centered from '../../../components/Centered/Centered.component';
import Header from '../../../components/Header';
import RoomsRoutes from '../../routes/Rooms/routes.component';
import RoomRoutes from '../../routes/Room/routes.component';
import Footer from '../../../components/Footer/Footer.component';
import styles from './styles';

const Main = (({ classes }: WithStyles<typeof styles>) => (
  <div className={classes && classes.wrapper}>
    <Centered>
      <Header />
    </Centered>
    <span className={classes && classes.mainWrapper}>
      <RoomsRoutes />
      <RoomRoutes />
    </span>
    <span className={classes && classes.footerWrapper}>
      <Footer/>
    </span>
  </div>
));

export default withStyles(styles)(Main);