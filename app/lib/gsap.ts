"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

// The only place GSAP is imported from. Reaching for "gsap/ScrollTrigger" directly
// works right up until this module happens not to be loaded first — eslint blocks it.
export { gsap, ScrollTrigger, useGSAP };
