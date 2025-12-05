import { LucideIcon } from "lucide-react";

export interface Pillar {
  id: number;
  title: string;
  subtitle: string;
  hours: string;
  description: string;
  icon: LucideIcon;
  features: string[];
  isBonus?: boolean;
  image: string;
}

export interface ChartData {
  name: string;
  value: number;
  fill: string;
  [key: string]: any;
}

export interface WinConditionItem {
  id: number;
  text: string;
  checked: boolean;
}

export interface PaymentPhase {
  id: number;
  percent: string;
  value: string;
  title: string;
  description: string;
  trigger: string;
  icon: LucideIcon;
  psychology: string;
}