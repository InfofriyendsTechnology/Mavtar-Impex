import React, { useState, useEffect } from "react";
import { Settings, Save, ShieldCheck, Check } from "lucide-react";
import { settingsApi } from "../../services/api";
import { Skeleton } from "../../components/common/Skeleton";
import toast from "react-hot-toast";
import "./AdminSettings.scss";

const AdminSettings = () => {
  const [settings, setSettings] = useState({
    storeName: "Mavtar Impex",
    ownerName: "Krish Vaghani",
    tagline: "Handcrafted Luxury Linen Bags & Royal Indian Embroidery",
    supportEmail: "contact@mavtarimpex.com",
    supportPhone: "+91 95127 53471",
    whatsappNumber: "919512753471",
    freeShippingThreshold: 999,
    standardShippingFee: 99,
    bannerText: "Handcrafted Luxury Linen Bags | Free Pan-India Delivery Above ₹999 | Code: MAVTAR10 for 10% OFF",
    address: "Surat, Gujarat, India - 395006",
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    settingsApi
      .get()
      .then((res) => {
        if (res.success && res.data) {
          setSettings(res.data);
        }
      })
      .catch((err) => console.error("Error loading settings:", err))
      .finally(() => setLoading(false));
  }, []);

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await settingsApi.update(settings);
      if (res.success) {
        toast.success("Store settings updated successfully");
      }
    } catch (err) {
      toast.error("Failed to save settings");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="admin-settings-page" style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
        <Skeleton height="80px" borderRadius="18px" />
        <Skeleton height="320px" borderRadius="18px" />
      </div>
    );
  }

  return (
    <div className="admin-settings-page">
      <div className="page-header-bar">
        <h1 className="page-title">Store Settings</h1>
        <p className="page-subtitle">
          Configure business details, shipping thresholds, and promotional announcements.
        </p>
      </div>

      <div className="settings-panel-card">
        <form onSubmit={handleSave}>
          <div className="section-block">
            <h3 className="section-heading">Brand Profile</h3>

            <div className="form-grid-2">
              <div className="form-group">
                <label>Company / Store Name</label>
                <input
                  type="text"
                  value={settings.storeName}
                  onChange={(e) => setSettings({ ...settings, storeName: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label>Owner / Managing Director</label>
                <input
                  type="text"
                  value={settings.ownerName || "Krish Vaghani"}
                  onChange={(e) => setSettings({ ...settings, ownerName: e.target.value })}
                />
              </div>
            </div>

            <div className="form-grid-2">
              <div className="form-group">
                <label>Support Email</label>
                <input
                  type="email"
                  value={settings.supportEmail}
                  onChange={(e) => setSettings({ ...settings, supportEmail: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label>Brand Tagline</label>
                <input
                  type="text"
                  value={settings.tagline}
                  onChange={(e) => setSettings({ ...settings, tagline: e.target.value })}
                />
              </div>
            </div>

            <div className="form-grid-2">
              <div className="form-group">
                <label>Support Phone</label>
                <input
                  type="text"
                  value={settings.supportPhone}
                  onChange={(e) => setSettings({ ...settings, supportPhone: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label>WhatsApp Business Number</label>
                <input
                  type="text"
                  value={settings.whatsappNumber}
                  onChange={(e) => setSettings({ ...settings, whatsappNumber: e.target.value })}
                />
              </div>
            </div>

            <div className="form-group">
              <label>Workshop & Warehouse Address</label>
              <input
                type="text"
                value={settings.address}
                onChange={(e) => setSettings({ ...settings, address: e.target.value })}
              />
            </div>
          </div>

          <div className="section-block">
            <h3 className="section-heading">Shipping & Marketing Rules</h3>

            <div className="form-grid-2">
              <div className="form-group">
                <label>Free Shipping Minimum (₹)</label>
                <input
                  type="number"
                  value={settings.freeShippingThreshold}
                  onChange={(e) => setSettings({ ...settings, freeShippingThreshold: Number(e.target.value) })}
                />
              </div>

              <div className="form-group">
                <label>Standard Shipping Fee (₹)</label>
                <input
                  type="number"
                  value={settings.standardShippingFee}
                  onChange={(e) => setSettings({ ...settings, standardShippingFee: Number(e.target.value) })}
                />
              </div>
            </div>

            <div className="form-group">
              <label>Announcement Banner Text</label>
              <textarea
                rows={2}
                value={settings.bannerText}
                onChange={(e) => setSettings({ ...settings, bannerText: e.target.value })}
              />
            </div>
          </div>

          <div className="form-footer">
            <button
              type="submit"
              disabled={saving}
              className="save-btn"
            >
              <Save size={16} />
              <span>{saving ? "Saving Changes..." : "Save Store Settings"}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminSettings;