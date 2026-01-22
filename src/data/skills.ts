import { Cpu, Monitor } from "@element-plus/icons-vue";
import type { Component } from "vue";

export interface Skill {
  name: string;
  icon: Component;
  progress: number;
  color: string;
}

export const skills: Skill[] = [
  { name: "Vue 3", icon: Cpu, progress: 90, color: "#42b883" },
  { name: "TypeScript", icon: Monitor, progress: 85, color: "#3178c6" },
  { name: "Element Plus", icon: Monitor, progress: 88, color: "#409eff" },
  { name: "Vite & Webpack", icon: Cpu, progress: 80, color: "#646cff" },
];
