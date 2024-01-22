import AddressForm from "@/components/AddressForm";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import { Suspense } from "react";

export default function Home() {
  return (
    <main className=" min-h-screen ">
      <Suspense fallback={<p>Loading...</p>}>
        <Card>
          <CardHeader>
            <CardTitle>
              <Image
                src="/Arkitektbedriftene logo positiv skjerm.png"
                width="300"
                height="31"
                alt="Arkitektbedriftene logo"
                priority
              />
            </CardTitle>
            <CardDescription>
              Digitalt skjema for egenerklæring for selvbygger
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Card>
              <CardHeader>
                <CardTitle>Egenerklæring for selvbygger</CardTitle>
                <CardDescription>
                  SAK10 kapittel 12 og § 6-8 <br />
                  Erklæringen leveres til ansvarlig søker etter at selvbyggeren
                  er ferdig med sine arbeider
                </CardDescription>
              </CardHeader>
              <CardContent>
                <AddressForm />
              </CardContent>
            </Card>
          </CardContent>
          <CardFooter>
            <p>
              Blankett 5187 Bokmål © Utgitt av Direktoratet for byggkvalitet
              01.08.2012
            </p>
          </CardFooter>
        </Card>
      </Suspense>
    </main>
  );
}
