"use client";

import useDebounce from "@/lib/hooks/useDebounce";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useFormContext } from "react-hook-form";
import { KartverketResponse } from "./AddressForm";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Input } from "./ui/input";
import { Table, TableBody, TableCell, TableRow } from "./ui/table";

const addressSearch = async (
  address: string,
  signal: AbortController["signal"]
) => {
  const response = await fetch(
    `https://ws.geonorge.no/adresser/v1/sok?sok=${encodeURIComponent(
      address
    )}&fuzzy=true&utkoordsys=4258&treffPerSide=10&side=0&asciiKompatibel=true`,
    {
      signal,
    }
  );
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};

const AddressSearch = ({ callback }: { callback: () => void }) => {
  const methods = useFormContext();
  const [search, setSearch] = useState("");
  const debouncedAddress = useDebounce<string>(search, 500);
  console.log("debounce", debouncedAddress);

  const { data, isLoading } = useQuery<KartverketResponse>({
    queryKey: ["address", debouncedAddress],
    queryFn: async ({ signal }) => addressSearch(debouncedAddress, signal),
    enabled: !!debouncedAddress,
  });

  const handleSearchSelect = (
    address: KartverketResponse["adresser"][number]
  ) => {
    methods.setValue("bruksnummer", address.bruksnummer);
    methods.setValue("gardsnummer", address.gardsnummer);
    methods.setValue("kommunenavn", address.kommunenavn);
    methods.setValue("festenummer", address.festenummer);
    methods.setValue("postnummer", address.postnummer);
    methods.setValue("poststed", address.poststed);

    methods.setValue("adresse", address.adressenavn);
    methods.setValue("nummer", address.nummer);

    callback();
  };
  return (
    <>
      <Input
        placeholder="Søk..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="mb-4"
      />

      {isLoading && (
        <Card>
          <CardHeader>
            <CardTitle>Søker etter adresser</CardTitle>
          </CardHeader>

          <CardContent>
            <p>Laster...</p>
          </CardContent>
        </Card>
      )}

      {!data && !isLoading && (
        <Card>
          <CardHeader>
            <CardTitle>Ingen treff</CardTitle>
          </CardHeader>

          <CardContent>
            <p>Søk i feltet over for å finne adresser</p>
          </CardContent>
        </Card>
      )}

      {data && (
        <div className="flex flex-col gap-4 my-4">
          {data.adresser.map((address, i) => (
            <Card key={address.adressenavn + i}>
              <CardHeader>
                <CardTitle>
                  {address.adressenavn} {address.nummer} {address.bokstav}
                </CardTitle>
                <CardDescription>
                  {address.postnummer}, {address.poststed}
                </CardDescription>
              </CardHeader>

              <CardContent>
                <Table>
                  <TableBody>
                    <TableRow>
                      <TableCell>Bruksnummer</TableCell>
                      <TableCell>{address.bruksnummer}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Gårdsnummer</TableCell>
                      <TableCell>{address.gardsnummer}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Kommune</TableCell>
                      <TableCell>{address.kommunenavn}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Festenummer</TableCell>
                      <TableCell>{address.festenummer}</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>

              <CardFooter className="flex-col gap-2">
                <Button onClick={() => handleSearchSelect(address)}>
                  Velg
                </Button>
                <p className="text-muted-foreground text-xs italic">
                  Oppdatert: {address.oppdateringsdato}
                </p>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </>
  );
};

export default AddressSearch;
