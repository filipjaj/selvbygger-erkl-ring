import { z } from "zod";

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

export type KartverketResponse = z.infer<typeof KartverketResponseSchema>;
