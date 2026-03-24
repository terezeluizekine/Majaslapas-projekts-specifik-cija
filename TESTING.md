# Testēšanas vide – lietošanas instrukcija

## Pārskats
Projektā ir izveidota vienkārša testēšanas vide, kas ļauj ātri pārbaudīt galveno funkcionalitāti bez manuālas datu ievades.

Testēšana notiek tieši pārlūkā (client-side), izmantojot:
-JavaScript loģiku,
-localStorage datu saglabāšanai,
-lietotāja interfeisa (UI) darbības.

---

## Testēšanas pogas

### 1. "Ievietot gatavus datus"
Atrašanās vieta: Mājaslapas saskarne, sadaļa "Testēšanas vide"

Šī poga:
- ievieto iepriekš definētus testa uzdevumus (Tasks),
- ievieto testa ieradumus (Habits),
- automātiski pārlādē lapu.

Izmanto:
- ātrai interfeisa pārbaudei,
- funkcionalitātes testēšanai bez manuālas ievades, 
- demonstrācijai.

---

### 2. "Dzēst visu"
Atrašanās vieta: Mājaslapas saskarne, sadaļa "Testēšanas vide"

Šī poga:
- izdzēš visus datus no localStorage
- notīra:
  - uzdevumus
  - ieradumus
  - taimera iestatījumus
- pārlādē lapu

Izmanto:
- testēšanai no sākotnējā stāvokļa,
- tukšā interfeisa pārbaudei.

---

## Testi kodā
Atrašanās vieta: fails "tests.js"

### Ir izveidota struktūra vienību testu izveidei ar ko ir iespējams pārbaudīt atsevišķas funkcijas, piemēram:
- ID ģenerēšanu,
- datu saglabāšanu un ielādi,
- datu struktūru korektumu.
- Akcepttesti (Acceptance tests)

## Ar izveidoto akcepttestu struktūru ir iespējams pārbaudīt lietotāja darbību scenārijus:
- uzdevuma pievienošanu,
- uzdevuma dzēšanu,
- ieraduma atzīmēšanu,
- taimera darbību.

Testus var palaist mājaslapas saskarnē, sadaļā "Testēšanas vide" ar pogu "palaist testus"
