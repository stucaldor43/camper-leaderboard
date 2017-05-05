import 'whatwg-fetch';
import { SHOW_ALL_TIME_ASCENDING, SHOW_ALL_TIME_DESCENDING, SHOW_RECENT_ASCENDING, SHOW_RECENT_DESCENDING } from './camperFilters';

const makeRequest = (url) => fetch(url);

const addCamperRanks = (camperList) => camperList.map((camper, index) => Object.assign({}, camper, {rank: index + 1}));

const fetchCamperList = (key) => {
    const leaderboardUrls = {
        [SHOW_ALL_TIME_ASCENDING]:  "https://fcctop100.herokuapp.com/api/fccusers/top/alltime",
        [SHOW_ALL_TIME_DESCENDING]: "https://fcctop100.herokuapp.com/api/fccusers/top/alltime",
        [SHOW_RECENT_ASCENDING]:  "https://fcctop100.herokuapp.com/api/fccusers/top/recent",
        [SHOW_RECENT_DESCENDING]: "https://fcctop100.herokuapp.com/api/fccusers/top/recent"
    }
    const camperListPromise = makeRequest(leaderboardUrls[key])
      .then((response) => response.json())
      .then((camperList) => {
          if ([SHOW_ALL_TIME_ASCENDING, SHOW_RECENT_ASCENDING].includes(key)) {
            return camperList.reverse();
          }
          else if ([SHOW_ALL_TIME_DESCENDING, SHOW_RECENT_DESCENDING].includes(key)) {
            return camperList;
          }
          else {
            throw new Error("Illegal filter value");
          }
      })
      .then((camperList) => addCamperRanks(camperList))
      .catch((err) => console.log(err));
    return camperListPromise;
}

export default fetchCamperList