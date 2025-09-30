/*
  henter fra provider. dette er en provider, ("slags container"), som holder styr på brulerens innloggingsstaus og sesjon
*/
import { AuthSessionProvider } from "@/providers/authctx";
import { Slot } from "expo-router";
import React from "react";

/*
  dette er en layout fil, expo router kjører den først, så rendrer den alle skjermene inni Slot
  hele appen er pakket inn i auth session provider, alik at hvor som helst i appen kan man hente info om innlogging
  feks om brukeren er logget inn eller ikke 

  dette er altså root nivået i appen, alle andre skjermer vil dukke opp inni slot 
  provideren sørger for at uansett hvilken skjerm man er på, kan man sjekke og styre brukersesjonen 
*/
export default function RootRootLayout() {
  return (
    /*
      slot er en spesialkomponent fra expo router, den fungerer som en placeholder der den riktige skjermen lastes inn, 
      avhengig av hvor i appen man navigerer 
    */
    <AuthSessionProvider>
      <Slot /> 
    </AuthSessionProvider>
  );
}
