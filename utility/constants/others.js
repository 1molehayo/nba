export const VIDEO_PLAYER_SETTINGS = {
  width: '100%',
  height: '100%',
  config: {
    youtube: {
      playerVars: { disablekb: 1 },
      showinfo: 0
    }
  }
};

export const PAYMENT_HEADERS = ['S/N', 'Date', 'Title', 'Amount', 'Status'];

export const DASHBOARD_PAYMENT_HEADERS = ['Date', 'Title', 'Amount', 'Status'];

export const MEETING_HEADERS = [
  'S/N',
  'Title',
  'Description',
  'Date',
  'Time (24hrs)'
];

export const MEMBERS_HEADERS = [
  'S/N',
  'Name',
  'Court Number',
  'Status',
  'Action'
];

export const TEXT_RESTRICTIONS = {
  short_text: 80,
  medium_text: 100,
  long_text: 250
};

export const DATE_FORMAT = 'YYYY-MM-DD';

export const DATE_FORMAT_VIEW = 'DD-MM-YYYY';

export const PAYMENT_DATE_FORMAT = 'DD MMM YYYY';

export const DEFAULT_ROLE_TYPE = 'authenticated';

export const PAYMENT_GATEWAY = 'flutterwave';

export const PAGE_SIZE = 10;

export const PAGE_SIZE_ALT = 12;
