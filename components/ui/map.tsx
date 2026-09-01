"use client";

import { useEffect, useRef } from "react";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";

interface MapProps {
  center?: [number, number];
  zoom?: number;
  className?: string;
  children?: React.ReactNode;
  marker?: [number, number];
  markerColor?: string;
}

/**
 * Tearing a map down while its style/tiles are still loading (React StrictMode's
 * dev double-mount, or a fast unmount) makes MapLibre abort those fetches. The
 * resulting AbortError surfaces as an async rejection, so a try/catch around
 * remove() can't see it. Suppress it with a listener that is installed once and
 * only reacts while at least one Map is mounted.
 */
let mountedMaps = 0;
let rejectionHandlerInstalled = false;

function isAbortError(reason: unknown): boolean {
  return (reason as { name?: string } | null)?.name === "AbortError";
}

function installRejectionHandler() {
  if (rejectionHandlerInstalled || typeof window === "undefined") return;
  rejectionHandlerInstalled = true;
  window.addEventListener("unhandledrejection", (event) => {
    if (mountedMaps > 0 && isAbortError(event.reason)) {
      event.preventDefault();
    }
  });
}

export function Map({
  center = [-71.0589, 42.3601],
  zoom = 11,
  className = "",
  children,
  marker,
  markerColor = "#1E6EF4"
}: MapProps) {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<maplibregl.Map | null>(null);
  const markerRef = useRef<maplibregl.Marker | null>(null);
  const isMounted = useRef(true);

  useEffect(() => {
    isMounted.current = true;

    if (!mapContainer.current || map.current) return;

    installRejectionHandler();
    mountedMaps += 1;

    let currentMap: maplibregl.Map | null = null;

    try {
      // CARTO basemap - dark theme
      currentMap = new maplibregl.Map({
        container: mapContainer.current,
        style: "https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json",
        center: center,
        zoom: zoom,
        attributionControl: false,
        interactive: false,
        scrollZoom: false,
        boxZoom: false,
        dragRotate: false,
        dragPan: false,
        keyboard: false,
        doubleClickZoom: false,
        touchZoomRotate: false,
        touchPitch: false,
      });

      // Aborted requests are expected during cleanup - ignore them
      currentMap.on("error", (e) => {
        if (isAbortError(e.error)) return;
        console.error("Map error:", e.error);
      });

      map.current = currentMap;

      // Add marker if provided
      if (marker && currentMap) {
        const addMarker = () => {
          if (!isMounted.current || !map.current) return;

          // Remove existing marker if any
          if (markerRef.current) {
            markerRef.current.remove();
          }

          // Create a custom marker element
          const el = document.createElement("div");
          el.className = "custom-marker";
          el.style.width = "12px";
          el.style.height = "12px";
          el.style.borderRadius = "50%";
          el.style.backgroundColor = markerColor;
          el.style.border = "2px solid #fff";
          el.style.boxShadow = `0 0 8px ${markerColor}`;
          el.style.cursor = "pointer";

          markerRef.current = new maplibregl.Marker({
            element: el,
            anchor: "center",
          })
            .setLngLat(marker)
            .addTo(map.current);
        };

        // Add marker when map loads
        if (currentMap.loaded()) {
          addMarker();
        } else {
          currentMap.on("load", addMarker);
        }
      }
    } catch (error) {
      console.error("Error initializing map:", error);
    }

    return () => {
      isMounted.current = false;

      if (markerRef.current) {
        try {
          markerRef.current.remove();
        } catch {
          // Marker may already be removed or aborted
        }
        markerRef.current = null;
      }

      const mapToRemove = map.current;
      map.current = null;

      const releaseSuppression = () => {
        // Keep suppressing aborts until the teardown's async fallout has settled.
        setTimeout(() => {
          mountedMaps = Math.max(0, mountedMaps - 1);
        }, 0);
      };

      if (!mapToRemove || (mapToRemove as unknown as { _removed?: boolean })._removed) {
        releaseSuppression();
        return;
      }

      let torndown = false;
      let fallback: ReturnType<typeof setTimeout> | undefined;

      const teardown = () => {
        if (torndown) return;
        torndown = true;
        if (fallback) clearTimeout(fallback);
        try {
          mapToRemove.stop();
        } catch {
          // Ignore errors from stopping pending operations
        }
        try {
          mapToRemove.remove();
        } catch {
          // Map may already be torn down
        }
        releaseSuppression();
      };

      // Calling remove() mid-load aborts the in-flight style request, and
      // MapLibre surfaces that rejection asynchronously - a try/catch here can't
      // see it, and Next's dev overlay registers its own unhandledrejection
      // listener before this module loads, so it reports the error no matter what
      // we preventDefault(). Letting the style settle first means there is
      // nothing to abort. The map briefly outlives the component; the fallback
      // covers a style that never resolves.
      if (mapToRemove.loaded()) {
        teardown();
      } else {
        fallback = setTimeout(teardown, 5000);
        mapToRemove.once("load", teardown);
        mapToRemove.once("error", teardown);
      }
    };
  }, [center, zoom, marker, markerColor]);

  return (
    <div className={`relative w-full h-full ${className}`} style={{ minHeight: '100%', minWidth: '100%' }}>
      <div ref={mapContainer} className="w-full h-full" style={{ minHeight: '100%', minWidth: '100%' }} />
      {children}
    </div>
  );
}

export function MapControls() {
  // Map controls can be added here if needed
  return null;
}
