import alertify from 'alertifyjs';
import 'alertifyjs/build/css/alertify.css';

export const success = (message) => {
    alertify.success(message);
};

export const error = (message) => {
    alertify.error(message);
};

export const info = (message) => {
    alertify.info(message);
};
