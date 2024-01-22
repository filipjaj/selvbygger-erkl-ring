import { z } from "zod";
import { create } from "zustand";

const FormSchema = z.object({
  gardsnummer: z.number().min(0),
  bruksnummer: z.number().min(0),
  festenummer: z.number().min(0),
  bolignummer: z.number().min(0),
  postnummer: z.string().min(4).max(4),
  poststed: z.string().min(1),
  adressenavn: z.string().min(1),
  kommunenavn: z.string().min(1),
});

type FormType = z.infer<typeof FormSchema>;

type FormStore = {
  data: FormType;
  setData: (newState: FormType) => void;
  reset: () => void;
  validate: () => boolean;
};

const useFormStore = create<FormStore>((set, get) => ({
  data: {
    gardsnummer: 0,
    bruksnummer: 0,
    festenummer: 0,
    bolignummer: 0,
    postnummer: "",
    poststed: "",
    adressenavn: "",
    kommunenavn: "",
  },
  setData: (newState) => set({ data: newState }),
  reset: () =>
    set({
      data: {
        gardsnummer: 0,
        bruksnummer: 0,
        festenummer: 0,
        bolignummer: 0,
        postnummer: "",
        poststed: "",
        adressenavn: "",
        kommunenavn: "",
      },
    }),
  validate: () => {
    try {
      FormSchema.parse(get().data);
      return true;
    } catch (error) {
      return false;
    }
  },
}));

export default useFormStore;
