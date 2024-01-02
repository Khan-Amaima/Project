import navigation from "../constants/Navigation";

export const getCurrentLocation = (location) => {
  let pathObj = navigation.filter((obj) => obj.route == location.pathname);
  console.log(pathObj[0].name);
  return pathObj[0].name;
};

