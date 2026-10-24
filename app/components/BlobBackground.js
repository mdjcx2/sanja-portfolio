"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { useBlobPreset } from "./BlobPresetContext";

const DARK_PAGES = [
  "/portfolio",
  "/about",
  "/contact",
  "/publications",
  "/exhibitions",
  "/projects/movingimage",
  "/map",
  "/design-system",
  "/demo/folder",
];

// Pages whose sub-pages are case studies (light/dark case template, no blob).
const INDEX_ONLY = new Set(["/exhibitions"]);

// Per-page blob config all positioned right side (positive px)
const PAGE_CONFIGS = {
  "/portfolio":           { px: 4.2, py:  0.8, scale: 3.0, camZ: 4.8, freq: 10.0, amp: 0.11, speed: 0.05, fresnel: 1.6 },
  "/about":               { px: 4.8, py: -0.4, scale: 2.6, camZ: 5.2, freq: 10.0, amp: 0.05, speed: 0.13, fresnel: 8.0 },
  "/contact":             { px: 5.0, py:  1.2, scale: 2.4, camZ: 5.5, freq: 10.0, amp: 0.11, speed: 0.05, fresnel: 1.6 },
  "/exhibitions":         { px: 4.2, py:  0.8, scale: 3.0, camZ: 4.8, freq: 10.0, amp: 0.11, speed: 0.05, fresnel: 1.6 },
  "/publications":        { px: 4.6, py:  0.3, scale: 2.8, camZ: 5.0, freq: 10.0, amp: 0.07, speed: 0.08, fresnel: 5.0 },
  "/projects/movingimage":{ px: 4.0, py:  0.2, scale: 3.2, camZ: 4.5, freq: 10.0, amp: 0.11, speed: 0.05, fresnel: 3.4 },
  "/map":                 { px: 4.5, py:  0.0, scale: 2.8, camZ: 5.0, freq: 10.0, amp: 0.11, speed: 0.05, fresnel: 1.6 },
  "/design-system":       { px: 4.2, py:  0.5, scale: 2.8, camZ: 5.0, freq: 10.0, amp: 0.11, speed: 0.05, fresnel: 1.6 },
  "/demo/folder":         { px: 4.2, py:  0.8, scale: 3.0, camZ: 4.8, freq: 10.0, amp: 0.11, speed: 0.05, fresnel: 1.6 }, // same as /portfolio
  "/work/video-player":  { px: 4.5, py:  0.0, scale: 2.8, camZ: 5.0, freq: 10.0, amp: 0.11, speed: 0.05, fresnel: 1.6 },
};

const DEFAULT_CONFIG = { px: 4.5, py: 0.0, scale: 2.8, camZ: 5.0, freq: 10.0, amp: 0.11, speed: 0.05, fresnel: 1.6 };

// Scroll-based waypoints for /work/video-player (progress 0→1 maps across states)
const VP_SCROLL_STATES = [
  { px: 4.8, py:  0.8, scale: 3.2, camZ: 4.8, freq: 10.0, amp: 0.11, speed: 0.05, fresnel: 1.6 },
  { px: 3.8, py:  0.2, scale: 2.8, camZ: 5.0, freq: 10.0, amp: 0.09, speed: 0.06, fresnel: 2.8 },
  { px: 4.6, py: -0.6, scale: 2.4, camZ: 5.2, freq: 10.0, amp: 0.07, speed: 0.08, fresnel: 5.0 },
  { px: 5.2, py:  0.4, scale: 3.0, camZ: 4.6, freq: 10.0, amp: 0.12, speed: 0.05, fresnel: 1.8 },
];

const easeSS = (t) => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
const blendSS = (A, B, t) => ({
  px:      A.px      + (B.px      - A.px)      * t,
  py:      A.py      + (B.py      - A.py)      * t,
  scale:   A.scale   + (B.scale   - A.scale)   * t,
  camZ:    A.camZ    + (B.camZ    - A.camZ)    * t,
  freq:    A.freq    + (B.freq    - A.freq)    * t,
  amp:     A.amp     + (B.amp     - A.amp)     * t,
  speed:   A.speed   + (B.speed   - A.speed)   * t,
  fresnel: A.fresnel + (B.fresnel - A.fresnel) * t,
});

const CRYSTAL = {
  freq: 10.0, amp: 0.11, speed: 0.05, fresnel: 1.6,
  colorA: [0.00, 0.00, 0.00],
  colorB: [0.00, 0.00, 0.00],
  colorC: [0.16, 0.16, 0.16],
};

const VERTEX = /* glsl */`
  uniform float uTime;
  uniform float uFreq;
  uniform float uAmp;
  uniform float uSpeed;
  uniform vec2  uMouse;
  varying vec3  vNormal;
  varying vec3  vWorldPos;
  varying float vDisplace;

  vec3 mod289(vec3 x){ return x-floor(x*(1./289.))*289.; }
  vec4 mod289(vec4 x){ return x-floor(x*(1./289.))*289.; }
  vec4 permute(vec4 x){ return mod289(((x*34.)+1.)*x); }
  vec4 taylorInvSqrt(vec4 r){ return 1.79284291400159-0.85373472095314*r; }
  float snoise(vec3 v){
    const vec2 C=vec2(1./6.,1./3.);
    const vec4 D=vec4(0.,.5,1.,2.);
    vec3 i=floor(v+dot(v,C.yyy));
    vec3 x0=v-i+dot(i,C.xxx);
    vec3 g=step(x0.yzx,x0.xyz);
    vec3 l=1.-g;
    vec3 i1=min(g.xyz,l.zxy);
    vec3 i2=max(g.xyz,l.zxy);
    vec3 x1=x0-i1+C.xxx;
    vec3 x2=x0-i2+C.yyy;
    vec3 x3=x0-D.yyy;
    i=mod289(i);
    vec4 p=permute(permute(permute(i.z+vec4(0.,i1.z,i2.z,1.))+i.y+vec4(0.,i1.y,i2.y,1.))+i.x+vec4(0.,i1.x,i2.x,1.));
    float n_=.142857142857;
    vec3 ns=n_*D.wyz-D.xzx;
    vec4 j=p-49.*floor(p*ns.z*ns.z);
    vec4 x_=floor(j*ns.z);
    vec4 y_=floor(j-7.*x_);
    vec4 x=x_*ns.x+ns.yyyy;
    vec4 y=y_*ns.x+ns.yyyy;
    vec4 h=1.-abs(x)-abs(y);
    vec4 b0=vec4(x.xy,y.xy);
    vec4 b1=vec4(x.zw,y.zw);
    vec4 s0=floor(b0)*2.+1.;
    vec4 s1=floor(b1)*2.+1.;
    vec4 sh=-step(h,vec4(0.));
    vec4 a0=b0.xzyw+s0.xzyw*sh.xxyy;
    vec4 a1=b1.xzyw+s1.xzyw*sh.zzww;
    vec3 p0=vec3(a0.xy,h.x);
    vec3 p1=vec3(a0.zw,h.y);
    vec3 p2=vec3(a1.xy,h.z);
    vec3 p3=vec3(a1.zw,h.w);
    vec4 norm=taylorInvSqrt(vec4(dot(p0,p0),dot(p1,p1),dot(p2,p2),dot(p3,p3)));
    p0*=norm.x;p1*=norm.y;p2*=norm.z;p3*=norm.w;
    vec4 m=max(.6-vec4(dot(x0,x0),dot(x1,x1),dot(x2,x2),dot(x3,x3)),0.);
    m=m*m;
    return 42.*dot(m*m,vec4(dot(p0,x0),dot(p1,x1),dot(p2,x2),dot(p3,x3)));
  }

  void main(){
    vNormal = normalize(normalMatrix * normal);
    float t  = uTime * uSpeed;
    vec3  pos = position;
    float n1 = snoise(pos * uFreq         + vec3(t*.6,  t*.4,  t*.3));
    float n2 = snoise(pos * uFreq * 2.2   + vec3(-t*.4, t*.5, -t*.2) + vec3(uMouse*.35, 0.));
    float n3 = snoise(pos * uFreq * 4.8   + vec3(t*.7, -t*.3,  t*.5));
    float d  = n1*uAmp + n2*(uAmp*.5) + n3*(uAmp*.2);
    d += length(uMouse) * n2 * (uAmp*.3);
    vDisplace = d;
    pos      += normal * d;
    vWorldPos = (modelMatrix * vec4(pos, 1.)).xyz;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.);
  }
`;

const FRAGMENT = /* glsl */`
  uniform float uTime;
  uniform float uFresnelPow;
  uniform vec3  uColorA;
  uniform vec3  uColorB;
  uniform vec3  uColorC;
  varying vec3  vNormal;
  varying vec3  vWorldPos;
  varying float vDisplace;

  void main(){
    vec3  viewDir = normalize(cameraPosition - vWorldPos);
    float fresnel = pow(1. - max(dot(vNormal, viewDir), 0.), uFresnelPow);
    float t       = clamp(vDisplace*.5+.5, 0., 1.);
    float pulse   = sin(uTime*.2)*.5+.5;
    vec3  col     = mix(uColorA, uColorB, t);
    col            = mix(col, uColorC, fresnel*.55);
    col           *= 1. + fresnel * pulse * .08;
    float alpha   = clamp(fresnel*.95 + t*.07, 0., 1.);
    gl_FragColor  = vec4(col, alpha);
  }
`;

export default function BlobBackground() {
  const pathname = usePathname();
  const mountRef = useRef(null);
  const materialRef = useRef(null);
  const { preset } = useBlobPreset();
  const active = DARK_PAGES.some(p => pathname === p || (pathname.startsWith(p + "/") && !INDEX_ONLY.has(p)));

  useEffect(() => {
    if (!active) return;

    const cfg = PAGE_CONFIGS[pathname] ?? DEFAULT_CONFIG;

    let animId;
    let cancelled = false;
    const mouse = { x: 0, y: 0, tx: 0, ty: 0 };
    let w = window.innerWidth, h = window.innerHeight;

    const useScrollStates = pathname === "/work/video-player";
    const scrollRef = { current: 0 };
    const cur = { ...cfg };

    const onScroll = useScrollStates ? () => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      scrollRef.current = maxScroll > 0 ? window.scrollY / maxScroll : 0;
    } : null;
    if (onScroll) window.addEventListener("scroll", onScroll, { passive: true });

    import("three").then((THREE) => {
      if (cancelled || !mountRef.current) return;

      const scene = new THREE.Scene();
      scene.background = new THREE.Color(0x020408);
      const camera = new THREE.PerspectiveCamera(55, w / h, 0.1, 100);
      camera.position.z = cfg.camZ;

      const renderer = new THREE.WebGLRenderer({ antialias: true });
      renderer.setSize(w, h);
      renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
      mountRef.current.appendChild(renderer.domElement);

      const geometry = new THREE.IcosahedronGeometry(1.8, 80);
      const material = new THREE.ShaderMaterial({
        vertexShader: VERTEX,
        fragmentShader: FRAGMENT,
        uniforms: {
          uTime:       { value: 0 },
          uMouse:      { value: new THREE.Vector2(0, 0) },
          uFreq:       { value: cfg.freq },
          uAmp:        { value: cfg.amp },
          uSpeed:      { value: cfg.speed },
          uFresnelPow: { value: cfg.fresnel },
          uColorA:     { value: new THREE.Color(...preset.colorA) },
          uColorB:     { value: new THREE.Color(...preset.colorB) },
          uColorC:     { value: new THREE.Color(...preset.colorC) },
        },
        transparent: true,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      });
      materialRef.current = material;

      const wireMat  = new THREE.MeshBasicMaterial({ color: 0x001830, wireframe: true, transparent: true, opacity: 0.07 });
      const mesh     = new THREE.Mesh(geometry, material);
      const wireMesh = new THREE.Mesh(new THREE.IcosahedronGeometry(1.82, 14), wireMat);
      scene.add(mesh);
      scene.add(wireMesh);

      const onMove = (e) => {
        mouse.tx =  (e.clientX / w - 0.5) * 2;
        mouse.ty = -(e.clientY / h - 0.5) * 2;
      };
      const onResize = () => {
        w = innerWidth; h = innerHeight;
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        renderer.setSize(w, h);
      };
      window.addEventListener("mousemove", onMove);
      window.addEventListener("resize", onResize);

      const clock = new THREE.Clock();

      const tick = () => {
        if (cancelled) return;
        animId = requestAnimationFrame(tick);
        const elapsed = clock.getElapsedTime();

        mouse.x += (mouse.tx - mouse.x) * 0.04;
        mouse.y += (mouse.ty - mouse.y) * 0.04;

        if (useScrollStates) {
          const states = VP_SCROLL_STATES;
          const progress = scrollRef.current * (states.length - 1);
          const si = Math.min(Math.floor(progress), states.length - 2);
          const t = easeSS(progress - si);
          const tgt = blendSS(states[si], states[si + 1], t);
          const K = 0.05;
          cur.px      += (tgt.px      - cur.px)      * K;
          cur.py      += (tgt.py      - cur.py)      * K;
          cur.scale   += (tgt.scale   - cur.scale)   * K;
          cur.freq    += (tgt.freq    - cur.freq)     * K;
          cur.amp     += (tgt.amp     - cur.amp)      * K;
          cur.speed   += (tgt.speed   - cur.speed)    * K;
          cur.fresnel += (tgt.fresnel - cur.fresnel)  * K;
          material.uniforms.uFreq.value       = cur.freq;
          material.uniforms.uAmp.value        = cur.amp;
          material.uniforms.uSpeed.value      = cur.speed;
          material.uniforms.uFresnelPow.value = cur.fresnel;
        }

        const activeCfg = useScrollStates ? cur : cfg;
        mesh.position.set(
          activeCfg.px + mouse.x * 0.15,
          activeCfg.py + mouse.y * 0.10,
          0
        );
        mesh.scale.setScalar(activeCfg.scale);
        mesh.rotation.y = elapsed * 0.04 + mouse.x * 0.10;
        mesh.rotation.x = mouse.y * 0.07;
        wireMesh.position.copy(mesh.position);
        wireMesh.scale.copy(mesh.scale);
        wireMesh.rotation.copy(mesh.rotation);

        material.uniforms.uTime.value = elapsed;
        material.uniforms.uMouse.value.set(mouse.x, mouse.y);

        renderer.render(scene, camera);
      };

      tick();

      const domEl = renderer.domElement;
      mountRef._cleanup = () => {
        cancelAnimationFrame(animId);
        window.removeEventListener("mousemove", onMove);
        window.removeEventListener("resize", onResize);
        if (onScroll) window.removeEventListener("scroll", onScroll);
        if (mountRef.current && domEl.parentNode === mountRef.current) {
          mountRef.current.removeChild(domEl);
        }
        renderer.dispose();
        geometry.dispose();
        material.dispose();
        wireMat.dispose();
        materialRef.current = null;
      };
    });

    return () => {
      cancelled = true;
      cancelAnimationFrame(animId);
      if (mountRef._cleanup) mountRef._cleanup();
    };
  }, [pathname]);

  // Update blob colors (and noise) when preset changes no scene rebuild
  useEffect(() => {
    const m = materialRef.current;
    if (!m) return;
    const { colorA, colorB, colorC, freq, amp, speed, fresnel } = preset;
    m.uniforms.uColorA.value.setRGB(...colorA);
    m.uniforms.uColorB.value.setRGB(...colorB);
    m.uniforms.uColorC.value.setRGB(...colorC);
    m.uniforms.uFreq.value = freq;
    m.uniforms.uAmp.value = amp;
    m.uniforms.uSpeed.value = speed;
    m.uniforms.uFresnelPow.value = fresnel;
  }, [preset]);

  if (!active) return null;

  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none", background: "#020408" }}>
      <div ref={mountRef} style={{ position: "absolute", inset: 0 }} />
    </div>
  );
}
