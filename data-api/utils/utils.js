module.exports.formatDateTime = (dateTimeObj) => {
    const year = dateTimeObj.getFullYear().toString();
    const month = (dateTimeObj.getMonth() > 9) ? dateTimeObj.getMonth().toString() : '0' + dateTimeObj.getMonth().toString();
    const day = (dateTimeObj.getDate() > 9) ? dateTimeObj.getDate().toString() : '0' + dateTimeObj.getDate().toString();
    const hour = dateTimeObj.getHours().toString();
    const minute = (dateTimeObj.getMinutes() > 9) ? dateTimeObj.getMinutes().toString() : '0' + dateTimeObj.getMinutes().toString();
    const second = (dateTimeObj.getSeconds() > 9) ? dateTimeObj.getSeconds().toString() : '0' + dateTimeObj.getSeconds().toString();

    return year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second;
}