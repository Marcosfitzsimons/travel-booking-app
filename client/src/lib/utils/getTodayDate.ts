import moment from "moment";

const getTodayDate = () => moment().locale("es").format("ddd DD/MM");

export default getTodayDate