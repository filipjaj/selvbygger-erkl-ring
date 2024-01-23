"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import AddressSearch from "./AddressSearch";
import FormPreview from "./FormPreview";
import { Button } from "./ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { Separator } from "./ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";

const formSchema = z.object({
  kommunenssaksnummer: z.string(),
  prosjektnummer: z.string(),
  vedlegg: z.string(),
  adresse: z.string(),
  nummer: z.number(),
  postnummer: z.string(),
  poststed: z.string(),
  kommunenavn: z.string(),
  bygningsnummer: z.number(),
  gardsnummer: z.number(),
  bruksnummer: z.number(),
  festenummer: z.number(),
  seksjonsnummer: z.number(),
});

// {
//     "metadata": {
//         "asciiKompatibel": true,
//         "totaltAntallTreff": 4,
//         "viserTil": 10,
//         "sokeStreng": "sok=arendalsgata%2012&fuzzy=true&utkoordsys=4258&treffPerSide=10&side=0&asciiKompatibel=true",
//         "viserFra": 0,
//         "side": 0,
//         "treffPerSide": 10
//     },
//     "adresser": [
//         {
//             "adressenavn": "Arendalsgata",
//             "adressetekst": "Arendalsgata 12B",
//             "adressetilleggsnavn": null,
//             "adressekode": 10223,
//             "nummer": 12,
//             "bokstav": "B",
//             "kommunenummer": "0301",
//             "kommunenavn": "OSLO",
//             "gardsnummer": 221,
//             "bruksnummer": 10,
//             "festenummer": 0,
//             "undernummer": null,
//             "bruksenhetsnummer": [
//                 "H0101",
//                 "H0102",
//                 "H0201",
//                 "H0202",
//                 "H0203",
//                 "H0301",
//                 "H0302",
//                 "H0303",
//                 "H0401",
//                 "H0402",
//                 "H0403",
//                 "H0501",
//                 "H0502",
//                 "H0503",
//                 "H0601"
//             ],
//             "objtype": "Vegadresse",
//             "poststed": "OSLO",
//             "postnummer": "0463",
//             "adressetekstutenadressetilleggsnavn": "Arendalsgata 12B",
//             "stedfestingverifisert": false,
//             "representasjonspunkt": {
//                 "epsg": "EPSG:4258",
//                 "lat": 59.937933631707416,
//                 "lon": 10.75361288452653
//             },
//             "oppdateringsdato": "2020-06-15T18:02:02"
//         },
//         {
//             "adressenavn": "Arendalsgata",
//             "adressetekst": "Arendalsgata 14",
//             "adressetilleggsnavn": null,
//             "adressekode": 10223,
//             "nummer": 14,
//             "bokstav": "",
//             "kommunenummer": "0301",
//             "kommunenavn": "OSLO",
//             "gardsnummer": 221,
//             "bruksnummer": 12,
//             "festenummer": 0,
//             "undernummer": null,
//             "bruksenhetsnummer": [
//                 "H0101",
//                 "H0102",
//                 "H0103",
//                 "H0104",
//                 "H0105",
//                 "H0106",
//                 "H0107",
//                 "H0108",
//                 "H0109",
//                 "H0110",
//                 "H0201",
//                 "H0202",
//                 "H0203",
//                 "H0204",
//                 "H0205",
//                 "H0206",
//                 "H0207",
//                 "H0208",
//                 "H0209",
//                 "H0210",
//                 "H0211",
//                 "H0212",
//                 "H0213",
//                 "H0214",
//                 "H0215",
//                 "H0216",
//                 "H0217",
//                 "H0218",
//                 "H0219",
//                 "H0301",
//                 "H0302",
//                 "H0401",
//                 "H0402",
//                 "H0403",
//                 "H0404",
//                 "H0405",
//                 "H0406",
//                 "H0407",
//                 "H0408",
//                 "H0409",
//                 "H0410",
//                 "H0411",
//                 "H0412",
//                 "H0413",
//                 "H0414",
//                 "H0415",
//                 "H0416",
//                 "H0417",
//                 "H0418",
//                 "H0419",
//                 "H0501",
//                 "H0502"
//             ],
//             "objtype": "Vegadresse",
//             "poststed": "OSLO",
//             "postnummer": "0463",
//             "adressetekstutenadressetilleggsnavn": "Arendalsgata 14",
//             "stedfestingverifisert": true,
//             "representasjonspunkt": {
//                 "epsg": "EPSG:4258",
//                 "lat": 59.93789188847952,
//                 "lon": 10.754455511268898
//             },
//             "oppdateringsdato": "2020-06-15T18:02:02"
//         },
//         {
//             "adressenavn": "Arendalsgata",
//             "adressetekst": "Arendalsgata 12C",
//             "adressetilleggsnavn": null,
//             "adressekode": 10223,
//             "nummer": 12,
//             "bokstav": "C",
//             "kommunenummer": "0301",
//             "kommunenavn": "OSLO",
//             "gardsnummer": 221,
//             "bruksnummer": 10,
//             "festenummer": 0,
//             "undernummer": null,
//             "bruksenhetsnummer": [
//                 "H0101",
//                 "H0102",
//                 "H0201",
//                 "H0202",
//                 "H0203",
//                 "H0301",
//                 "H0302",
//                 "H0303",
//                 "H0401",
//                 "H0402",
//                 "H0403",
//                 "H0501",
//                 "H0502",
//                 "H0503"
//             ],
//             "objtype": "Vegadresse",
//             "poststed": "OSLO",
//             "postnummer": "0463",
//             "adressetekstutenadressetilleggsnavn": "Arendalsgata 12C",
//             "stedfestingverifisert": false,
//             "representasjonspunkt": {
//                 "epsg": "EPSG:4258",
//                 "lat": 59.93787526187366,
//                 "lon": 10.753949882327207
//             },
//             "oppdateringsdato": "2020-06-15T18:02:02"
//         },
//         {
//             "adressenavn": "Arendalsgata",
//             "adressetekst": "Arendalsgata 12A",
//             "adressetilleggsnavn": null,
//             "adressekode": 10223,
//             "nummer": 12,
//             "bokstav": "A",
//             "kommunenummer": "0301",
//             "kommunenavn": "OSLO",
//             "gardsnummer": 221,
//             "bruksnummer": 10,
//             "festenummer": 0,
//             "undernummer": null,
//             "bruksenhetsnummer": [
//                 "H0101",
//                 "H0102",
//                 "H0201",
//                 "H0202",
//                 "H0203",
//                 "H0301",
//                 "H0302",
//                 "H0303",
//                 "H0401",
//                 "H0402",
//                 "H0403",
//                 "H0501",
//                 "H0502",
//                 "H0503",
//                 "H0601"
//             ],
//             "objtype": "Vegadresse",
//             "poststed": "OSLO",
//             "postnummer": "0463",
//             "adressetekstutenadressetilleggsnavn": "Arendalsgata 12A",
//             "stedfestingverifisert": false,
//             "representasjonspunkt": {
//                 "epsg": "EPSG:4258",
//                 "lat": 59.93799104957114,
//                 "lon": 10.753347431364567
//             },
//             "oppdateringsdato": "2020-06-15T18:06:06"
//         }
//     ]
// }

export const AddressSchema = z.object({
  adressenavn: z.string(),
  nummer: z.number(),
  kommunenummer: z.string(),
  kommunenavn: z.string(),
  gardsnummer: z.number(),
  bruksnummer: z.number(),
  festenummer: z.number(),
  poststed: z.string(),
  bokstav: z.string(),
  postnummer: z.string(),
  oppdateringsdato: z.string(),
});
export const KartverketResponseSchema = z.object({
  metadata: z.object({
    asciiKompatibel: z.boolean(),
    totaltAntallTreff: z.number(),
    viserTil: z.number(),
    sokeStreng: z.string(),
    viserFra: z.number(),
    side: z.number(),
    treffPerSide: z.number(),
  }),
  adresser: z.array(AddressSchema),
});

const AdressSchemaArray = z.array(AddressSchema);

export type KartverketResponse = z.infer<typeof KartverketResponseSchema>;

const AddressForm = () => {
  //   const [address, setAddress] = useState("");

  const [selectedTab, setSelectedTab] = useState<
    "søk" | "skjema" | "forhåndsvisning"
  >("søk");

  const form = useForm({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = (data: any) => console.log(data);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Tabs defaultValue="søk" className="w-full" value={selectedTab}>
          <TabsList>
            <TabsTrigger value="søk" onClick={() => setSelectedTab("søk")}>
              Søk
            </TabsTrigger>
            <TabsTrigger
              value="skjema"
              onClick={() => setSelectedTab("skjema")}
            >
              Skjema
            </TabsTrigger>
            <TabsTrigger
              value="forhåndsvisning"
              onClick={() => setSelectedTab("forhåndsvisning")}
            >
              Forhåndsvisning
            </TabsTrigger>
          </TabsList>
          <TabsContent value="søk">
            <AddressSearch callback={() => setSelectedTab("skjema")} />
          </TabsContent>
          <TabsContent value="skjema">
            <>
              <div className="flex my-10 gap-4 flex-wrap">
                <FormField
                  control={form.control}
                  name="kommunenssaksnummer"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        <span>Kommunens saksnummer</span>
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="00000" {...field} type="number" />
                      </FormControl>
                      <FormDescription />
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="prosjektnummer"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        <span>Prosjektnummer</span>
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="0000" {...field} type="number" />
                      </FormControl>
                      <FormDescription />
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="Vedlegg"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        <span>Vedlegg</span>
                      </FormLabel>
                      <span className="flex items-center  gap-0.5">
                        <p className="text-base text-muted-foreground">G-</p>
                        <FormControl>
                          <Input placeholder="0000" {...field} />
                        </FormControl>
                      </span>
                      <FormDescription />
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <Separator />
              <div className="flex gap-4 my-5 ">
                <FormField
                  control={form.control}
                  name="adresse"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        <span>Adresse</span>
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="Adresse" {...field} />
                      </FormControl>
                      <FormDescription />
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="nummer"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        <span>Nummer</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="10"
                          {...field}
                          className="w-16"
                          type="number"
                        />
                      </FormControl>
                      <FormDescription />
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <Separator className="my-2" />

              <div className="flex gap-4 flex-wrap my-2 ">
                <FormField
                  control={form.control}
                  name="postnummer"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        <span>Postnummer</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="0000"
                          className="w-20"
                          type="number"
                        />
                      </FormControl>
                      <FormDescription />
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="poststed"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        <span>Poststed</span>
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="Poststed" {...field} />
                      </FormControl>
                      <FormDescription />
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <Separator className="my-4" />
              <FormField
                control={form.control}
                name="kommunenavn"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      <span>Kommunenavn</span>
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="Kommunenavn" {...field} />
                    </FormControl>
                    <FormDescription />
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Separator className="my-4" />
              <FormField
                control={form.control}
                name="bygningsnummer"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      <span>Bygningsnummer</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="0"
                        {...field}
                        className="w-20"
                        type="number"
                      />
                    </FormControl>
                    <FormDescription />
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Separator className="my-4" />
              <div className="flex gap-4 flex-wrap my-5">
                <FormField
                  control={form.control}
                  name="gardsnummer"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        <span>Gårdsnummer</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="00"
                          {...field}
                          className="w-20"
                          type="number"
                        />
                      </FormControl>
                      <FormDescription />
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="bruksnummer"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        <span>Bruksnummer</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="00"
                          {...field}
                          className="w-20"
                          type="number"
                        />
                      </FormControl>
                      <FormDescription />
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="festenummer"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        <span>Festenummer</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="0"
                          {...field}
                          className="w-20"
                          type="number"
                        />
                      </FormControl>
                      <FormDescription />
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="seksjonsnummer"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        <span>Seksjonsnummer</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="00"
                          {...field}
                          className="w-20"
                          type="number"
                        />
                      </FormControl>
                      <FormDescription />
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <Button type="submit">Submit</Button>
            </>
          </TabsContent>
          <TabsContent value="forhåndsvisning">
            <FormPreview />
          </TabsContent>
        </Tabs>
      </form>
    </Form>
  );
};

export default AddressForm;
