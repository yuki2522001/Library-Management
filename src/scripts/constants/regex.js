const EMAIL = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
const PHONE = /^(03|05|07|08|09)+([0-9]{8})/;
const ADDRESS = /^\d+\s\w+([.-]?\w+)/;
const NUMBER = /^[0-9][0-9 -]*$/;

export {
  EMAIL, PHONE, ADDRESS, NUMBER,
};
