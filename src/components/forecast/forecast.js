import {
  Accordion,
  AccordionItem,
  AccordionItemButton,
  AccordionItemHeading,
  AccordionItemPanel,
} from "react-accessible-accordion";
import "./forecast.css";

const WEEKDAYS = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

const Forecast = ({ data }) => {
  const dayInWeek = new Date().getDay();
  const forecastDays = WEEKDAYS.slice(dayInWeek, WEEKDAYS.length).concat(
    WEEKDAYS.slice(0, dayInWeek)
  );

  const capitalizeFirstLetters = (str) => {
    return str.replace(/\b\w/g, (char) => char.toUpperCase());
  };

  const adjustIconName = (iconName) => {
    return iconName.endsWith("n") ? iconName.replace("n", "d") : iconName;
  };

  return (
    <>
      <label className="title">Daily Forecast</label>
      <Accordion allowZeroExpanded>
        {data.list.slice(0, 7).map((item, idx) => {
          return (
            <AccordionItem key={idx}>
              <AccordionItemHeading>
                <AccordionItemButton>
                  <div className="daily-item">
                    <img
                      alt="weather"
                      className="icon-small"
                      src={`icons/${adjustIconName(item.weather[0].icon)}.png`}
                    />
                    <label className="day">{forecastDays[idx]}</label>
                    <label className="description">
                      {capitalizeFirstLetters(item.weather[0].description)}
                    </label>
                    <label className="min-max">
                      {Math.round(item.main.temp_min)}°F /
                      {Math.round(item.main.temp_max)}°F
                    </label>
                  </div>
                </AccordionItemButton>
              </AccordionItemHeading>
              <AccordionItemPanel>
                <div className="daily-details-grid">
                  <div className="daily-details-grid-item">
                    <label>Pressure:</label>
                    <label>{item.main.pressure}mb</label>
                  </div>
                  <div className="daily-details-grid-item">
                    <label>Humidity:</label>
                    <label>{item.main.humidity}%</label>
                  </div>
                  <div className="daily-details-grid-item">
                    <label>Cloud Cover:</label>
                    <label>{item.clouds.all}%</label>
                  </div>
                  <div className="daily-details-grid-item">
                    <label>Wind Speed:</label>
                    <label>{item.wind.speed} mph</label>
                  </div>
                  <div className="daily-details-grid-item">
                    <label>Feels like:</label>
                    <label>{item.main.feels_like}°F</label>
                  </div>
                </div>
              </AccordionItemPanel>
            </AccordionItem>
          );
        })}
        <AccordionItem></AccordionItem>
      </Accordion>
    </>
  );
};

export default Forecast;
