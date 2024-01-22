import AddressForm from "@/components/AddressForm";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function Home() {
  return (
    <main className=" min-h-screen ">
      <Card>
        <CardHeader>
          <CardTitle>Egenerklæring for selvbygger</CardTitle>
          <CardDescription>
            SAK10 kapittel 12 og § 6-8 <br />
            Erklæringen leveres til ansvarlig søker etter at selvbyggeren er
            ferdig med sine arbeider
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Card>
            <CardHeader>
              <CardTitle>Erklæringen gjelder</CardTitle>
              <CardDescription>Eiendom/ byggested</CardDescription>
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
    </main>
  );
}
