$(document).ready(function () {
    function fetchData() {
        $.ajax({
            url: 'data.php',
            method: 'GET',
            success: function (data) {
                // Hapus data lama dari tabel
                // $('#data-table tbody').empty();

                // Ubah data JSON menjadi objek JavaScript
                var jsonData = JSON.parse(data);

                // Tambahkan data baru ke dalam tabel
                $.each(jsonData, function (index, item) {
                    var row = '<tr><td>' + item.user + '</td><td>' + item.user_date + '</td><td>' + item.user_time + '</td><td>' + item.user_flush + '</td></tr>';
                    $('#dataTable tbody').append(row);
                });
            },
        });
    }

    // Perbarui data setiap beberapa detik
    setInterval(fetchData, 5000); // Misalnya, setiap 5 detik

    // Ambil data awal
    fetchData();
});
