import { Connection, Operation, Picture } from "@element-plus/icons-vue";
import type { Component } from "vue";

export interface Tool {
  id: string;
  name: string;
  description: string;
  icon: Component;
  path: string;
  color?: string;
}

export const tools: Tool[] = [
  {
    id: "base64",
    name: "Base64 编解码",
    description: "快速进行 Base64 编码和解码操作",
    icon: Connection,
    path: "/tools/base64",
    color: "#409eff",
  },
  {
    id: "json-format",
    name: "JSON 格式化",
    description: "JSON 数据美化与校验",
    icon: Operation,
    path: "/tools/json",
    color: "#E6A23C",
  },
  {
    id: "image-editor",
    name: "图片处理",
    description: "图片剪裁、压缩与格式转换",
    icon: Picture,
    path: "/tools/image",
    color: "#67C23A",
  },
];
