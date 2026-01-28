import { Button } from "@/components/ui/button";
import { getStrapiData } from "@/lib/strapi";

export default async function Home() {
  const strapidata = await getStrapiData("/api/home-page");

  if (!strapidata) {
    return <p>Failed to load data</p>;
  }

  const { title, description } = strapidata.data;

  return (
    <main className="container mx-auto py-6">
      <h1 className="text-5xl font-bold">{title}</h1>
      <p className="text-xl mt-4">{description}</p>

      <div className="flex justify-center mt-6">
        <Button>Click me</Button>
      </div>
    </main>
  );
}
