"use client";

import { useEffect, useRef, useState } from "react";
import { siteConfig } from "../../data/siteConfig.js";

const CRYSTAL = {
  freq: 5.0, amp: 0.11, speed: 0.05, fresnel: 1.6,
  colorA: [0.00, 0.04, 0.14],
  colorB: [0.75, 0.92, 1.00],
  colorC: [0.50, 0.78, 1.00],
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

// onDone is called when the loader has fully faded out
export default function CrystalLoader({ onDone }) {
  const mountRef   = useRef(null);
  const overlayRef = useRef(null);
  const wrapRef    = useRef(null);

  // Phase 1: dark overlay fades at 1.8s
  // Phase 2: whole loader fades at 2.6s, onDone fires at 3.0s
  useEffect(() => {
    const t1 = setTimeout(() => {
      if (overlayRef.current) {
        overlayRef.current.style.transition = "opacity 0.9s cubic-bezier(0.4,0,0.2,1)";
        overlayRef.current.style.opacity = "0";
      }
    }, 1800);

    const t2 = setTimeout(() => {
      if (wrapRef.current) {
        wrapRef.current.style.transition = "opacity 0.6s ease";
        wrapRef.current.style.opacity = "0";
      }
    }, 2600);

    const t3 = setTimeout(() => {
      onDone?.();
    }, 3200);

    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, [onDone]);

  // Three.js
  useEffect(() => {
    let animId;
    let cancelled = false;
    const mouse = { x: 0, y: 0, tx: 0, ty: 0 };
    let w = window.innerWidth, h = window.innerHeight;

    import("three").then((THREE) => {
      if (cancelled || !mountRef.current) return;

      const scene    = new THREE.Scene();
      scene.background = new THREE.Color(0x020408);
      const camera   = new THREE.PerspectiveCamera(55, w / h, 0.1, 100);
      camera.position.z = 5.0;

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
          uFreq:       { value: CRYSTAL.freq },
          uAmp:        { value: CRYSTAL.amp },
          uSpeed:      { value: CRYSTAL.speed },
          uFresnelPow: { value: CRYSTAL.fresnel },
          uColorA:     { value: new THREE.Color(...CRYSTAL.colorA) },
          uColorB:     { value: new THREE.Color(...CRYSTAL.colorB) },
          uColorC:     { value: new THREE.Color(...CRYSTAL.colorC) },
        },
        transparent: true,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      });

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
      window.addEventListener("resize",    onResize);

      const clock = new THREE.Clock();

      const tick = () => {
        if (cancelled) return;
        animId = requestAnimationFrame(tick);
        const elapsed = clock.getElapsedTime();

        mouse.x += (mouse.tx - mouse.x) * 0.04;
        mouse.y += (mouse.ty - mouse.y) * 0.04;

        mesh.rotation.y = elapsed * 0.04 + mouse.x * 0.10;
        mesh.rotation.x = mouse.y * 0.07;
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
        window.removeEventListener("resize",    onResize);
        if (mountRef.current && domEl.parentNode === mountRef.current) {
          mountRef.current.removeChild(domEl);
        }
        renderer.dispose();
        geometry.dispose();
        material.dispose();
        wireMat.dispose();
      };
    });

    return () => {
      cancelled = true;
      cancelAnimationFrame(animId);
      if (mountRef._cleanup) mountRef._cleanup();
    };
  }, []);

  return (
    <div ref={wrapRef} style={{ position: "fixed", inset: 0, zIndex: 1000 }}>
      {/* Blob canvas */}
      <div ref={mountRef} style={{ position: "absolute", inset: 0 }} />

      {/* Dither overlay */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none", zIndex: 1,
        backgroundImage: "radial-gradient(circle, #0d1b2a 32%, transparent 32%)",
        backgroundSize: "4px 4px",
        mixBlendMode: "hard-light",
        opacity: 0.7,
      }} />

      {/* Text overlay, no background, blob shows through */}
      <style>{`
        @keyframes cl-shimmer {
          from { background-position: -200% center; }
          to   { background-position:  200% center; }
        }
        .cl-shimmer-title {
          background: linear-gradient(90deg,
            rgba(255,255,255,0.25) 20%,
            rgba(255,255,255,0.95) 50%,
            rgba(255,255,255,0.25) 80%
          );
          background-size: 200% auto;
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          animation: cl-shimmer 2s linear infinite;
        }
        .cl-shimmer-label {
          background: linear-gradient(90deg,
            rgba(0,210,255,0.15) 20%,
            rgba(0,210,255,0.7)  50%,
            rgba(0,210,255,0.15) 80%
          );
          background-size: 200% auto;
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          animation: cl-shimmer 2s linear infinite;
          animation-delay: 0.3s;
        }
      `}</style>

      <div ref={overlayRef} style={{
        position: "absolute", inset: 0,
        display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center", gap: 18,
        pointerEvents: "none",
        zIndex: 2,
      }}>
        <span className="cl-shimmer-title" style={{
          fontFamily: "var(--font-syne), sans-serif",
          fontSize: "1.15rem", fontWeight: 500, letterSpacing: "-0.01em",
        }}>
          {siteConfig.wordmark}
        </span>
        <span className="cl-shimmer-label" style={{
          fontFamily: "var(--font-syne), sans-serif", fontSize: "0.4375rem",
          letterSpacing: "0.22em", textTransform: "uppercase",
        }}>
          Loading
        </span>
      </div>
    </div>
  );
}
