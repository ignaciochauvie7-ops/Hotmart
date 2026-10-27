# Archivos de entrega — PL

Coloca aquí los PDF con estos nombres EXACTOS (deben coincidir con
`files.pl` en `src/config/menopausia/files.ts`). Esta carpeta está fuera de
`/public`: los archivos solo se sirven con token firmado por
`/api/menopausia/descarga`.

## Principal (main)
- `1 - Plaski Brzuch w 28 Dni.pdf` — NO local: ~29 MB, servido por Google Drive
  (redirect 302 desde `descarga` tras verificar el pago; ver `driveMain` en
  `src/config/menopausia/files.ts`).
- `2 - BONUS - 30 Przepisow Przeciwzapalnych.pdf`
- `3 - BONUS - Tracker na 28 Dni (do druku).pdf`
- `4 - BONUS - Jedz na Miescie bez Wzdec.pdf`
- `5 - BONUS - Plan Ratunkowy na 3 Dni.pdf`

## Order bump
- `EXTRA - Znow Dobrze Spij w 21 Dni.pdf`

## Upsell
- `EXTRA - Zegnaj Wzdecie w 14 Dni.pdf`
