import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
return {
name: "P Square Enterprises",
short_name: "P Square",
description:
"P Square Enterprises is a manufacturer of cotton knitted gloves and supplier of PPE safety products in India.",
start_url: "/",
display: "standalone",
background_color: "#ffffff",
theme_color: "#ffffff",
orientation: "portrait",
icons: [
{
src: "/icon-192.png",
sizes: "192x192",
type: "image/png",
},
{
src: "/icon-512.png",
sizes: "512x512",
type: "image/png",
},
{
src: "/icon-512.png",
sizes: "512x512",
type: "image/png",
purpose: "maskable",
},
],
};
}
