import { Title, useRouteData } from "solid-start";
import { createServerData$ } from "solid-start/server";
import Counter from "~/components/Counter";
import { Redis } from "ioredis";

export function routeData() {
  return createServerData$(async () => {
    console.log("routeData");
    const redis = new Redis("redis://192.168.1.98:6379");
    await redis.set("test", "solid");
    const val = await redis.get("test");
    return val;
  });
}

export default function Home() {
  const data = useRouteData();
  return (
    <main>
      <Title>Hello World</Title>
      <h1>{data}</h1>
      <Counter />
      <p>
        Visit{" "}
        <a href="https://start.solidjs.com" target="_blank">
          start.solidjs.com
        </a>{" "}
        to learn how to build SolidStart apps.
      </p>
    </main>
  );
}
