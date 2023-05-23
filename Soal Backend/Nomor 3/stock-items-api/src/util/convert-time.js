import moment from "moment";

// Service for convert to locale time
const convertToLocaleTime = (dataObject) => {
  if (dataObject["created_at"]) {
    dataObject["created_at"] = moment(dataObject.created_at).format();
  }

  if (dataObject["updated_at"]) {
    dataObject["updated_at"] = moment(dataObject.updated_at).format();
  }

  if (dataObject["deleted_at"]) {
    dataObject["deleted_at"] = moment(dataObject.deleted_at).format();
  }
};

export { convertToLocaleTime };
