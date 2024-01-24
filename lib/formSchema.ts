import { z } from "zod";

export const formSchema = z.object({
  kommunenssaksnummer: z.string().min(1, "Kommunens saksnummer er påkrevd"),
  prosjektnummer: z.string().min(1, "Prosjektnummer er påkrevd"),
  vedlegg: z
    .string()
    .min(1, "Vedlegg er påkrevd")
    .transform((val) =>
      val.startsWith("G-".toUpperCase())
        ? val.toUpperCase()
        : `G-${val.toUpperCase()}`
    ),
  adresse: z.string().min(2, "Adressen må inneholde minst 2 tegn"),
  nummer: z.coerce.number().min(1, "Nummeret må være større enn 0"),
  postnummer: z
    .string()
    .max(4, "Postnummeret kan ikke overstige 4 siffer")
    .min(4, "Postnummeret må være minst 4 siffer")
    .regex(/^\d+$/, "Postnummeret kan kun inneholde tall"),
  poststed: z.string().min(2, "Poststedet må inneholde minst 2 tegn"),
  kommunenavn: z.string().min(2, "Kommunenavnet må inneholde minst 2 tegn"),
  bygningsnummer: z.coerce.number().min(1, "Bygningsnummer er påkrevd"),
  gardsnummer: z.coerce.number().min(1, "Gårdsnummer er påkrevd"),

  bruksnummer: z.coerce.number().min(1, "Bruksnummer er påkrevd"),

  festenummer: z.coerce.number().min(0, "Festenummer er påkrevd"),
  seksjonsnummer: z.coerce.number().min(1, "Seksjonsnummer er påkrevd"),
  
});

export type FormType = z.infer<typeof formSchema>;
