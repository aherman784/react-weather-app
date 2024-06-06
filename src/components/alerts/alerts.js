import React, { useState } from "react";
import Search from "../search/search";
import {
  Accordion,
  AccordionItem,
  AccordionItemButton,
  AccordionItemHeading,
  AccordionItemPanel,
} from "react-accessible-accordion";
import "./alerts.css";

const Alerts = () => {
  const [alerts, setAlerts] = useState([]);

  const handleOnSearchChange = async (searchData) => {
    if (searchData) {
      const [latitude, longitude] = searchData.value.split(" ");
      const alertResponse = await fetch(
        `https://api.weather.gov/alerts/active?point=${latitude},${longitude}`
      );
      const alertData = await alertResponse.json();
      setAlerts(alertData.features);
    }
  };

  const parseDescription = (description) => {
    // Split description
    const sections = description
      .split("*")
      .filter((section) => section.trim() !== "");

    return sections.map((section, index) => {
      // Extract first word and following content
      const [firstWord, rest] = section
        .trim()
        .split("...")
        .map((part) => part.trim());

      // Bold category and add :
      return (
        <p key={index}>
          <strong>{firstWord.toUpperCase()}</strong>: {rest}
        </p>
      );
    });
  };

  return (
    <div className="alerts-container">
      <Search onSearchChange={handleOnSearchChange} />
      <div>
        {alerts.length === 0 ? (
          <p>No alerts for this location.</p>
        ) : (
          <Accordion allowZeroExpanded>
            {alerts.map((alert, idx) => (
              <AccordionItem key={idx}>
                <AccordionItemHeading>
                  <AccordionItemButton>
                    <div className="alert-item">
                      <label className="headline">
                        {alert.properties.headline}
                      </label>
                      <span className="arrow">&#9660;</span>
                    </div>
                  </AccordionItemButton>
                </AccordionItemHeading>
                <AccordionItemPanel className="accordion__panel">
                  <div className="alert-details-grid">
                    <div className="alert-details-grid-item">
                      <label>Area Description:</label>
                      <label>{alert.properties.areaDesc}</label>
                    </div>
                    <div className="alert-details-grid-item">
                      <label>Description:</label>
                      <div>
                        {parseDescription(alert.properties.description)}
                      </div>
                    </div>
                    <div className="alert-details-grid-item">
                      <label>Instructions:</label>
                      <label>{alert.properties.instruction}</label>
                    </div>
                  </div>
                </AccordionItemPanel>
              </AccordionItem>
            ))}
          </Accordion>
        )}
      </div>
    </div>
  );
};

export default Alerts;
