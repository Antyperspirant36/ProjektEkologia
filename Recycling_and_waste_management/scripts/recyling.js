const dane = [
    {
        kategoria: "Papier",
        opis: "Zarządzanie i recykling odpadami z papieru",
        szczegoly: `PAP (20) - papier <br>Opis: Zwykły papier, karton <br> Recykling: Tak, pod warunkiem, że jest czysty. <br> Segregacja: Pojemnik na papier <br><br>
                    PAP (21) - tektura <br> Opis: Tektura <br> Recykling: Tak. <br> Segregacja: Pojemnik na papier. <br><br>
                    PAP (22) - karton powlekany (po mleku) <br> Opis: Karton z powłoką ochronną. <br> Recykling: Wymaga specjalnego przetworzenia. <br>Segregacja: Pojemnik na papier.`
    },
    {
        kategoria: "Plastik",
        opis: "Zarządzanie i recykling odpadami z plastiku",
        szczegoly: `PET (1) - politereftalan etylenu <br>Opis: Używany do produkcji butelek na wodę i napoje. <br> Recykling: Tak. <br> Segregacja: Pojemnik na plastik <br><br>
                    HDPE (2) - polietylen wysokiej gęstości <br>Opis: Stosowany do pojemników na mleko i detergenty. <br> Recykling: Tak. <br> Segregacja: Pojemnik na plastik <br><br>
                    PVC (3) - polichlorek winylu <br>Opis: Używany w rurach, kablach, foliach. <br> Recykling: Trudny do recyklingu, toksyczny. <br> Segregacja: Specjalna utylizacja.`
    },
    {
        kategoria: "Szkło",
        opis: "Zarządzanie i recykling odpadami szklanymi",
        szczegoly: `GL (70) - szkło bezbarwne <br>Opis: Butelki i słoiki. <br> Recykling: Tak. <br> Segregacja: Pojemnik na szkło bezbarwne <br><br>
                    GL (71) - szkło zielone <br>Opis: Butelki w kolorze zielonym. <br> Recykling: Tak. <br> Segregacja: Pojemnik na szkło zielone <br><br>
                    GL (72) - szkło brązowe <br>Opis: Butelki brązowe. <br> Recykling: Tak. <br> Segregacja: Pojemnik na szkło brązowe.`
    },
    {
        kategoria: "Metal",
        opis: "Zarządzanie i recykling odpadami metalowymi",
        szczegoly: `ALU (41) - aluminium <br>Opis: Puszki, folia aluminiowa. <br> Recykling: Tak. <br> Segregacja: Pojemnik na metal <br><br>
                    FE (40) - stal <br>Opis: Puszki na żywność, metalowe opakowania. <br> Recykling: Tak. <br> Segregacja: Pojemnik na metal.`
    },
    {
        kategoria: "Odpady Organiczne",
        opis: "Odpady biodegradowalne",
        szczegoly: `Kompostowalny (zielony liść) <br>Opis: Produkty biodegradowalne, np. resztki jedzenia. <br> Recykling: Tak, nadaje się do kompostowania. <br> Segregacja: Pojemnik na odpady organiczne lub kompost.`
    },
    {
        kategoria: "Odpady Elektryczne",
        opis: "Zarządzanie odpadami elektrycznymi",
        szczegoly: `Przekreślony kosz na śmieci (WEEE) <br>Opis: Elektronika, baterie, żarówki. <br> Recykling: Wymaga specjalnej utylizacji. <br> Segregacja: Punkty zbiórki odpadów elektronicznych.`
    },
    {
        kategoria: "Odpady Medyczne",
        opis: "Zarządzanie odpadami medycznymi",
        szczegoly: `Symbol przekreślonego kosza dla odpadów medycznych <br>Opis: Strzykawki, igły, bandaże. <br> Recykling: Nie. <br> Segregacja: Punkt utylizacji odpadów medycznych <br><br>
                    Biohazard (symbol biologiczny) <br>Opis: Odpady zakaźne. <br> Recykling: Nie. <br> Segregacja: Punkt utylizacji odpadów biologicznych.`
    },
];

function pokaz(x) {
    document.getElementById("h2").innerHTML = `<strong>${dane[x].kategoria}</strong>`;
    document.getElementById("h4").innerHTML = dane[x].opis;
    document.getElementById("h5").innerHTML = dane[x].szczegoly;
}
