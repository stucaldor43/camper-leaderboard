import fetchCamperList from './camperFetcher';
import { SHOW_ALL_TIME_ASCENDING, SHOW_ALL_TIME_DESCENDING, SHOW_RECENT_ASCENDING, SHOW_RECENT_DESCENDING } from './camperFilters';
import template from './templates/top-campers.handlebars';
import Blazy from 'blazy'

const addEvent = (element, eventType, handler) => {
    if (element.addEventListener) {
        element.addEventListener(eventType, handler);
        return;
    }
    element.attachEvent(`on${eventType}`, handler);
}

const findNode = (elementId) => document.getElementById(elementId);

const insertCampers = (camperList) => {
    document.getElementById("container").innerHTML = template({campers: camperList})
    const blazy = new Blazy({
            container: "#container",
            offset: 200
    });
}

const sortByRecentPoints = () => {
    let recentFilterOrder = SHOW_RECENT_DESCENDING;
    return (e) => {
        const triggerElements = [findNode("recentPointsFilterToggle"), findNode("recentPointsSortingIcon")];
        if (triggerElements.includes(e.target)) {
            if (recentFilterOrder === SHOW_RECENT_DESCENDING) {
                recentFilterOrder = SHOW_RECENT_ASCENDING;
            }
            else {
                recentFilterOrder = SHOW_RECENT_DESCENDING;
            }
            fetchCamperList(recentFilterOrder)
              .then(insertCampers)
              .then(() => {
                const element = findNode("recentPointsSortingIcon");
                const classes = [""];
                (recentFilterOrder === SHOW_RECENT_DESCENDING) ? classes.push("icono-caretDown") : classes.push("icono-caretUp") ;
                element.className = classes.join(" ");
              })
              .catch((err) => console.log(err));
        }
    }
}

const sortByAllTimePoints = () => {
    let allTimeFilterOrder = SHOW_ALL_TIME_DESCENDING;
    return (e) => {
        const triggerElements = [findNode("allTimePointsFilterToggle"), findNode("allTimePointsSortingIcon")];
        if (triggerElements.includes(e.target)) {
            if (allTimeFilterOrder === SHOW_ALL_TIME_DESCENDING) {
                allTimeFilterOrder = SHOW_ALL_TIME_ASCENDING;
            }
            else {
                allTimeFilterOrder = SHOW_ALL_TIME_DESCENDING;
            }
            fetchCamperList(allTimeFilterOrder)
              .then(insertCampers)
              .then(() => {
                const element = findNode("allTimePointsSortingIcon");
                const classes = [""];
                (allTimeFilterOrder === SHOW_ALL_TIME_DESCENDING) ? classes.push("icono-caretDown") : classes.push("icono-caretUp") ;
                element.className = classes.join(" ");   
              })
              .catch((err) => console.log(err));
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
      .catch((err) => console.log(err));
});
