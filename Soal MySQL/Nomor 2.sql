DELIMITER //

CREATE PROCEDURE GENERATE_TRANSACTION_NUMBER() BEGIN 
	DECLARE prefix VARCHAR(2);
	DECLARE day_part VARCHAR(2);
	DECLARE month_part VARCHAR(2);
	DECLARE year_part VARCHAR(2);
	DECLARE sequence_number INT;
	-- Mengambil tanggal saat ini
	SET @current_date := CURDATE();
	SET prefix := 'MH';
	SET day_part := DATE_FORMAT(@current_date, '%d');
	SET month_part := DATE_FORMAT(@current_date, '%m');
	SET year_part := DATE_FORMAT(@current_date, '%y');
	-- Mencari nomor urut transaksi terakhir pada tanggal saat ini
	SELECT
	    COALESCE(
	        MAX(SUBSTRING(transaksi_no, 9, 3)),
	        0
	    ) INTO sequence_number
	FROM transaksi
	WHERE
	    DATE(tanggal) = @current_date;
	-- Menambahkan nomor urut transaksi dengan 1
	SET sequence_number := sequence_number + 1;
	-- Format nomor urut dengan 3 digit, misalnya 003
	SET
	    @formatted_sequence_number := LPAD(sequence_number, 3, '0');
	-- Gabungkan semua bagian untuk membentuk nomor transaksi
	SET
	    @transaction_number := CONCAT(
	        prefix,
	        day_part,
	        month_part,
	        year_part,
	        @formatted_sequence_number
	    );
	-- Mengembalikan nomor transaksi
	SELECT @transaction_number AS transaction_number;
	END // 


DELIMITER ;