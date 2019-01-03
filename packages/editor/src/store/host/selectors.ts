import { IState } from '../reducer';
import { createSelector } from 'reselect';
import { Utilities, HostType, PlatformType } from '@microsoft/office-js-helpers';

const getHostsMatch = (state: IState): boolean => state.host === Utilities.host;

export const get = (state: IState): string => state.host;
export const getIsWeb = (_?: IState): boolean => Utilities.host === HostType.WEB;
export const getIsInAddin = (_?: IState): boolean =>
  Utilities.isAddin && !window.location.href.includes('isDialog');
export const getIsInOutlookAddin = (_?: IState): boolean =>
  getIsInAddin() && Utilities.host === HostType.OUTLOOK;
export const getIsInDesktop = (_?: IState) => Utilities.platform === PlatformType.PC;
export const shouldShowPopoutControls = (_?: IState) =>
  getIsInAddin() && (getIsInOutlookAddin() || !getIsInDesktop());
export const getIsRunnableOnThisHost = createSelector(
  [get, getHostsMatch],
  (host, hostsMatch) => host !== HostType.OUTLOOK && hostsMatch,
);
