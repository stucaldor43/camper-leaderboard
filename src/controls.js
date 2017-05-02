import fetchCamperList from './camperFetcher';
import { SHOW_ALL_TIME_ASCENDING, SHOW_ALL_TIME_DESCENDING, SHOW_RECENT_ASCENDING, SHOW_RECENT_DESCENDING } from './camperFilters';
import template from './templates/top-campers.handlebars';

const addEvent = (element, eventType, handler) => {
    if (element.addEventListener) {
        element.addEventListener(eventType, handler);
    }
    else {
        element.attachEvent(`on${eventType}`, handler);
    }
}

const findNode = (elementId) => document.getElementById(elementId);

const insertCampers = (camperList) => document.getElementById("container").innerHTML = template({campers: camperList})

const sortByRecentPoints = () => {
    let recentFilterOrder = SHOW_RECENT_DESCENDING;
    return (e) => {
        const triggerElement = findNode("recentPointsFilterToggle");
        if (triggerElement === e.target) {
            if (recentFilterOrder === SHOW_RECENT_DESCENDING) {
                recentFilterOrder = SHOW_RECENT_ASCENDING;
            }
            else {
                recentFilterOrder = SHOW_RECENT_DESCENDING;
            }
            fetchCamperList(recentFilterOrder)
              .then(insertCampers)
              .then(() => {
                const element = findNode("recentPointsFilterToggle");
                const classes = ["camperLeaderboard-recentPointsHeading"];
                (recentFilterOrder === SHOW_RECENT_DESCENDING) ? classes.push("camperLeaderboard-recentPointsHeading-hasDownCaret") : classes.push("camperLeaderboard-recentPointsHeading-hasUpCaret") ;
                element.className = classes.join(" ");
              })
        }
    }
}

const sortByAllTimePoints = () => {
    let allTimeFilterOrder = SHOW_ALL_TIME_DESCENDING;
    return (e) => {
        const triggerElement = findNode("allTimePointsFilterToggle");
        if (triggerElement === e.target) {
            if (allTimeFilterOrder === SHOW_ALL_TIME_DESCENDING) {
                allTimeFilterOrder = SHOW_ALL_TIME_ASCENDING;
            }
            else {
                allTimeFilterOrder = SHOW_ALL_TIME_DESCENDING;
            }
            fetchCamperList(allTimeFilterOrder)
              .then(insertCampers)
              .then(() => {
                const element = findNode("allTimePointsFilterToggle");
                const classes = ["camperLeaderboard-allTimePointsHeading"];
                (allTimeFilterOrder === SHOW_ALL_TIME_DESCENDING) ? classes.push("camperLeaderboard-allTimePointsHeading-hasDownCaret") : classes.push("camperLeaderboard-allTimePointsHeading-hasUpCaret") ;
                element.className = classes.join(" ");   
              })
        }
    }
}

const attachListeners = () => {
    addEvent(findNode("container"), "click", sortByRecentPoints());
    addEvent(findNode("container"), "click", sortByAllTimePoints());
}

window.addEventListener("load", () => {
    fetchCamperList(SHOW_RECENT_DESCENDING)
      .then(insertCampers)
      .then(() => {
        attachListeners();
      })
});
