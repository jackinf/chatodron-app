import actionCreatorFactory from 'typescript-fsa';
import { Dispatch } from 'redux';
import { toastr } from 'react-redux-toastr';

import { ErrorWrapper } from '../../viewModels/base';
import CommonUtils from '../../helpers/CommonUtilities';
import { Config } from '../App.types';

const actionCreator = actionCreatorFactory();
export const asyncActions = actionCreator.async<
  {},
  { config: Config },
  ErrorWrapper
  >('APP/START');

export default function submit() {
  return async (dispatch: Dispatch<any>) => {

    async function mainAction() {
      dispatch(asyncActions.started({}));
      const config: Config = {
        backendHost: 'localhost:4000',
      };
      dispatch(asyncActions.done({ params: {}, result: { config } }));
    }

    async function catchAction(exception: ErrorWrapper) {
      dispatch(asyncActions.failed({ params: {}, error: exception }));
      toastr.error('Error', 'Error has occurred');
      CommonUtils.scrollToTop();
    }

    await CommonUtils.tryCatchWrapper(mainAction, catchAction);
  };
}
