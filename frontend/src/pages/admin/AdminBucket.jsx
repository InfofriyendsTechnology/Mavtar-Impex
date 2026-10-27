import React, { useState, useEffect } from "react";
import {
  Folder,
  Image as ImageIcon,
  HardDrive,
  ChevronRight,
  RefreshCw,
  Home,
  Trash2,
  Database,
  Copy,
  ExternalLink,
  Eye,
  X,
  Upload,
  CheckCircle,
  Clock,
} from "lucide-react";
import toast from "react-hot-toast";
import { bucketApi, uploadApi } from "../../services/api";
import { Skeleton } from "../../components/common/Skeleton";
import "./AdminBucket.scss";

export const AdminBucket = () => {
  const [stats, setStats] = useState(null);
  const [currentPath, setCurrentPath] = useState("mavtar/products");
  const [folders, setFolders] = useState([]);
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);

  // Preview Modal
  const [previewImage, setPreviewImage] = useState(null);

  // Delete Confirm Modal
  const [fileToDelete, setFileToDelete] = useState(null);
  const [folderToDelete, setFolderToDelete] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const fetchStats = async () => {
    try {
      const res = await bucketApi.getStats();
      if (res.success) {
        setStats(res.data);
      }
    } catch (e) {
      console.error("Failed to fetch bucket stats:", e);
    }
  };

  const fetchContents = async (path = "mavtar/products") => {
    setLoading(true);
    try {
      const [folderRes, filesRes] = await Promise.all([
        bucketApi.getFolders(path === "mavtar" ? "" : path),
        bucketApi.getFiles(path),
      ]);
      setFolders(folderRes.data || []);
      setFiles(filesRes.data || []);
      setCurrentPath(path);
    } catch (e) {
      console.error("Failed to fetch bucket contents:", e);
      toast.error("Failed to load bucket contents");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
    fetchContents("mavtar/products");
  }, []);

  const handleFolderClick = (folderPath) => {
    fetchContents(folderPath);
  };

  const handleBreadcrumbClick = (index) => {
    if (index === -1) {
      fetchContents("mavtar");
      return;
    }
    const targetPath = ["mavtar", ...pathParts.slice(0, index + 1)].join("/");
    fetchContents(targetPath);
  };

  const copyUrl = (url) => {
    navigator.clipboard.writeText(url);
    toast.success("Image URL copied to clipboard!");
  };

  const formatBytes = (bytes) => {
    if (!bytes || bytes === 0) return "0 B";
    const k = 1024;
    const sizes = ["B", "KB", "MB", "GB", "TB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const handleDeleteFile = async () => {
    if (!fileToDelete) return;
    setIsDeleting(true);
    try {
      const res = await bucketApi.deleteFile(fileToDelete.public_id);
      if (res.success) {
        toast.success("File deleted successfully from Cloudinary");
        setFiles(files.filter((f) => f.public_id !== fileToDelete.public_id));
        setFileToDelete(null);
        fetchStats();
      }
    } catch (e) {
      toast.error("Failed to delete file");
    } finally {
      setIsDeleting(false);
    }
  };

  const handleDeleteFolder = async () => {
    if (!folderToDelete) return;
    setIsDeleting(true);
    try {
      const res = await bucketApi.deleteFolder(folderToDelete.path);
      if (res.success) {
        toast.success("Folder deleted successfully");
        setFolders(folders.filter((f) => f.path !== folderToDelete.path));
        setFolderToDelete(null);
        fetchStats();
      }
    } catch (e) {
      toast.error("Failed to delete folder");
    } finally {
      setIsDeleting(false);
    }
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async () => {
      setUploading(true);
      try {
        const targetFolder = currentPath || "mavtar/products";
        const res = await uploadApi.uploadImage(reader.result, targetFolder);
        if (res.success) {
          toast.success("Asset uploaded successfully to Cloud!");
          fetchContents(currentPath);
          fetchStats();
        }
      } catch (err) {
        toast.error("Image upload failed");
      } finally {
        setUploading(false);
      }
    };
    reader.readAsDataURL(file);
  };

  const pathParts = currentPath
    ? currentPath.split("/").filter((p) => Boolean(p) && p !== "mavtar")
    : [];

  return (
    <div className="admin-bucket-page">
      {/* 1. Header with Cloudinary Stats */}
      <div className="bucket-header">
        <div className="title-section">
          <h1 className="main-title">Super Admin Bucket Storage</h1>
          <p className="subtitle">
            Manage Cloudinary cloud storage, media folders, and high-res product assets.
          </p>
        </div>

        {stats && (
          <div className="stats-cards">
            <div className="stat-card">
              <HardDrive className="stat-icon" />
              <div className="stat-info">
                <span className="stat-label">Cloud Usage</span>
                <span className="stat-value">{formatBytes(stats.usage)}</span>
              </div>
            </div>

            <div className="stat-card">
              <Database className="stat-icon" />
              <div className="stat-info">
                <span className="stat-label">Free Storage</span>
                <span className="stat-value">{formatBytes(stats.free)}</span>
              </div>
            </div>

            <div className="stat-card">
              <ImageIcon className="stat-icon" />
              <div className="stat-info">
                <span className="stat-label">Total Assets</span>
                <span className="stat-value">{stats.fileCount || files.length} Files</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 2. Explorer Container */}
      <div className="explorer-card">
        {/* Toolbar */}
        <div className="explorer-toolbar">
          <div className="breadcrumbs">
            <button
              onClick={() => handleBreadcrumbClick(-1)}
              className={`crumb-btn ${!currentPath ? "active" : ""}`}
            >
              <Home size={15} style={{ marginRight: 4 }} />
              mavtar
            </button>
            {pathParts.map((part, idx) => (
              <React.Fragment key={idx}>
                <ChevronRight size={14} className="crumb-separator" />
                <button
                  onClick={() => handleBreadcrumbClick(idx)}
                  className={`crumb-btn ${
                    idx === pathParts.length - 1 ? "active" : ""
                  }`}
                >
                  {part}
                </button>
              </React.Fragment>
            ))}
          </div>

          <div className="toolbar-actions">
            <label className="upload-btn">
              <Upload size={14} />
              <span>{uploading ? "Uploading..." : "Upload to Cloud"}</span>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                disabled={uploading}
                style={{ display: "none" }}
              />
            </label>

            <button
              onClick={() => {
                fetchStats();
                fetchContents(currentPath);
              }}
              className="refresh-btn"
              title="Refresh Bucket"
            >
              <RefreshCw size={15} className={loading ? "spin" : ""} />
            </button>
          </div>
        </div>

        {/* Content Explorer Area */}
        <div className="explorer-body">
          {loading ? (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))", gap: "16px", padding: "16px" }}>
              {Array.from({ length: 8 }).map((_, i) => (
                <Skeleton key={i} height="140px" borderRadius="14px" />
              ))}
            </div>
          ) : (
            <>
              {/* Folders Section */}
              {folders.length > 0 && (
                <div className="folders-section">
                  <h3 className="section-title">Folders ({folders.length})</h3>
                  <div className="folders-grid">
                    {folders.map((f) => (
                      <div
                        key={f.path}
                        className="folder-item"
                        onClick={() => handleFolderClick(f.path)}
                      >
                        <Folder className="folder-icon" />
                        <span className="folder-name" title={f.name}>
                          {f.name}
                        </span>
                        <button
                          className="folder-delete-btn"
                          title="Delete folder"
                          onClick={(e) => {
                            e.stopPropagation();
                            setFolderToDelete(f);
                          }}
                        >
                          <Trash2 size={13} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Files Section */}
              <div className="files-section">
                <h3 className="section-title">Files ({files.length})</h3>
                {files.length === 0 ? (
                  <div className="empty-files-state">
                    <ImageIcon size={36} className="text-zinc-600" />
                    <span>No image assets found in this cloud directory.</span>
                  </div>
                ) : (
                  <div className="files-grid">
                    {files.map((file) => (
                      <div key={file.public_id} className="file-card">
                        <div
                          className="thumb-wrapper"
                          onClick={() => setPreviewImage(file.secure_url)}
                        >
                          <img
                            src={file.secure_url}
                            alt={file.public_id}
                            loading="lazy"
                          />
                          <div className="hover-overlay">
                            <Eye size={20} className="overlay-icon" />
                          </div>
                        </div>

                        <div className="file-info">
                          <span
                            className="file-title"
                            title={file.public_id.split("/").pop()}
                          >
                            {file.public_id.split("/").pop()}
                          </span>
                          <div className="file-meta">
                            <span>{formatBytes(file.bytes)}</span>
                            {file.width && file.height && (
                              <span>• {file.width}x{file.height}</span>
                            )}
                          </div>
                        </div>

                        <div className="file-actions">
                          <button
                            onClick={() => copyUrl(file.secure_url)}
                            className="action-btn"
                            title="Copy Cloudinary URL"
                          >
                            <Copy size={13} />
                            <span>Copy URL</span>
                          </button>
                          <a
                            href={file.secure_url}
                            target="_blank"
                            rel="noreferrer"
                            className="action-btn"
                            title="Open in new tab"
                          >
                            <ExternalLink size={13} />
                          </a>
                          <button
                            onClick={() => setFileToDelete(file)}
                            className="action-btn delete"
                            title="Delete file"
                          >
                            <Trash2 size={13} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>

      {/* Image Preview Modal */}
      {previewImage && (
        <div className="preview-modal-backdrop" onClick={() => setPreviewImage(null)}>
          <div className="preview-modal-content" onClick={(e) => e.stopPropagation()}>
            <button
              className="close-preview-btn"
              onClick={() => setPreviewImage(null)}
            >
              <X size={20} />
            </button>
            <img src={previewImage} alt="Cloudinary Asset Preview" />
          </div>
        </div>
      )}

      {/* Delete File Confirm Modal */}
      {fileToDelete && (
        <div className="confirm-modal-backdrop">
          <div className="confirm-modal-box">
            <h3>Delete Asset from Cloud?</h3>
            <p>
              Are you sure you want to permanently delete{" "}
              <strong>{fileToDelete.public_id}</strong> from Cloudinary?
            </p>
            <div className="modal-actions">
              <button
                className="cancel-btn"
                onClick={() => setFileToDelete(null)}
                disabled={isDeleting}
              >
                Cancel
              </button>
              <button
                className="danger-btn"
                onClick={handleDeleteFile}
                disabled={isDeleting}
              >
                {isDeleting ? "Deleting..." : "Delete Permanently"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Folder Confirm Modal */}
      {folderToDelete && (
        <div className="confirm-modal-backdrop">
          <div className="confirm-modal-box">
            <h3>Delete Folder from Cloud?</h3>
            <p>
              Are you sure you want to permanently delete folder{" "}
              <strong>{folderToDelete.name}</strong> and all its contents?
            </p>
            <div className="modal-actions">
              <button
                className="cancel-btn"
                onClick={() => setFolderToDelete(null)}
                disabled={isDeleting}
              >
                Cancel
              </button>
              <button
                className="danger-btn"
                onClick={handleDeleteFolder}
                disabled={isDeleting}
              >
                {isDeleting ? "Deleting..." : "Delete Folder"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminBucket;
