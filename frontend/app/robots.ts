import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
return {
rules: [
{
userAgent: "*",
allow: "/",
},
],
sitemap: "https://www.psquareenterprises.co.in/sitemap.xml",
};
}
