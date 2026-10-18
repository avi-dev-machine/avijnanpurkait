"use client";

import { Download, ArrowLeft, ExternalLink, FileText, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function ResumePage() {
  const pdfUrl = "/Avijnan_Purkait_Resume.pdf";
  const [downloaded, setDownloaded] = useState(false);

  const handleDownloadClick = () => {
    setDownloaded(true);
    setTimeout(() => setDownloaded(false), 3000);
  };

  return (
    <div className="resume-viewer-container">
      {/* Top action toolbar */}
      <header className="resume-viewer-header" role="banner">
        <div className="header-left">
          <Link href="/" className="nav-back-link">
            <ArrowLeft size={16} />
            <span>BACK TO PORTFOLIO</span>
          </Link>
          <div className="doc-pill">
            <FileText size={14} className="doc-icon" />
            <span className="doc-name">Avijnan_Purkait_Resume.pdf</span>
            <span className="doc-meta">VERIFIED PDF · 7.2 KB</span>
          </div>
        </div>

        <div className="header-actions">
          <a
            href={pdfUrl}
            target="_blank"
            rel="noreferrer"
            className="action-btn-secondary"
            title="Open raw PDF file in new browser tab"
          >
            <ExternalLink size={15} />
            <span className="btn-label">OPEN RAW ↗</span>
          </a>

          <a
            href={pdfUrl}
            download="Avijnan_Purkait_Resume.pdf"
            onClick={handleDownloadClick}
            className="action-btn-primary"
            title="Download Avijnan Purkait Resume PDF"
          >
            {downloaded ? <CheckCircle2 size={15} /> : <Download size={15} />}
            <span>{downloaded ? "DOWNLOADING..." : "DOWNLOAD PDF"}</span>
          </a>
        </div>
      </header>

      {/* Embedded Native PDF Viewer */}
      <main className="pdf-viewport-wrapper">
        <object
          data={`${pdfUrl}#toolbar=1&navpanes=0&scrollbar=1&view=FitH`}
          type="application/pdf"
          className="pdf-embed-object"
          aria-label="Avijnan Purkait Resume PDF"
        >
          <iframe
            src={`${pdfUrl}#toolbar=1&navpanes=0&scrollbar=1&view=FitH`}
            className="pdf-embed-frame"
            title="Avijnan Purkait Resume"
          >
            <div className="pdf-fallback-card">
              <FileText size={42} color="var(--acid, #d6ff2b)" />
              <h2>Avijnan Purkait — Resume (PDF)</h2>
              <p>Your browser doesn&apos;t support direct inline PDF embedding.</p>
              <a
                href={pdfUrl}
                download="Avijnan_Purkait_Resume.pdf"
                className="action-btn-primary"
              >
                <Download size={16} />
                <span>DOWNLOAD RESUME (.PDF)</span>
              </a>
            </div>
          </iframe>
        </object>
      </main>

      <style jsx global>{`
        body {
          margin: 0;
          padding: 0;
          overflow: hidden;
          background: #0a0b0a;
        }

        .resume-viewer-container {
          display: flex;
          flex-direction: column;
          height: 100vh;
          width: 100vw;
          background: #0a0b0a;
          color: #ece8d8;
          font-family: var(--grotesk, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif);
        }

        .resume-viewer-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 10px 20px;
          height: 60px;
          background: #0d0f0d;
          border-bottom: 1px solid rgba(236, 232, 216, 0.12);
          z-index: 10;
          box-sizing: border-box;
          gap: 16px;
        }

        .header-left {
          display: flex;
          align-items: center;
          gap: 16px;
          flex-wrap: wrap;
        }

        .nav-back-link {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          color: #d6ff2b;
          text-decoration: none;
          font-family: var(--mono, "JetBrains Mono", monospace);
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.06em;
          padding: 6px 12px;
          border-radius: 3px;
          background: rgba(214, 255, 43, 0.08);
          border: 1px solid rgba(214, 255, 43, 0.25);
          transition: background 0.2s, border-color 0.2s, color 0.2s;
        }
        .nav-back-link:hover {
          background: rgba(214, 255, 43, 0.18);
          border-color: #d6ff2b;
          color: #ffffff;
        }

        .doc-pill {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 5px 12px;
          background: rgba(236, 232, 216, 0.05);
          border: 1px solid rgba(236, 232, 216, 0.1);
          border-radius: 3px;
          font-family: var(--mono, "JetBrains Mono", monospace);
          font-size: 11px;
        }

        .doc-icon {
          color: #d6ff2b;
        }

        .doc-name {
          color: #ece8d8;
          font-weight: 600;
        }

        .doc-meta {
          color: #7d8278;
          font-size: 9.5px;
          border-left: 1px solid rgba(236, 232, 216, 0.15);
          padding-left: 8px;
        }

        .header-actions {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .action-btn-secondary {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          padding: 8px 14px;
          border: 1px solid rgba(236, 232, 216, 0.2);
          border-radius: 3px;
          color: #ece8d8;
          text-decoration: none;
          font-family: var(--mono, "JetBrains Mono", monospace);
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.04em;
          background: transparent;
          transition: border-color 0.2s, color 0.2s, background 0.2s;
        }
        .action-btn-secondary:hover {
          border-color: #d6ff2b;
          color: #d6ff2b;
          background: rgba(214, 255, 43, 0.06);
        }

        .action-btn-primary {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 8px 18px;
          border: 1px solid #d6ff2b;
          border-radius: 3px;
          background: #d6ff2b;
          color: #0a0b0a;
          text-decoration: none;
          font-family: var(--mono, "JetBrains Mono", monospace);
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.06em;
          transition: background 0.2s, transform 0.2s, box-shadow 0.2s;
          box-shadow: 0 2px 12px rgba(214, 255, 43, 0.25);
        }
        .action-btn-primary:hover {
          background: #d36a4b;
          border-color: #d36a4b;
          color: #f7f4ea;
          transform: translateY(-1px);
          box-shadow: 0 4px 18px rgba(211, 106, 75, 0.35);
        }

        .pdf-viewport-wrapper {
          flex: 1;
          width: 100%;
          height: calc(100vh - 60px);
          background: #1e201e;
          position: relative;
          overflow: hidden;
        }

        .pdf-embed-object,
        .pdf-embed-frame {
          width: 100%;
          height: 100%;
          border: none;
          display: block;
          background: #1e201e;
        }

        .pdf-fallback-card {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          height: 100%;
          padding: 40px 20px;
          text-align: center;
          background: #141614;
          gap: 16px;
        }
        .pdf-fallback-card h2 {
          margin: 0;
          font-size: 22px;
          color: #ece8d8;
        }
        .pdf-fallback-card p {
          margin: 0 0 10px;
          color: #92968c;
          font-size: 14px;
        }

        @media (max-width: 680px) {
          .doc-meta {
            display: none;
          }
          .action-btn-secondary {
            display: none;
          }
          .resume-viewer-header {
            padding: 8px 12px;
          }
          .doc-name {
            display: none;
          }
        }
      `}</style>
    </div>
  );
}
