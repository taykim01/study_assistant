import { Timestamp } from "firebase/firestore";

const formatDate = (fbDate: Timestamp | Date) => {
  const date = fbDate instanceof Date ? fbDate : fbDate.toDate();
  const thisYear = new Date().getFullYear();
  const formattedDate = `${
    thisYear === date.getFullYear() ? "" : `${date.getFullYear()}년`
  }${date.getMonth() + 1}월 ${date.getDate()}일`;
  return formattedDate;
};

export default formatDate;
