import React from "react";
import { DifficultyLevel } from "@/types/study";
import { Badge } from "./Badge";

export function DifficultyBadge({ level }: { level: DifficultyLevel }) {
  switch (level) {
    case "Easy":
      return <Badge variant="emerald">Easy Level</Badge>;
    case "Medium":
      return <Badge variant="indigo">Medium Level</Badge>;
    case "Hard":
      return <Badge variant="amber">Hard Level</Badge>;
  }
}
