import React from "react";
import { Sparkles, Tag, Truck } from "lucide-react";
import "./AnnouncementBar.scss";

const AnnouncementBar = () => {
  return (
    <div className="announcement-bar-strip">
      <div className="announcement-track">
        <div className="announcement-content">
          <Sparkles size={12} className="strip-icon" />
          <span>Festive Heritage Collection Live</span>
          <span className="dot">•</span>
          <Truck size={12} className="strip-icon" />
          <span>Free Pan-India Delivery Above ₹999</span>
          <span className="dot">•</span>
          <Tag size={12} className="strip-icon" />
          <span>Code: <strong>MAVTAR10</strong> for 10% OFF</span>
        </div>
      </div>
    </div>
  );
};

export default AnnouncementBar;