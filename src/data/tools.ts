import {
  Brush,
  Connection,
  Grid,
  Key,
  Link,
  Lock,
  Operation,
  Picture,
  Timer,
} from "@element-plus/icons-vue";
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
    id: "url",
    name: "URL 编码/解码",
    description: "URL 参数转义与解析",
    icon: Link,
    path: "/tools/url",
    color: "#409eff",
  },
  {
    id: "hash",
    name: "Hash 哈希计算",
    description: "计算 MD5/SHA 摘要",
    icon: Lock,
    path: "/tools/hash",
    color: "#F56C6C",
  },
  {
    id: "color",
    name: "颜色格式转换",
    description: "Hex / RGB / HSL 互转",
    icon: Brush,
    path: "/tools/color",
    color: "#E6A23C",
  },
  {
    id: "qr",
    name: "二维码生成器",
    description: "自定义文本/链接转二维码图片",
    icon: Grid,
    path: "/tools/qrcode",
    color: "#909399",
  },
  {
    id: "timestamp",
    name: "Unix 时间戳转换",
    description: "当前时间戳获取及与日期互转",
    icon: Timer,
    path: "/tools/timestamp",
    color: "#F56C6C",
  },
  {
    id: "uuid",
    name: "UUID/密码生成",
    description: "批量生成随机 UUID 或强密码",
    icon: Key,
    path: "/tools/uuid",
    color: "#67C23A",
  },
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
