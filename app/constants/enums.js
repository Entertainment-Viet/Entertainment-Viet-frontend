export const ENUM_VERIFY_MODE = {
  REG: 'REGISTER',
};

export const ENUM_FILE_TYPE = {
  image: '.png, .jpg, .jpeg, jpe, .gif',
  video: 'video/*',
  image3d: '.glb, .gltf',
  audio: 'audio/*',
  document: '.pdf',
  avatar: '.jpeg, .png',
  imageAndVideoAndDocument: [
    'video/*',
    '.png',
    '.jpg',
    '.jpeg',
    ' jpe',
    '.gif',
    '.pdf',
  ],
};

export const ENUM_PREVIEW_TYPE = {
  image: '2d',
  video: 'video_audio',
  image3d: '3d',
  document: 'document',
  avatar: 'avatar',
  audio: 'audio/*',
};

export const ENUM_ROLES = {
  ORG: 'organizer',
  TAL: 'talent',
  ADMIN: 'admin',
  GUEST_ORG: 'guest-org',
  GUEST_TAL: 'guest-tal',
};

export const ENUM_PAGGING = {
  total: 0,
  page: 1,
  limit: 12,
};

export const ENUM_BOOKING_STATUS = {
  ORG_PENDING: 'booking.status.organizer-pending',
  TALENT_PENDING: 'booking.status.talent-pending',
  CONFIRMED: 'booking.status.confirmed',
  CANCELLED: 'booking.status.cancelled',
  FINISHED: 'booking.status.finished',
  ARCHIVED: 'booking.status.archived',
  TALENT_FINISHED: 'booking.status.talent-finished',
  ORG_FINISHED: 'booking.status.organizer-finished',
};

export const ENUM_WORK_TYPE = {
  SINGLE_TIME: 'work.type.single-time',
  SINGLE_SHOW: 'work.type.single-show',
  PERIOD_CONTRACT: 'work.type.period-contract',
};
export const ENUM_PAYMENT_TYPE = {
  ONLINE: 'payment.online',
  OFFLINE: 'payment.offline',
};
