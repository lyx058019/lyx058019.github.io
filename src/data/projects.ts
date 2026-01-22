export interface Project {
  title: string;
  description: string;
  tech: string[];
  link?: string;
  repo?: string;
  image?: string;
  isFeatured?: boolean;
}

export const projectList: Project[] = [
  {
    title: "个人主页项目",
    description: "采用 Vue 3 + Element Plus 构建的响应式个人门户系统。",
    tech: ["Web", "Vue 3", "TypeScript"],
    link: "#",
    image: "https://placehold.co/600x400/409eff/ffffff?text=Portfolio",
    isFeatured: true,
  },
  {
    title: "自动化部署工具",
    description: "基于 GitHub Actions 的持续集成与自动化发布方案。",
    tech: ["DevOps", "CI/CD"],
    link: "#",
    image: "https://placehold.co/600x400/67c23a/ffffff?text=DevOps",
    isFeatured: true,
  },
  {
    title: "项目 A (示例)",
    description: "一个高性能的 Web 应用。",
    tech: ["Vue 3", "TypeScript", "Sass"],
    image: "https://via.placeholder.com/400x200",
    isFeatured: false,
  },
  {
    title: "项目 B (示例)",
    description: "基于 Node.js 的后端服务。",
    tech: ["Node.js", "Express", "MongoDB"],
    image: "https://via.placeholder.com/400x200",
    isFeatured: false,
  },
];
