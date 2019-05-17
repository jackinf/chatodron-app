import React from 'react';
import { WithStyles } from '@material-ui/core/es';
import withStyles from '@material-ui/core/styles/withStyles';

import Centered from '../../../components/Centered/Centered.component';
import Header from '../../../components/Header';
import RoomsRoutes from '../../routes/Rooms';
import RoomRoutes from '../../routes/Room';
import CreateRoomRoutes from '../../routes/CreateRoom';
import EditRoomRoutes from '../../routes/EditRoom';
import ChatRoomRoutes from '../../routes/ChatRoom';
import Footer from '../../../components/Footer/Footer.component';
import styles from './styles';
import { Route, Switch } from 'react-router-dom';
import AsyncComponent from '../../../helpers/AsyncComponent';

const Main = (({ classes }: WithStyles<typeof styles>) => (
  <div className={classes && classes.wrapper}>
    <Centered>
      <Header />
    </Centered>
    <span className={classes && classes.mainWrapper}>
      <Route exact={true} path={'/rooms'} component={AsyncComponent(RoomsRoutes)}/>
      <Switch>
        <Route exact={true} path={'/rooms/new'} component={AsyncComponent(CreateRoomRoutes)}/>
        <Route exact={true} path={'/rooms/:id'} component={AsyncComponent(RoomRoutes)}/>
        <Route path={'/rooms/:id/edit'} component={AsyncComponent(EditRoomRoutes)}/>
        <Route path={'/rooms/:id/chat'} component={AsyncComponent(ChatRoomRoutes)}/>
      </Switch>
    </span>
    <span className={classes && classes.footerWrapper}>
      <Footer/>
    </span>
  </div>
));

export default withStyles(styles)(Main);