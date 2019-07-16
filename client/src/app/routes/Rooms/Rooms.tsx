import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";
import Fab from '@material-ui/core/Fab';
import withStyles from '@material-ui/core/styles/withStyles';
import AddIcon from '@material-ui/icons/Add';

import getList from "./actions/getList";
import { submit as remove } from "./actions/deleteSingle";
import { REDUCER_NAME__ROOMS } from "./reducer";
import RoomsTable from "./components/RoomsTable";
import { Props } from './types';
import Centered from '../../components/Centered';
import { roomRoutes } from '../../constants';
import styles from './styles';

function mapStateToProps(state: any) {
  const { tableData, loading } = state[REDUCER_NAME__ROOMS];
  return {
    loading,
    tableData
  };
}

const mapDispatchToProps = { getList, remove };

function Rooms(props: Props) {
  useEffect(() => {
    props.getList();
  }, []);

  const { tableData, getList, classes, remove, history } = props;

  const handleGoToAddItemPage = () => history.push(roomRoutes.newRoom());
  const handleRemove = (id: string, callback: Function) => remove(id, callback);

  return (
    <>
      <Centered>
        <RoomsTable
          getList={getList}
          confirmDelete={handleRemove}
          page={tableData.page}
          limit={tableData.limit}
          docs={tableData.docs}
          total={tableData.total}
        />
      </Centered>
      <Fab className={classes.addButton} color="secondary">
        <AddIcon onClick={handleGoToAddItemPage} />
      </Fab>
    </>
  );
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(withRouter(Rooms)));
