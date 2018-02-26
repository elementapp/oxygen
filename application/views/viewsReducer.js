const SWITCH_VIEW = 'oxygen/views/SWITCH_VIEW';

export const AppViews = {
  LOGIN: 'LOGIN',
  UPLOAD_PICTURE: 'UPLOAD_PICTURE',
};

type State = {
  +activeView: $Values<AppViews>,
};

type SwitchViewAction = {
  type: SWITCH_VIEW,
  view: $Values<AppViews>,
}

type Action = SwitchViewAction;

const initialState = {
  activeView: AppViews.LOGIN,
};

export function viewsReducer(state: State = initialState, action: Action) {
  switch (action.type) {
    case SWITCH_VIEW:
      return {
        ...state,
        activeView: action.view,
      };
    default:
      (action: empty);
      return state;
  }
}

export function switchView(view: $Values<AppViews>): SwitchViewAction {
  return {
    type: SWITCH_VIEW,
    view,
  };
}
