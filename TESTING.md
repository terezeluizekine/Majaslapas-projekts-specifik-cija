# Testēšanas vide – lietošanas instrukcija

## Pārskats
Projektā ir izveidota vienkārša testēšanas vide, kas ļauj ātri pārbaudīt galveno funkcionalitāti bez manuālas datu ievades.

Testēšana notiek tieši pārlūkā (client-side), izmantojot:
- JavaScript loģiku,
- localStorage datu saglabāšanai,
- lietotāja interfeisa (UI) darbības.

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

### Ar izveidoto akcepttestu struktūru ir iespējams pārbaudīt lietotāja darbību scenārijus:
- uzdevuma pievienošanu,
- uzdevuma dzēšanu,
- ieraduma atzīmēšanu,
- taimera darbību.

Testus var palaist mājaslapas saskarnē, sadaļā "Testēšanas vide" ar pogu "palaist testus"

| Testa apraksts                                                                                                                                | Ievade / darbība                                                                                                                                                                                                                                                                               | Sagaidāmais rezultāts                                                                                                                                                                                               | Patiesais rezultāts                                                                                                                                                                                                 |
|:----------------------------------------------------------------------------------------------------------------------------------------------|:-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|:--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|:--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| 1. Integrācijas testa mērķis ir pārbaudīt, vai uzdevumi tiek bez problēmām pievienoti uzdevumu sarakstam.                                           | Tiek definēts masīvs "tasks" - visi līdz šim pievienotie uzdevumi -, kuram tiek pievienots objekts "newTask". Masīvs tiek saglabāts lokālajā datubāzē un pēc tam no tās ielādēts atpakaļ. Tiek izsaukta uzdevumu inicializēšanas funkcija "initializeTasksModule()".                           | Masīva "tasks" garums ir palielinājies par 1, tā pēdējā elementa teksts un prioritāte sakrīt ar pievienotā objekta tekstu un prioritāti un uzdevums ir vizuāli redzams tam atbilstošajā sadaļā.                     | Masīva "tasks" garums ir palielinājies par 1, tā pēdējā elementa teksts un prioritāte sakrīt ar pievienotā objekta tekstu un prioritāti un uzdevums ir vizuāli redzams tam atbilstošajā sadaļā.                     |
| 2. Integrācijas testa mērķis ir pārbaudīt, vai uzdevumi tiek bez problēmām izdzēsti no uzdevumu saraksta.                                           | Iepriekš definētajā masīvā "tasks" tiek atstāti tikai tie uzdevumi, kuru id nesakrīt ar iepriekšējā testā pievienoto "newTask" objektu. Masīvs tiek saglabāts lokālajā datubāzē un pēc tam no tās ielādēts atpakaļ.                                                                            | Masīva "tasks" garums ir samazinājies par 1.                                                                                                                                                                        | Masīva "tasks" garums ir samazinājies par 1.                                                                                                                                                                        |
| 3. Integrācijas testa mērķis ir pārbaudīt, vai ieradumi tiek atzīmēti, kā pabeigti, bez problēmām.                                                  | Tiek izveidots ieradumu masīvs "habits" ar tajā iekļautu ieraduma objektu. Masīvs tiek saglabāts lokālajā datubāzē. Tiek izsaukta ieradumu inicializēšanas funkcija "initializeHabitsModule()". Tiek simulēta lietotāja ievade, atzīmējot "checkbox".                                          | Ieraduma objekta izpildes stāvoklis ir "true" un tas ir vizuāli redzams tam atbilstošajā sadaļā, mainījis izskatu uz izpildītu ieraduma objektu.                                                                    | Ieraduma objekta izpildes stāvoklis ir "true" un tas ir vizuāli redzams tam atbilstošajā sadaļā, mainījis izskatu uz izpildītu ieraduma objektu.                                                                    |
| 4. Integrācijas testa mērķis ir pārbaudīt, vai ieradumi tiek bez problēmām pievienoti ieradumu sarakstam.                                           | Tiek definēts masīvs "habitsList" - visi līdz šim pievienotie ieradumi -, kuram tiek pievienots objekts "newHabit". Masīvs tiek saglabāts lokālajā datubāzē un pēc tam no tās ielādēts atpakaļ. Tiek izsaukta uzdevumu inicializēšanas funkcija "initializeHabitsModule()".                    | Masīva "habitsList" garums ir palielinājies par 1, tā pēdējā elementa teksts un izpildes stāvoklis sakrīt ar pievienotā objekta tekstu un izpildes stāvokli un ieradums ir vizuāli redzams tam atbilstošajā sadaļā. | Masīva "habitsList" garums ir palielinājies par 1, tā pēdējā elementa teksts un izpildes stāvoklis sakrīt ar pievienotā objekta tekstu un izpildes stāvokli un ieradums ir vizuāli redzams tam atbilstošajā sadaļā. |
| 5. Akcept testa (nefunkcionālais) mērķis ir pārbaudīt, vai aplikācija spēj attēlot lielu daudzumu ar datiem, kas ievadīti īsā laika brīdī     | Tiek izveidots masīvs ar 5000 botiem. Tiek izmantota funkcija initializeHabitsModule, lai izveidotu un ielādētu visus simulētos botus. Mēra laiku, cik ilgi paiet, lai izveidotu DOM elementus. Pēc tam pārbaude, vai #habit-list satur visus ieradumus. Atjauno oriģinālo funkciju loadItems. | Veiksmīgi tiek izveidoti visi 5000 ieradumi, apstrādāti un attēloti, serverim neuzkaroties.                                                                                                                         | Sistēma spēja apstrādāt 5000 ieradumus, renderēšanas laiks ir ātrs.                                                                                                                                                 |
| 6. Integrācijas testa mērķis ir pārbaudīt, vai aplikācija ir droša, ja teksta vietā lietotājs ievada kodu, piemēram, script html. | Tiek izveidots "Ļaunprātīgs ieradums" un to saglabā StorageService.saveItems, kuru pēc tam renderē  HabitsModule un pārbauda rezultātu ar DOM.                                                                                                                                                 | Ieradums tiek saglabāts un attēlots kā teksts. Ievadītais kods netiek izpildīts, jo DOM neinterpretē to kā HTML.                                                                                                    | Nevar "ievainot" aplikāciju, jo textContent strādā pareizi, tādēļ lietotāja ievade ir droša.                                                                                                                        |
| 7. Integrācijas testa mērķis ir pārbaudīt aplikācijas stabilitāti, ja tiek bojāti dati.                                                       | Tiek ielikti bojāti dati, kas nav ne masīvs ne pareiz JSON, un tiek palaista aplikācija. Pārbauda vai habitList.children.length === 0.                                                                                                                                                         | Aplikācija neuzkaras, ja tiek ievadīti bojāti dati. Netiekm izmests error un bojātie dati tiek ignorēti.                                                                                                            | Try/catch strādā pareizi. Sistēma ir stabila arī kļūdu gadījumā, kā arī lietotājs tās neredz.                                                                                                                       |
| d                                                                                                                                             | d                                                                                                                                                                                                                                                                                              | d                                                                                                                                                                                                                   | d                                                                                                                                                                                                                   |
| d                                                                                                                                             | d                                                                                                                                                                                                                                                                                              | d                                                                                                                                                                                                                   | d                                                                                                                                                                                                                   |
| d                                                                                                                                             | d                                                                                                                                                                                                                                                                                              | d                                                                                                                                                                                                                   | d                                                                                                                                                                                                                   |
| d                                                                                                                                             | d                                                                                                                                                                                                                                                                                              | d                                                                                                                                                                                                                   | d                                                                                                                                                                                                                   |
| d                                                                                                                                             | d                                                                                                                                                                                                                                                                                              | d                                                                                                                                                                                                                   | d                                                                                                                                                                                                                   |

