SELECT
    periode AS 'Urutan Periode'
FROM nama_tabel
WHERE
    periode >= '2022-01'
    AND periode <= '2022-05'
ORDER BY periode ASC;