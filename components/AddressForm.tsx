"use client";

import { formSchema } from "@/lib/formSchema";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { CalendarIcon } from "@radix-ui/react-icons";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@radix-ui/react-popover";
import { format } from "date-fns";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import AddressSearch from "./AddressSearch";
import FormPreview from "./FormPreview";
import { Button } from "./ui/button";
import { Calendar } from "./ui/calendar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
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

const AddressForm = () => {
  //   const [address, setAddress] = useState("");

  const [token, setToken] = useState("");

  const [selectedTab, setSelectedTab] = useState<
    "søk" | "skjema" | "forhåndsvisning"
  >("søk");

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      kommunenssaksnummer: "",
      prosjektnummer: "",
      vedlegg: "",
      adresse: "",
      nummer: "",
      postnummer: "",
      poststed: "",
      kommunenavn: "",
      bygningsnummer: "",
      gardsnummer: "",
      bruksnummer: "",
      festenummer: "",
      seksjonsnummer: "",
      dato: "",
    },
  });

  type GenericForm = {
    [key: string]: string;
  };

  const onSubmit: SubmitHandler<GenericForm> = async (data) => {
    const ValidatedData = formSchema.safeParse(data);
    if (!ValidatedData.success) return console.log(ValidatedData.error);
    console.log(ValidatedData);
    const res = await fetch("https://arkitektbedriftene.free.beeceptor.com", {
      method: "POST",
      body: JSON.stringify(ValidatedData),
    });
    const json = res.json();
    console.log(json);
  };

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
              <Card>
                <CardHeader>
                  <CardTitle> Erklæringen gjelder</CardTitle>
                  <CardDescription>Eiendom/ byggested</CardDescription>
                </CardHeader>
                <CardContent>
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
                            <Input
                              placeholder="00000"
                              {...field}
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
                      name="prosjektnummer"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            <span>Prosjektnummer</span>
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="0000"
                              {...field}
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
                      name="vedlegg"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            <span>Vedlegg</span>
                          </FormLabel>
                          <span className="flex items-center  gap-0.5">
                            <p className="text-base text-muted-foreground">
                              G-
                            </p>
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

                  <Separator className="my-4" />

                  <FormField
                    control={form.control}
                    name="dato"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel>
                          Personlig ansvarsrett som selvbygger gitt
                        </FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant={"outline"}
                                className={cn(
                                  "w-[240px] pl-3 text-left font-normal",
                                  !field.value && "text-muted-foreground"
                                )}
                              >
                                {field.value ? (
                                  <span>{field.value}</span>
                                ) : (
                                  <span>Velg dato</span>
                                )}
                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent
                            className="w-auto p-0 bg-white"
                            align="start"
                          >
                            <Calendar
                              mode="single"
                              selected={new Date(field.value)}
                              onSelect={(date) =>
                                date ? field.onChange(format(date, "PPP")) : ""
                              }
                              disabled={(date) =>
                                date > new Date() ||
                                date < new Date("1900-01-01")
                              }
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                        <FormDescription>
                          Personlig ansvarsrett som selvbygger gitt
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>

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
