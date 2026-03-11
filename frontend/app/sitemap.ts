import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
return [
{
url: "https://www.psquareenterprises.co.in",
lastModified: new Date(),
changeFrequency: "weekly",
priority: 1,
},
{
url: "https://www.psquareenterprises.co.in/about",
lastModified: new Date(),
changeFrequency: "monthly",
priority: 0.8,
},
{
url: "https://www.psquareenterprises.co.in/products",
lastModified: new Date(),
changeFrequency: "weekly",
priority: 0.9,
},
{
url: "https://www.psquareenterprises.co.in/contact",
lastModified: new Date(),
changeFrequency: "yearly",
priority: 0.7,
},
];
}
