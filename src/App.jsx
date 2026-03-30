import { useState } from "react";
import { suppliers } from "./data";

export default function App() {
  const [selectedSupplier, setSelectedSupplier] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  if (previewUrl) {
    return (
      <div
        style={{
          height: "100vh",
          width: "100vw",
          display: "flex",
          flexDirection: "column",
          position: "fixed",
          top: 0,
          left: 0,
          backgroundColor: "#000",
          zIndex: 2000
        }}
      >
        <div style={{ display: "flex", gap: "10px", padding: "12px", backgroundColor: "#111" }}>
          <button
            onClick={() => setPreviewUrl(null)}
            style={{
              padding: "16px",
              backgroundColor: "#ff4d4d",
              color: "white",
              border: "none",
              fontWeight: "bold",
              fontSize: "1rem",
              borderRadius: "8px"
            }}
          >
            ✕ CLOSE
          </button>

          <a
            href={previewUrl}
            target="_blank"
            rel="noreferrer"
            style={{
              padding: "16px",
              backgroundColor: "#0f90cd",
              color: "white",
              textDecoration: "none",
              fontWeight: "bold",
              borderRadius: "8px"
            }}
          >
            OPEN IN NEW TAB
          </a>
        </div>

        <iframe
          src={previewUrl}
          style={{ width: "100%", flexGrow: 1, border: "none", backgroundColor: "#fff" }}
          title="Manual"
        />
      </div>
    );
  }

  const isSearching = searchTerm.length > 0;

  const filteredSuppliers = suppliers.filter((s) =>
    s.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const allModels = suppliers.flatMap((s) =>
    s.models.map((m) => ({
      ...m,
      supplierId: s.id,
      supplierName: s.name,
      supplierLogo: s.logo
    }))
  );

  const filteredModels = allModels.filter(
    (m) =>
      m.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.supplierName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div
      style={{
        padding: "20px",
        fontFamily: "sans-serif",
        maxWidth: "600px",
        margin: "0 auto",
        minHeight: "100vh"
      }}
    >
      <div style={{ textAlign: "center", marginBottom: "20px" }}>
        <img src="/ELSETLOGO.png" style={{ width: "80%", maxWidth: "500px" }} alt="Logo" />
        <div
          style={{
            fontWeight: "bold",
            textTransform: "uppercase",
            marginTop: "10px",
            letterSpacing: "1px",
            fontSize: "1.5rem",
            color: "#0f90cd"
          }}
        >
          SUPPLIER MANUALS
        </div>
      </div>

      <div style={{ position: "relative", marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Search supplier or model..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            width: "100%",
            padding: "15px",
            fontSize: "1rem",
            borderRadius: "10px",
            border: "2px solid #007bff",
            boxSizing: "border-box",
            outline: "none"
          }}
        />
        {isSearching && (
          <button
            onClick={() => setSearchTerm("")}
            style={{
              position: "absolute",
              right: "15px",
              top: "15px",
              border: "none",
              background: "none",
              fontSize: "1.2rem",
              color: "#999"
            }}
          >
            ✕
          </button>
        )}
      </div>

      {isSearching && (
        <div>
          {filteredSuppliers.length > 0 && (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr 1fr",
                gap: "8px",
                marginBottom: "20px"
              }}
            >
              {filteredSuppliers.map((s) => (
                <div
                  key={s.id}
                  onClick={() => {
                    setSelectedSupplier(s);
                    setSearchTerm("");
                  }}
                  style={{
                    border: "1px solid #ddd",
                    borderRadius: "8px",
                    padding: "10px",
                    textAlign: "center",
                    backgroundColor: "#fff",
                    aspectRatio: "1/1",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer"
                  }}
                >
                  <img
                    src={s.logo}
                    alt={s.name}
                    style={{ width: "70%", height: "60%", objectFit: "contain" }}
                  />
                  <div style={{ fontSize: "0.6rem", fontWeight: "bold" }}>{s.name}</div>
                </div>
              ))}
            </div>
          )}

          <h4 style={{ margin: "10px 0" }}>Manuals:</h4>

          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            {filteredModels.map((m) => (
              <button
                key={m.id}
                onClick={() => setPreviewUrl(m.link)}
                style={{
                  padding: "15px",
                  backgroundColor: "#007bff",
                  color: "white",
                  border: "none",
                  borderRadius: "8px",
                  textAlign: "left",
                  fontWeight: "bold"
                }}
              >
                <span style={{ fontSize: "0.7rem", opacity: 0.8, display: "block" }}>
                  {m.supplierName}
                </span>
                {m.name}
              </button>
            ))}
          </div>

          {filteredSuppliers.length === 0 && filteredModels.length === 0 && (
            <div style={{ padding: "20px", textAlign: "center", color: "#666" }}>
              No suppliers or manuals found.
            </div>
          )}
        </div>
      )}

      {!isSearching && !selectedSupplier && (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "8px" }}>
          {suppliers.map((s) => (
            <div
              key={s.id}
              onClick={() => setSelectedSupplier(s)}
              style={{
                border: "1px solid #eee",
                borderRadius: "8px",
                padding: "8px",
                textAlign: "center",
                backgroundColor: "#fff",
                aspectRatio: "1/1",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer"
              }}
            >
              <img
                src={s.logo}
                alt={s.name}
                style={{ width: "70%", height: "60%", objectFit: "contain" }}
              />
              <div style={{ fontWeight: "bold", fontSize: "0.65rem", textTransform: "uppercase" }}>
                {s.name}
              </div>
            </div>
          ))}
        </div>
      )}

      {!isSearching && selectedSupplier && (
        <div>
          <button
            onClick={() => setSelectedSupplier(null)}
            style={{
              marginBottom: "15px",
              padding: "10px",
              borderRadius: "5px",
              border: "1px solid #ccc"
            }}
          >
            ← Back
          </button>

          <h2 style={{ borderBottom: "2px solid #333", paddingBottom: "5px" }}>
            {selectedSupplier.name}
          </h2>

          <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginTop: "15px" }}>
            {selectedSupplier.models.map((m) => (
              <button
                key={m.id}
                onClick={() => setPreviewUrl(m.link)}
                style={{
                  padding: "20px",
                  backgroundColor: "#007bff",
                  color: "white",
                  border: "none",
                  borderRadius: "10px",
                  fontWeight: "bold"
                }}
              >
                {m.name}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}