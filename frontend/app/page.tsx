import { Button } from "@/components/ui/button"

async function getStrapiData(path: string){
  const baseUrl ="http://localhost:1337";
  try{
    const response=await fetch(baseUrl + path);
    const data=await response.json();
    return data;
  }
  catch(error){
    console.error(error);
  }
  }

export default async function Home() {
  const strapidata=await getStrapiData("/api/home-page");
  const {title,description} = strapidata.data;
  return (
    <main className="container mx-auto py-6">
      <h1 className="text-5xl font-bold">{title}</h1>
      <h1 className="text-5xl font-bold">{description}</h1>
      <div className="flex justify-center">
        <Button>Click me</Button>
      </div>
    </main>
  )                              
}