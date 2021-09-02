module.exports = {
    CURRENT_YEAR: new Date().getFullYear(),
    PASSWORD_REGEXP: new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\\$%\\^&\\*])(?=.{8,128})/),
    EMAIL_REGEXP: new RegExp(/(.+)@(.+){2,}\.(.+){2,}/),
    USER_ID: 'user_id',
    CAR_ID: 'car_id',
    PARAMS: 'params',
    DB_ID_FIELD: '_id'
};
