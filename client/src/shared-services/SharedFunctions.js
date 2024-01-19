import navigation from "../constants/Navigation";

export const getCurrentLocation = (location) => {
  let pathObj = navigation.filter((obj) => obj.route == location.pathname);
  return pathObj[0]?.name;
};

