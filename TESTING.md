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

| Testa apraksts                                                                            | Ievade / darbība                                                                                                                                 | Sagaidāmais rezultāts                          | Patiesais rezultāts                            |
|:------------------------------------------------------------------------------------------|:-------------------------------------------------------------------------------------------------------------------------------------------------|:-----------------------------------------------|:-----------------------------------------------|
| Akcept testa mērķis ir pārbaudīt, vai uzdevumi tiek bez problēmām pievienoti.             | Tiek definēts masīvs "tasks", kuram tiek pievienots objekts "newTask".                                                                           | Masīva "tasks" garums ir vienāds ar 1.         | Masīva "tasks" garums ir vienāds ar 1.         |
| Akcept testa mērķis ir pārbaudīt, vai uzdevumi tiek bez problēmām izdzēsti.               | Iepriekš definētā masīvā "tasks" tiek atstāti tikai tie uzdevumi, kuru id nesakrīt ar iepriekšējā testā pievienoto "newTask" objektu.            | Masīva "tasks" garums ir vienāds ar 0.         | Masīva "tasks" garums ir vienāds ar 0.         |
| Akcept testa mērķis ir pārbaudīt, vai ieradumi tiek atzīmēti, kā pabeigti, bez problēmām. | Tiek izveidots ieradumu masīvs "habits" ar tajā iekļautu ieraduma objektu. Ieraduma objekta izpildes stāvoklis tiek iestatīts ar vērtību "true". | Ieraduma objekta izpildes stāvoklis ir "true". | Ieraduma objekta izpildes stāvoklis ir "true". |
| L00                                                                                       | **bold**                                                                                                                                         | $1600                                          |                                                |
| L1                                                                                        | `code`                                                                                                                                           | $12                                            |                                                |
| L2                                                                                        | _italic_                                                                                                                                         | $1                                             |                                                |

