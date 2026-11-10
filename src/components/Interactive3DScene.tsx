import { useEffect, useRef } from "react";
import * as THREE from "three";

// Shared mouse state — avoids adding N mousemove listeners for N scene instances
let _sharedMouseX = 0;
let _sharedMouseY = 0;
let _mouseListenerCount = 0;
const _handleSharedMouse = (e: MouseEvent) => {
  _sharedMouseX = (e.clientX / window.innerWidth - 0.5) * 0.5;
  _sharedMouseY = (e.clientY / window.innerHeight - 0.5) * 0.5;
};

// Helper: convert Lat/Lng to 3D Sphere Cartesian position
function latLngToVector3(lat: number, lng: number, radius: number): THREE.Vector3 {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lng + 180) * (Math.PI / 180);
  const x = -(radius * Math.sin(phi) * Math.cos(theta));
  const z = radius * Math.sin(phi) * Math.sin(theta);
  const y = radius * Math.cos(phi);
  return new THREE.Vector3(x, y, z);
}

export interface CityPin {
  name: string;
  lat: number;
  lng: number;
  isCapital?: boolean;
}

export interface DestinationHub {
  name: string;
  country: string;
  flag: string;
  lat: number;
  lng: number;
  cities: CityPin[];
}

export const DESTINATION_HUBS: DestinationHub[] = [
  {
    name: "Nepal",
    country: "Federal Democratic Republic of Nepal",
    flag: "🇳🇵",
    lat: 27.7,
    lng: 85.3,
    cities: [
      { name: "Kathmandu", lat: 27.7172, lng: 85.324, isCapital: true },
      { name: "Pokhara", lat: 28.2096, lng: 83.9856 },
      { name: "Birgunj", lat: 27.0, lng: 84.8667 },
    ],
  },
  {
    name: "China",
    country: "People's Republic of China",
    flag: "🇨🇳",
    lat: 35.0,
    lng: 104.0,
    cities: [
      { name: "Beijing", lat: 39.9042, lng: 116.4074, isCapital: true },
      { name: "Shanghai", lat: 31.2304, lng: 121.4737 },
      { name: "Guangzhou", lat: 23.1291, lng: 113.2644 },
    ],
  },
  {
    name: "Dubai",
    country: "United Arab Emirates",
    flag: "🇦🇪",
    lat: 25.2,
    lng: 55.3,
    cities: [
      { name: "Dubai City", lat: 25.2048, lng: 55.2708, isCapital: true },
      { name: "Palm Jumeirah", lat: 25.1124, lng: 55.139 },
    ],
  },
  {
    name: "Kuwait",
    country: "State of Kuwait",
    flag: "🇰🇼",
    lat: 29.3,
    lng: 47.5,
    cities: [
      { name: "Kuwait City", lat: 29.3759, lng: 47.9774, isCapital: true },
      { name: "Salmiya", lat: 29.3339, lng: 48.0772 },
    ],
  },
  {
    name: "India",
    country: "Republic of India",
    flag: "🇮🇳",
    lat: 20.6,
    lng: 78.9,
    cities: [
      { name: "Delhi NCR", lat: 28.6139, lng: 77.209, isCapital: true },
      { name: "Mumbai", lat: 19.076, lng: 72.8777 },
      { name: "Bengaluru", lat: 12.9716, lng: 77.5946 },
    ],
  },
  {
    name: "Mauritius",
    country: "Republic of Mauritius",
    flag: "🇲🇺",
    lat: -20.3,
    lng: 57.6,
    cities: [
      { name: "Port Louis", lat: -20.1609, lng: 57.5012, isCapital: true },
      { name: "Grand Baie", lat: -20.0183, lng: 57.5802 },
    ],
  },
];

// Helper: Programmatically generate ultra-crisp 2048x1024 Equirectangular World Map Canvas
function createWorldMapCanvas(): HTMLCanvasElement {
  const canvas = document.createElement("canvas");
  canvas.width = 2048;
  canvas.height = 1024;
  const ctx = canvas.getContext("2d");
  if (!ctx) return canvas;

  const w = canvas.width;
  const h = canvas.height;

  // 1. Deep Oceanic Gradient
  const oceanGrad = ctx.createLinearGradient(0, 0, 0, h);
  oceanGrad.addColorStop(0, "#050B18");
  oceanGrad.addColorStop(0.5, "#0A1428");
  oceanGrad.addColorStop(1, "#040914");
  ctx.fillStyle = oceanGrad;
  ctx.fillRect(0, 0, w, h);

  // 2. Latitude & Longitude Coordinate Lines
  ctx.strokeStyle = "rgba(212, 175, 55, 0.07)";
  ctx.lineWidth = 1;
  for (let x = 0; x <= w; x += w / 24) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, h);
    ctx.stroke();
  }
  for (let y = 0; y <= h; y += h / 12) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(w, y);
    ctx.stroke();
  }
  // Equator line
  ctx.strokeStyle = "rgba(212, 175, 55, 0.18)";
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(0, h / 2);
  ctx.lineTo(w, h / 2);
  ctx.stroke();

  // Helper: Lat/Lng -> Canvas X, Y
  const toXY = (lat: number, lng: number): [number, number] => [
    ((lng + 180) / 360) * w,
    ((90 - lat) / 180) * h,
  ];

  // Helper: Draw detailed closed landmass polygon
  const drawPolygon = (coords: Array<[number, number]>, fillStyle: string, strokeStyle: string) => {
    if (coords.length === 0) return;
    ctx.beginPath();
    const [startLat, startLng] = coords[0];
    const [sx, sy] = toXY(startLat, startLng);
    ctx.moveTo(sx, sy);
    for (let i = 1; i < coords.length; i++) {
      const [lat, lng] = coords[i];
      const [x, y] = toXY(lat, lng);
      ctx.lineTo(x, y);
    }
    ctx.closePath();
    ctx.fillStyle = fillStyle;
    ctx.fill();
    if (strokeStyle) {
      ctx.strokeStyle = strokeStyle;
      ctx.lineWidth = 2;
      ctx.stroke();
    }
  };

  const landFill = "#16243D";
  const coastStroke = "rgba(212, 175, 55, 0.6)";

  // --- CONTINENT VECTOR POLYGONS ---

  // Africa
  drawPolygon([
    [35, -5], [37, 10], [32, 32], [28, 34], [12, 44], [12, 51],
    [5, 48], [-11, 40], [-26, 33], [-34, 25], [-34, 18], [-22, 14],
    [-12, 13], [-6, 12], [0, 9], [6, 3], [5, -3], [4, -8],
    [10, -14], [15, -17], [21, -17], [28, -13], [35, -5]
  ], landFill, coastStroke);

  // Madagascar
  drawPolygon([[-12, 49], [-16, 50], [-25, 47], [-25, 44], [-16, 45], [-12, 49]], landFill, coastStroke);

  // Eurasia (Europe + Asia)
  drawPolygon([
    [36, -9], [43, -9], [44, -1], [48, -4], [54, 5], [58, 6],
    [62, 5], [71, 26], [70, 40], [68, 50], [71, 70], [73, 80],
    [76, 110], [73, 140], [66, 170], [60, 163], [56, 160], [51, 156],
    [43, 132], [38, 127], [35, 119], [22, 114], [21, 108], [10, 109],
    [8, 105], [13, 100], [16, 96], [22, 88], [16, 82], [13, 80],
    [8, 77], [13, 75], [19, 72], [24, 67], [25, 62], [20, 59],
    [12, 45], [13, 43], [22, 38], [28, 34], [30, 32], [37, 35],
    [38, 23], [41, 13], [43, 3], [36, -9]
  ], landFill, coastStroke);

  // UK & Ireland
  drawPolygon([[50, -5], [58, -5], [58, 1], [50, 1], [50, -5]], landFill, coastStroke);
  // Scandinavia peninsula detail
  drawPolygon([[58, 5], [65, 12], [70, 28], [62, 30], [56, 14], [58, 5]], landFill, coastStroke);
  // Japan (Honshu & Hokkaido)
  drawPolygon([[31, 130], [35, 135], [41, 141], [45, 142], [43, 145], [35, 140], [31, 130]], landFill, coastStroke);

  // Indian Subcontinent & Himalayas Relief
  drawPolygon([[35, 74], [32, 78], [28, 85], [27, 88], [27, 92], [22, 88], [15, 80], [8, 77], [19, 72], [24, 67], [30, 70], [35, 74]], landFill, coastStroke);

  // North America
  drawPolygon([
    [70, -168], [71, -156], [70, -130], [68, -100], [60, -64],
    [55, -60], [48, -53], [45, -63], [42, -70], [35, -75],
    [25, -80], [25, -82], [30, -84], [30, -90], [21, -89],
    [16, -95], [15, -92], [8, -78], [8, -82], [14, -91],
    [18, -104], [23, -110], [32, -117], [38, -123], [48, -125],
    [58, -137], [60, -145], [60, -165], [70, -168]
  ], landFill, coastStroke);

  // Greenland
  drawPolygon([[75, -45], [83, -30], [81, -12], [70, -20], [60, -45], [65, -55], [75, -45]], landFill, coastStroke);

  // South America
  drawPolygon([
    [11, -73], [10, -62], [6, -50], [0, -50], [-5, -35],
    [-10, -37], [-23, -43], [-34, -53], [-45, -65], [-54, -68],
    [-50, -74], [-40, -73], [-30, -71], [-18, -70], [-12, -77],
    [-4, -81], [1, -79], [8, -77], [11, -73]
  ], landFill, coastStroke);

  // Australia & New Zealand
  drawPolygon([
    [-10, 142], [-15, 145], [-27, 153], [-34, 151], [-38, 145],
    [-38, 140], [-35, 136], [-35, 117], [-32, 115], [-22, 114],
    [-20, 119], [-15, 124], [-12, 131], [-14, 136], [-10, 142]
  ], landFill, coastStroke);
  // Tasmania
  drawPolygon([[-40, 144], [-43, 148], [-41, 148], [-40, 144]], landFill, coastStroke);
  // New Zealand
  drawPolygon([[-35, 173], [-41, 175], [-46, 167], [-44, 170], [-38, 177], [-35, 173]], landFill, coastStroke);

  // 3. Himalayas & Mountain Ridge Gold Highlights
  const drawHimalayas = () => {
    ctx.strokeStyle = "rgba(255, 215, 0, 0.7)";
    ctx.lineWidth = 3;
    ctx.beginPath();
    const [h1x, h1y] = toXY(32, 76);
    const [h2x, h2y] = toXY(28, 85);
    const [h3x, h3y] = toXY(27, 92);
    ctx.moveTo(h1x, h1y);
    ctx.lineTo(h2x, h2y);
    ctx.lineTo(h3x, h3y);
    ctx.stroke();
  };
  drawHimalayas();

  // 4. World Night City Lights (Illuminated global hubs)
  const cityLights: Array<[number, number, number]> = [
    // [lat, lng, radius]
    [27.7172, 85.324, 7],   // Kathmandu / Nepal
    [27.0, 84.8667, 5],    // Birgunj / Nepal
    [28.2096, 83.9856, 5],   // Pokhara / Nepal
    [39.9042, 116.4074, 9], // Beijing
    [31.2304, 121.4737, 10],// Shanghai
    [23.1291, 113.2644, 8], // Guangzhou
    [25.2048, 55.2708, 9],  // Dubai
    [29.3759, 47.9774, 8],  // Kuwait
    [28.6139, 77.209, 9],   // Delhi
    [19.076, 72.8777, 9],   // Mumbai
    [12.9716, 77.5946, 7],  // Bengaluru
    [-20.1609, 57.5012, 6], // Mauritius
    [51.5074, -0.1278, 9],  // London
    [48.8566, 2.3522, 8],   // Paris
    [40.7128, -74.006, 10], // New York
    [34.0522, -118.2437, 9],// Los Angeles
    [35.6762, 139.6503, 11],// Tokyo
    [22.3193, 114.1694, 8], // Hong Kong
    [1.3521, 103.8198, 8],  // Singapore
    [13.7563, 100.5018, 7], // Bangkok
    [30.0444, 31.2357, 8],  // Cairo
    [24.7136, 46.6753, 7],  // Riyadh
    [-33.8688, 151.2093, 8],// Sydney
    [-23.5505, -46.6333, 8],// Sao Paulo
  ];

  cityLights.forEach(([lat, lng, rad]) => {
    const [cx, cy] = toXY(lat, lng);
    const radGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, rad * 2);
    radGrad.addColorStop(0, "rgba(255, 235, 150, 1)");
    radGrad.addColorStop(0.4, "rgba(212, 175, 55, 0.7)");
    radGrad.addColorStop(1, "rgba(212, 175, 55, 0)");
    ctx.fillStyle = radGrad;
    ctx.beginPath();
    ctx.arc(cx, cy, rad * 2, 0, Math.PI * 2);
    ctx.fill();
  });

  return canvas;
}

export function Interactive3DScene({
  mode = "absolute",
  activeDestName = "Dubai",
}: {
  mode?: "absolute" | "fill" | "hero";
  activeDestName?: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const activeDestRef = useRef(activeDestName);

  useEffect(() => {
    activeDestRef.current = activeDestName;
  }, [activeDestName]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Register shared mouse listener
    if (_mouseListenerCount === 0) {
      window.addEventListener("mousemove", _handleSharedMouse);
    }
    _mouseListenerCount++;

    // Scene, camera, renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 7;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "high-performance" });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, window.innerWidth < 768 ? 1.5 : 2));
    container.appendChild(renderer.domElement);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.8);
    scene.add(ambientLight);

    const sunLight = new THREE.DirectionalLight(0xfff5e6, 2.5);
    sunLight.position.set(10, 8, 10);
    scene.add(sunLight);

    const goldPointLight = new THREE.PointLight(0xd4af37, 4, 50);
    goldPointLight.position.set(6, 6, 6);
    scene.add(goldPointLight);

    const cyanPointLight = new THREE.PointLight(0x38bdf8, 3, 50);
    cyanPointLight.position.set(-6, -4, -3);
    scene.add(cyanPointLight);

    // Main Globe Group
    const group = new THREE.Group();
    if (mode === "hero" && container.clientWidth > 768) {
      group.position.x = 1.2;
    }
    scene.add(group);

    // 1. High-Resolution Earth Globe with Map Texture
    const globeRadius = 1.95;
    const mapCanvas = createWorldMapCanvas();
    const mapTexture = new THREE.CanvasTexture(mapCanvas);
    mapTexture.wrapS = THREE.RepeatWrapping;
    mapTexture.wrapT = THREE.ClampToEdgeWrapping;
    mapTexture.colorSpace = THREE.SRGBColorSpace;

    const coreGeo = new THREE.SphereGeometry(globeRadius, 64, 64);
    const coreMat = new THREE.MeshStandardMaterial({
      map: mapTexture,
      roughness: 0.35,
      metalness: 0.15,
      emissive: 0x081326,
      emissiveIntensity: 0.3,
    });
    const coreGlobe = new THREE.Mesh(coreGeo, coreMat);
    group.add(coreGlobe);

    // 2. Outer Atmosphere Glow Shell
    const atmosGeo = new THREE.SphereGeometry(globeRadius * 1.035, 48, 48);
    const atmosMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.18,
      blending: THREE.AdditiveBlending,
      side: THREE.BackSide,
    });
    const atmosGlobe = new THREE.Mesh(atmosGeo, atmosMat);
    group.add(atmosGlobe);

    // 3. Delicate Gold Grid Wireframe Lines
    const wireMat = new THREE.MeshBasicMaterial({
      color: 0xd4af37,
      wireframe: true,
      transparent: true,
      opacity: 0.08,
    });
    const wireGlobe = new THREE.Mesh(coreGeo, wireMat);
    wireGlobe.scale.set(1.002, 1.002, 1.002);
    group.add(wireGlobe);

    // 4. Pin Markers, Light Beacons & Halos for Hubs & Sub-Cities
    const activeHubGroup = new THREE.Group();
    group.add(activeHubGroup);

    const pinGeo = new THREE.SphereGeometry(0.045, 16, 16);
    const pinMat = new THREE.MeshStandardMaterial({
      color: 0xffd700,
      emissive: 0xffa500,
      emissiveIntensity: 1.0,
      roughness: 0.1,
    });

    const subPinGeo = new THREE.SphereGeometry(0.03, 12, 12);
    const subPinMat = new THREE.MeshStandardMaterial({
      color: 0x38bdf8,
      emissive: 0x00ffff,
      emissiveIntensity: 0.8,
    });

    const haloGeo = new THREE.TorusGeometry(0.09, 0.01, 16, 32);
    const haloMat = new THREE.MeshBasicMaterial({
      color: 0xd4af37,
      transparent: true,
      opacity: 0.8,
    });

    const beaconGeo = new THREE.CylinderGeometry(0.005, 0.02, 0.5, 8);
    beaconGeo.translate(0, 0.25, 0); // Origin at base of cylinder
    const beaconMat = new THREE.MeshBasicMaterial({
      color: 0xffd700,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending,
    });

    const haloMeshes: { hubName: string; mesh: THREE.Mesh }[] = [];
    const beaconMeshes: { hubName: string; mesh: THREE.Mesh }[] = [];

    DESTINATION_HUBS.forEach((hub) => {
      // Main Hub Pin
      const hubPos = latLngToVector3(hub.lat, hub.lng, globeRadius * 1.015);
      const mainPin = new THREE.Mesh(pinGeo, pinMat);
      mainPin.position.copy(hubPos);
      activeHubGroup.add(mainPin);

      // Light Beacon Beam
      const beacon = new THREE.Mesh(beaconGeo, beaconMat);
      beacon.position.copy(hubPos);
      beacon.quaternion.setFromUnitVectors(
        new THREE.Vector3(0, 1, 0),
        hubPos.clone().normalize()
      );
      activeHubGroup.add(beacon);
      beaconMeshes.push({ hubName: hub.name, mesh: beacon });

      // Pulse Halo Ring
      const haloMesh = new THREE.Mesh(haloGeo, haloMat);
      haloMesh.position.copy(hubPos);
      haloMesh.lookAt(hubPos.clone().multiplyScalar(2));
      activeHubGroup.add(haloMesh);
      haloMeshes.push({ hubName: hub.name, mesh: haloMesh });

      // Sub-city pins
      hub.cities.forEach((city) => {
        const cityPos = latLngToVector3(city.lat, city.lng, globeRadius * 1.015);
        const cityPin = new THREE.Mesh(subPinGeo, subPinMat);
        cityPin.position.copy(cityPos);
        activeHubGroup.add(cityPin);
      });
    });

    // 5. Parabolic Flight Trajectory Arcs (From Nepal to Partner Destinations)
    const flightArcGroup = new THREE.Group();
    group.add(flightArcGroup);

    const nepalHub = DESTINATION_HUBS.find((h) => h.name === "Nepal");
    const nepalPos = nepalHub ? latLngToVector3(nepalHub.lat, nepalHub.lng, globeRadius * 1.02) : null;

    const arcMeshes: { destName: string; line: THREE.Line; pulseParticle: THREE.Mesh }[] = [];

    if (nepalPos) {
      const pulseGeo = new THREE.SphereGeometry(0.035, 12, 12);
      const pulseMat = new THREE.MeshBasicMaterial({
        color: 0xffd700,
        blending: THREE.AdditiveBlending,
      });

      DESTINATION_HUBS.filter((h) => h.name !== "Nepal").forEach((dest) => {
        const destPos = latLngToVector3(dest.lat, dest.lng, globeRadius * 1.02);

        // Compute 3D parabolic curved path
        const midPos = nepalPos.clone().add(destPos).multiplyScalar(0.5);
        const distance = nepalPos.distanceTo(destPos);
        midPos.normalize().multiplyScalar(globeRadius + distance * 0.35);

        const curve = new THREE.QuadraticBezierCurve3(nepalPos, midPos, destPos);
        const points = curve.getPoints(50);
        const lineGeo = new THREE.BufferGeometry().setFromPoints(points);

        const lineMat = new THREE.LineBasicMaterial({
          color: 0xd4af37,
          transparent: true,
          opacity: 0.3,
          linewidth: 1.5,
        });

        const arcLine = new THREE.Line(lineGeo, lineMat);
        flightArcGroup.add(arcLine);

        const pulseParticle = new THREE.Mesh(pulseGeo, pulseMat);
        pulseParticle.position.copy(nepalPos);
        flightArcGroup.add(pulseParticle);

        arcMeshes.push({ destName: dest.name, line: arcLine, pulseParticle });
      });
    }

    // 6. Champagne Gold Orbital Rings & Floating Badges
    const ringGeo = new THREE.TorusGeometry(2.7, 0.02, 16, 120);
    const ringMat = new THREE.MeshStandardMaterial({
      color: 0xd4af37,
      roughness: 0.1,
      metalness: 0.95,
      emissive: 0x554010,
      emissiveIntensity: 0.3,
    });

    const ring1 = new THREE.Mesh(ringGeo, ringMat);
    ring1.rotation.x = Math.PI / 3;
    group.add(ring1);

    const ring2 = new THREE.Mesh(ringGeo, ringMat);
    ring2.rotation.y = Math.PI / 3.5;
    ring2.rotation.z = Math.PI / 6;
    group.add(ring2);

    // Orbital Particle Dust Ring
    const particleCount = 160;
    const particlePositions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      const angle = (i / particleCount) * Math.PI * 2;
      const r = 2.7 + (Math.random() - 0.5) * 0.3;
      particlePositions[i * 3] = Math.cos(angle) * r;
      particlePositions[i * 3 + 1] = (Math.random() - 0.5) * 0.4;
      particlePositions[i * 3 + 2] = Math.sin(angle) * r;
    }
    const particleGeo = new THREE.BufferGeometry();
    particleGeo.setAttribute("position", new THREE.BufferAttribute(particlePositions, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0xd4af37,
      size: 0.035,
      transparent: true,
      opacity: 0.7,
      blending: THREE.AdditiveBlending,
    });
    const dustPoints = new THREE.Points(particleGeo, particleMat);
    dustPoints.rotation.x = Math.PI / 4;
    group.add(dustPoints);

    // Mouse & Touch Dragging Interaction State
    let isDragging = false;
    let previousMousePosition = { x: 0, y: 0 };
    let dragVelocity = { x: 0, y: 0 };

    const onMouseDown = (e: MouseEvent) => {
      isDragging = true;
      previousMousePosition = { x: e.clientX, y: e.clientY };
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      const deltaX = e.clientX - previousMousePosition.x;
      const deltaY = e.clientY - previousMousePosition.y;

      dragVelocity = { x: deltaX * 0.005, y: deltaY * 0.005 };
      group.rotation.y += dragVelocity.x;
      group.rotation.x += dragVelocity.y;

      previousMousePosition = { x: e.clientX, y: e.clientY };
    };

    const onMouseUp = () => {
      isDragging = false;
    };

    // Touch event handlers for mobile screen interaction
    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        isDragging = true;
        previousMousePosition = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      }
    };

    const onTouchMove = (e: TouchEvent) => {
      if (!isDragging || e.touches.length !== 1) return;
      const touch = e.touches[0];
      const deltaX = touch.clientX - previousMousePosition.x;
      const deltaY = touch.clientY - previousMousePosition.y;

      dragVelocity = { x: deltaX * 0.005, y: deltaY * 0.005 };
      group.rotation.y += dragVelocity.x;
      group.rotation.x += dragVelocity.y;

      previousMousePosition = { x: touch.clientX, y: touch.clientY };
    };

    const onTouchEnd = () => {
      isDragging = false;
    };

    const domElem = renderer.domElement;
    domElem.style.cursor = "grab";
    domElem.style.touchAction = "pan-y"; // Allows normal vertical page scrolling on mobile while dragging globe horizontally
    domElem.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);

    domElem.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    window.addEventListener("touchend", onTouchEnd);

    // Dynamic Camera Distance Function based on aspect ratio (prevents globe horizontal clipping on portrait mobile screens)
    const updateCameraDistance = (w: number, h: number) => {
      const aspect = w / h;
      if (aspect < 1) {
        // Mobile portrait aspect ratio: pull camera back so globe & orbital rings fit completely without horizontal clipping
        camera.position.z = 7 / Math.max(aspect * 0.95, 0.55);
      } else {
        camera.position.z = 7;
      }
      camera.aspect = aspect;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    // Initial camera placement for container aspect ratio
    updateCameraDistance(container.clientWidth, container.clientHeight);

    // Resize observer
    const resizeObserver = new ResizeObserver(() => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      if (w === 0 || h === 0) return;

      updateCameraDistance(w, h);

      if (mode === "hero") {
        group.position.x = w > 768 ? 1.2 : 0;
      }
    });
    resizeObserver.observe(container);

    // Visibility observer to pause 3D loop when scrolled out of view (saves CPU/battery)
    let isVisible = true;
    const visibilityObserver = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
      },
      { threshold: 0.05 }
    );
    visibilityObserver.observe(container);

    // Animation loop
    let animId = 0;
    const clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      if (!isVisible) return;
      const elapsedTime = clock.getElapsedTime();
      const currentActiveName = activeDestRef.current;

      const destTarget = DESTINATION_HUBS.find(
        (d) => d.name.toLowerCase() === currentActiveName?.toLowerCase()
      );

      if (!isDragging) {
        if (destTarget) {
          // Calculate exact 3D position of target pin on unrotated sphere
          const pos = latLngToVector3(destTarget.lat, destTarget.lng, globeRadius);

          // MATHEMATICALLY ACCURATE ROTATION TO BRING TARGET PIN DIRECTLY TO FRONT CENTER (+Z)
          const targetRotY = Math.atan2(-pos.x, pos.z);
          const targetRotX = Math.asin(Math.max(-0.99, Math.min(0.99, pos.y / globeRadius)));

          group.rotation.y = THREE.MathUtils.lerp(
            group.rotation.y,
            targetRotY + _sharedMouseX * 0.25,
            0.06
          );
          group.rotation.x = THREE.MathUtils.lerp(
            group.rotation.x,
            targetRotX + _sharedMouseY * 0.15,
            0.06
          );
        } else {
          group.rotation.y += 0.003 + dragVelocity.x;
          group.rotation.x = THREE.MathUtils.lerp(group.rotation.x, _sharedMouseY * 0.3, 0.05);
          dragVelocity.x *= 0.95;
          dragVelocity.y *= 0.95;
        }
      }

      // Orbiting rings & dust points
      ring1.rotation.z = elapsedTime * 0.08;
      ring2.rotation.z = -elapsedTime * 0.12;
      dustPoints.rotation.y = elapsedTime * 0.15;

      // Pulsing Halos & Beacons
      haloMeshes.forEach(({ hubName, mesh }, i) => {
        const isTarget = currentActiveName && hubName.toLowerCase() === currentActiveName.toLowerCase();
        const baseScale = isTarget ? 1.8 : 1.0;
        const s = baseScale + Math.sin(elapsedTime * 5 + i) * (isTarget ? 0.35 : 0.15);
        mesh.scale.set(s, s, s);
      });

      beaconMeshes.forEach(({ hubName, mesh }) => {
        const isTarget = currentActiveName && hubName.toLowerCase() === currentActiveName.toLowerCase();
        const targetOpacity = isTarget ? 0.9 : 0.2;
        (mesh.material as THREE.MeshBasicMaterial).opacity = THREE.MathUtils.lerp(
          (mesh.material as THREE.MeshBasicMaterial).opacity,
          targetOpacity,
          0.1
        );
        mesh.scale.y = isTarget ? 1.5 + Math.sin(elapsedTime * 4) * 0.2 : 1.0;
      });

      // Flight Arc Animations & Moving Pulse Particles
      arcMeshes.forEach(({ destName, line, pulseParticle }, i) => {
        const isTarget = currentActiveName && destName.toLowerCase() === currentActiveName.toLowerCase();
        const mat = line.material as THREE.LineBasicMaterial;
        mat.opacity = isTarget ? 0.95 : 0.25;

        // Move pulse particle along bezier trajectory curve
        const nepalH = DESTINATION_HUBS.find((h) => h.name === "Nepal");
        const destH = DESTINATION_HUBS.find((h) => h.name === destName);
        if (nepalH && destH) {
          const p0 = latLngToVector3(nepalH.lat, nepalH.lng, globeRadius * 1.02);
          const p1 = latLngToVector3(destH.lat, destH.lng, globeRadius * 1.02);
          const pMid = p0.clone().add(p1).multiplyScalar(0.5);
          pMid.normalize().multiplyScalar(globeRadius + p0.distanceTo(p1) * 0.35);

          const curve = new THREE.QuadraticBezierCurve3(p0, pMid, p1);
          const progress = ((elapsedTime * 0.4 + i * 0.2) % 1);
          const pointOnCurve = curve.getPoint(progress);
          pulseParticle.position.copy(pointOnCurve);
          pulseParticle.scale.setScalar(isTarget ? 1.4 : 0.8);
        }
      });

      renderer.render(scene, camera);
    };
    animate();

    return () => {
      _mouseListenerCount--;
      if (_mouseListenerCount === 0) {
        window.removeEventListener("mousemove", _handleSharedMouse);
      }

      domElem.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);

      domElem.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onTouchEnd);

      visibilityObserver.disconnect();
      resizeObserver.disconnect();
      cancelAnimationFrame(animId);

      if (container && renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }

      // Dispose geometries, materials & texture
      mapTexture.dispose();
      coreGeo.dispose();
      coreMat.dispose();
      atmosGeo.dispose();
      atmosMat.dispose();
      wireMat.dispose();
      pinGeo.dispose();
      pinMat.dispose();
      subPinGeo.dispose();
      subPinMat.dispose();
      haloGeo.dispose();
      haloMat.dispose();
      beaconGeo.dispose();
      beaconMat.dispose();
      ringGeo.dispose();
      ringMat.dispose();
      particleGeo.dispose();
      particleMat.dispose();

      renderer.dispose();
    };
  }, [mode]);

  const cls =
    mode === "absolute" || mode === "hero"
      ? "absolute inset-0 h-full w-full pointer-events-[auto]"
      : "relative h-full w-full pointer-events-[auto]";

  return <div ref={containerRef} className={cls} />;
}

