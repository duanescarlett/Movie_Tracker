import { prisma } from "@/lib/prisma";
import Image from "next/image";

export default async function Home() {
  // createUser();
  const user = await prisma.user.findFirst({
    where: {
      email: "duanescarlett@gmail.com",
    },
  });
  console.log({ user });

  return (
    <div>
      <h1 className="textStyleBold">Home</h1>
      <Image
        src="/vercel.svg"
        alt="Vercel Logo"
        width={72}
        height={16}
      />
      <p>Hello, {user?.username}</p>
    </div>
  );
}
