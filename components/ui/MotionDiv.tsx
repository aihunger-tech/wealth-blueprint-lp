"use client";

import { motion, HTMLMotionProps } from "framer-motion";
import React from "react";

export default function MotionDiv(props: HTMLMotionProps<"div">) {
  return <motion.div {...props} />;
}